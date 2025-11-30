"""
Script para comprimir videos del portfolio y reducir el ancho de banda.
Requiere: ffmpeg instalado en el sistema

Uso:
    python compress_videos.py           # Comprime todos los videos
    python compress_videos.py --preview # Solo muestra qué se va a comprimir
    python compress_videos.py --help    # Muestra ayuda
"""

import os
import subprocess
import sys
from pathlib import Path

# Configuración
ASSETS_PATH = Path(__file__).parent / "src" / "assets" / "videos"
OUTPUT_SUFFIX = "_compressed"
BACKUP_FOLDER = Path(__file__).parent / "videos_backup"

# Configuración de compresión por calidad deseada
# CRF: 18-28 es un rango razonable. Mayor = más compresión, menor calidad
# Preset: slower = mejor compresión, faster = menos tiempo
COMPRESSION_CONFIG = {
    "sensai": {
        "crf": 28,           # Más compresión para demos de sensai
        "preset": "slow",
        "max_width": 720,    # Reducir resolución a 720p
        "fps": 24,           # Reducir FPS
    },
    "tribe": {
        "crf": 26,
        "preset": "slow", 
        "max_width": 540,    # Mobile app videos - 540p es suficiente
        "fps": 24,
    },
    "moodflix": {
        "crf": 26,
        "preset": "slow",
        "max_width": 720,    # Web app - 720p
        "fps": 24,
    },
    "default": {
        "crf": 26,
        "preset": "medium",
        "max_width": 720,
        "fps": 30,
    }
}

