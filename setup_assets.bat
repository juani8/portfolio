@echo off
REM Script para organizar assets del portfolio

cd /d e:\Otro\portfolio\portfolio

REM Crear estructura de directorios para assets
echo Creando estructura de directorios...
mkdir public\assets 2>nul
mkdir public\assets\images 2>nul
mkdir public\assets\images\projects 2>nul

echo.
echo Copiando diagramas de SensAI...

REM Copiar PDFs de SensAI
if exist "ETL de aprendizaje automático.pdf" (
    copy "ETL de aprendizaje automático.pdf" "public\assets\images\projects\sensai-etl.pdf"
    echo ✓ Copiado: sensai-etl.pdf
) else (
    echo ✗ No encontrado: ETL de aprendizaje automático.pdf
)

if exist "sensai_alto_nivel.pdf" (
    copy "sensai_alto_nivel.pdf" "public\assets\images\projects\sensai-architecture.pdf"
    echo ✓ Copiado: sensai-architecture.pdf
) else (
    echo ✗ No encontrado: sensai_alto_nivel.pdf
)

echo.
echo Estructura de directorios creada:
tree /F public\assets

echo.
echo ==================================
echo PRÓXIMOS PASOS:
echo ==================================
echo 1. Añade imágenes de preview para cada proyecto en:
echo    public\assets\images\projects\
echo.
echo    Nombres esperados:
echo    - sensai.png
echo    - tribe.png
echo    - moodflix.png
echo    - marketplace.png
echo.
echo 2. Verifica que los PDFs se hayan copiado correctamente
echo.
pause