def get_video_info(video_path):
    """Obtiene información del video usando ffprobe"""
    try:
        cmd = [
            "ffprobe", "-v", "quiet", "-print_format", "json",
            "-show_streams", "-show_format", str(video_path)
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            import json
            return json.loads(result.stdout)
    except Exception as e:
        print(f"  ⚠️ Error obteniendo info: {e}")
    return None

def get_config_for_path(video_path):
    """Determina la configuración de compresión basada en la ruta del video"""
    path_str = str(video_path).lower()
    for folder, config in COMPRESSION_CONFIG.items():
        if folder in path_str:
            return config
    return COMPRESSION_CONFIG["default"]

def compress_video(input_path, output_path, config, preview=False):
    """Comprime un video usando ffmpeg con H.264"""
    
    # Construir filtros de video
    filters = []
    
    # Escalar al máximo ancho manteniendo aspecto
    filters.append(f"scale='min({config['max_width']},iw)':-2")
    
    # Limitar FPS
    filters.append(f"fps={config['fps']}")
    
    vf = ",".join(filters)
    
    cmd = [
        "ffmpeg", "-y",        # Sobrescribir
        "-i", str(input_path),
        "-c:v", "libx264",     # Códec H.264
        "-preset", config["preset"],
        "-crf", str(config["crf"]),
        "-vf", vf,
        "-c:a", "aac",         # Audio AAC
        "-b:a", "64k",         # Bitrate de audio bajo
        "-movflags", "+faststart",  # Optimizar para streaming web
        "-pix_fmt", "yuv420p", # Compatibilidad máxima
        str(output_path)
    ]
    
    if preview:
        print(f"  Comando: {' '.join(cmd)}")
        return True
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        return result.returncode == 0
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def format_size(size_bytes):
    """Formatea tamaño en bytes a MB"""
    return f"{size_bytes / (1024*1024):.2f} MB"

def main():
    preview_mode = "--preview" in sys.argv
    help_mode = "--help" in sys.argv or "-h" in sys.argv
    
    if help_mode:
        print(__doc__)
        print("\nOpciones:")
        print("  --preview    Solo muestra qué archivos se comprimirán")
        print("  --help, -h   Muestra esta ayuda")
        return
    
    print("=" * 60)
    print("🎬 Compresor de Videos para Portfolio")
    print("=" * 60)
    
    if preview_mode:
        print("⚠️  MODO PREVIEW - No se modificarán archivos\n")
    
    # Verificar ffmpeg
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True)
    except FileNotFoundError:
        print("❌ Error: ffmpeg no está instalado o no está en PATH")
        print("   Instálalo desde: https://ffmpeg.org/download.html")
        return
    
    if not ASSETS_PATH.exists():
        print(f"❌ Error: No se encontró la carpeta {ASSETS_PATH}")
        return
    
    # Encontrar todos los videos MP4
    videos = list(ASSETS_PATH.rglob("*.mp4"))
    
    # Filtrar temp_all y archivos ya comprimidos
    videos = [v for v in videos if "temp_all" not in str(v) and OUTPUT_SUFFIX not in str(v)]
    
    if not videos:
        print("No se encontraron videos para comprimir")
        return
    
    print(f"📁 Encontrados {len(videos)} videos\n")
    
    total_original = 0
    total_compressed = 0
    processed = 0
    skipped = 0
    
    for video in sorted(videos):
        rel_path = video.relative_to(ASSETS_PATH)
        original_size = video.stat().st_size
        total_original += original_size
        
        config = get_config_for_path(video)
        
        print(f"📹 {rel_path}")
        print(f"   Original: {format_size(original_size)}")
        print(f"   Config: CRF={config['crf']}, Max={config['max_width']}p, FPS={config['fps']}")
        
        # Crear archivo temporal para la compresión
        temp_output = video.parent / f"{video.stem}_temp{video.suffix}"
        
        if preview_mode:
            # Estimar reducción (aproximado)
            estimated = original_size * 0.4  # ~60% reducción estimada
            print(f"   Estimado: ~{format_size(estimated)}")
            total_compressed += estimated
            processed += 1
        else:
            # Comprimir
            success = compress_video(video, temp_output, config)
            
            if success and temp_output.exists():
                new_size = temp_output.stat().st_size
                savings = original_size - new_size
                
                if savings > 0:
                    # Crear backup si no existe
                    if not BACKUP_FOLDER.exists():
                        BACKUP_FOLDER.mkdir(parents=True)
                    
                    backup_path = BACKUP_FOLDER / rel_path
                    backup_path.parent.mkdir(parents=True, exist_ok=True)
                    
                    # Mover original a backup
                    video.rename(backup_path)
                    
                    # Renombrar comprimido al nombre original
                    temp_output.rename(video)
                    
                    total_compressed += new_size
                    print(f"   ✅ Nuevo: {format_size(new_size)} (ahorro: {format_size(savings)})")
                    processed += 1
                else:
                    # El comprimido es más grande, mantener original
                    temp_output.unlink()
                    total_compressed += original_size
                    print(f"   ⏭️  Saltado (comprimido sería más grande)")
                    skipped += 1
            else:
                total_compressed += original_size
                print(f"   ❌ Error al comprimir")
                skipped += 1
        
        print()
    
    # Resumen
    print("=" * 60)
    print("📊 RESUMEN")
    print("=" * 60)
    print(f"Videos procesados: {processed}")
    print(f"Videos saltados: {skipped}")
    print(f"Tamaño original total: {format_size(total_original)}")
    
    if preview_mode:
        print(f"Tamaño estimado después: ~{format_size(total_compressed)}")
        print(f"Ahorro estimado: ~{format_size(total_original - total_compressed)} ({(1 - total_compressed/total_original)*100:.1f}%)")
        print(f"\n💡 Ejecuta sin --preview para comprimir")
    else:
        print(f"Tamaño comprimido total: {format_size(total_compressed)}")
        if total_original > 0:
            print(f"Ahorro total: {format_size(total_original - total_compressed)} ({(1 - total_compressed/total_original)*100:.1f}%)")
        print(f"\n💾 Backups guardados en: {BACKUP_FOLDER}")

if __name__ == "__main__":
    main()
