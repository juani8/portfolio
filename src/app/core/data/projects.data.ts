/**
 * Datos de proyectos para el portfolio
 * Este archivo contiene toda la información de los proyectos que se muestran en el sitio.
 * Para agregar un nuevo proyecto, simplemente añade un objeto al array correspondiente.
 */

export interface ProjectSection {
  title: {
    es: string;
    en: string;
  };
  content: {
    es: string;
    en: string;
  };
  imageUrl?: string;
  diagramUrl?: string;
}

export interface ProjectLink {
  label: {
    es: string;
    en: string;
  };
  url: string;
  type: 'github' | 'demo' | 'video' | 'docs' | 'diagram';
}

export interface Project {
  id: string;
  title: {
    es: string;
    en: string;
  };
  shortDescription: {
    es: string;
    en: string;
  };
  // Párrafo introductorio "vendedor" que aparece después de las tecnologías
  introDescription?: {
    es: string;
    en: string;
  };
  fullDescription: {
    es: string;
    en: string;
  };
  technologies: string[];
  tags: ProjectTag[];
  imageUrl?: string;
  imageStyle?: 'cover' | 'contain'; // 'cover' para fotos, 'contain' para logos
  videoUrl?: string;
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
  category: 'main' | 'ml' | 'security' | 'cloud';
  // Campos extendidos para página de detalle
  sections?: ProjectSection[];
  links?: ProjectLink[];
  highlights?: {
    es: string[];
    en: string[];
  };
  diagrams?: {
    title: { es: string; en: string };
    url: string;
    description?: { es: string; en: string };
  }[];
  // Videos de demo para mostrar funcionalidades
  demoVideos?: {
    title: { es: string; en: string };
    url: string;
    description?: { es: string; en: string };
    category?: string; // Flexible para cada proyecto: 'auth', 'social', 'profile', 'settings', 'landing', 'discovery', 'playlist', 'detail', 'search', etc.
    format?: 'mobile' | 'landscape'; // Optional: override default format for specific videos
  }[];
  // Formato de video: 'mobile' (9:16) o 'desktop' (16:9)
  videoFormat?: 'mobile' | 'desktop';
  // Galería de imágenes para mostrar capturas de pantalla
  gallery?: {
    title: { es: string; en: string };
    images: {
      url: string;
      caption?: { es: string; en: string };
    }[];
  }[];
  role?: {
    es: string;
    en: string;
  };
  duration?: string;
  team?: number;
}

export type ProjectTag = 'Mobile' | 'Web' | 'Desktop' | 'ML' | 'Security' | 'Cloud' | 'API' | 'Data' | 'IaC';

// ============================================
// PROYECTOS PRINCIPALES
// ============================================

export const PROJECTS: Project[] = [
  // === SensAi - PROYECTO DESTACADO ===
  {
    id: 'sensai',
    title: {
      es: 'SensAi',
      en: 'SensAi'
    },
    shortDescription: {
      es: 'Aplicación móvil de asistencia para personas con discapacidad visual mediante visión computacional e IA. Detecta peatones, veredas rotas y colectivos en tiempo real.',
      en: 'Mobile assistance app for visually impaired people using computer vision and AI. Detects pedestrians, broken sidewalks and buses in real-time.'
    },
    introDescription: {
      es: `Este proyecto representa un **ciclo completo de desarrollo de Machine Learning**: desde la investigación con usuarios y recolección de datos en campo, hasta el entrenamiento de modelos personalizados y su despliegue en dispositivos móviles. Se construyeron **3 modelos de detección de objetos** entrenados con datasets propios (~2400 imágenes etiquetadas manualmente), optimizados para inferencia en tiempo real (~50ms por frame) sin conexión a internet.

El proceso incluyó un **análisis exhaustivo de métricas** (mAP, precisión, recall, matrices de confusión) y comportamiento de los modelos en distintos escenarios, permitiendo **iterar sobre los entrenamientos** hasta lograr un modelo con comportamiento listo para producción.

**¿Qué hace la app?** SensAi utiliza la cámara del celular para detectar en tiempo real peatones, veredas en mal estado y colectivos de líneas específicas (324, 152, 365), alertando al usuario mediante voz y vibración. Todo el procesamiento ocurre en el dispositivo, sin necesidad de conexión a internet.`,
      en: `This project represents a **complete Machine Learning development cycle**: from user research and field data collection, to training custom models and deploying them on mobile devices. **3 object detection models** were built, trained with proprietary datasets (~2400 manually labeled images), optimized for real-time inference (~50ms per frame) without internet connection.

The process included **exhaustive metrics analysis** (mAP, precision, recall, confusion matrices) and model behavior evaluation across different scenarios, enabling **iteration over training runs** until achieving production-ready model behavior.

**What does the app do?** SensAi uses the phone's camera to detect pedestrians, damaged sidewalks, and specific bus lines (324, 152, 365) in real-time, alerting the user through voice and vibration. All processing happens on-device, without internet connection.`
    },
    fullDescription: {
      es: `SensAi es una aplicación Android que utiliza **Machine Learning y Visión por Computadora** para asistir a personas con discapacidad visual en el Área Metropolitana de Buenos Aires (AMBA). El nombre surge de la combinación entre "sensei" (maestro o guía en japonés) y "AI" (Inteligencia Artificial): un "maestro de los sentidos" que acompaña y potencia la percepción de los usuarios.

### Arquitectura de Machine Learning

El núcleo de SensAi son **3 modelos de detección de objetos personalizados** optimizados para inferencia móvil:

• **Modelo de Peatones**: Detecta personas en movimiento o detenidas en el camino del usuario
• **Modelo de Veredas**: Identifica daños en el pavimento como baldosas rotas, faltantes y desniveles
• **Modelo de Colectivos**: Reconoce las líneas 324, 152 y 365 por su cartelería frontal

Cada modelo fue entrenado con datasets propios recolectados específicamente en el entorno urbano del AMBA, totalizando aproximadamente **2400 imágenes etiquetadas manualmente** con Label Studio.

### Pipeline de ML End-to-End

El proyecto abarca el ciclo completo de un sistema de ML en producción:

1. **Recolección de Datos**: Captura de imágenes en distintas condiciones de luz, clima y ubicaciones
2. **Etiquetado**: Anotación manual de bounding boxes para cada clase objetivo
3. **Entrenamiento**: Fine-tuning de YOLOv8 con augmentación de datos personalizada
4. **Optimización**: Conversión a ONNX con NMS integrado para reducir latencia
5. **Deployment**: Integración con ONNX Runtime en Android para inferencia en dispositivo

### Valor del ML en este Caso de Uso

La aplicación de técnicas de Deep Learning permite resolver problemas que serían imposibles con programación tradicional:

• **Generalización**: Los modelos detectan obstáculos en escenarios nunca vistos durante el entrenamiento
• **Tiempo Real**: Inferencia de ~50ms por frame permite alertas instantáneas al usuario
• **Adaptabilidad**: Los modelos pueden re-entrenarse con nuevos datos para mejorar precisión

### Investigación con Usuarios

Se realizaron entrevistas semiestructuradas a 7 personas con distintos grados de discapacidad visual. Los hallazgos definieron las detecciones prioritarias: personas como principal obstáculo, veredas en mal estado como segundo problema más reportado, y la necesidad de identificar colectivos en paradas concurridas.`,
      en: `SensAi is an Android application that uses **Machine Learning and Computer Vision** to assist visually impaired people in the Buenos Aires Metropolitan Area (AMBA). The name comes from combining "sensei" (teacher or guide in Japanese) and "AI" (Artificial Intelligence): a "master of the senses" that accompanies and enhances users' perception.

### Machine Learning Architecture

The core of SensAi consists of **3 custom object detection models** optimized for mobile inference:

• **Pedestrian Model**: Detects people moving or standing in the user's path
• **Sidewalk Model**: Identifies pavement damage such as broken tiles, missing tiles, and uneven surfaces
• **Bus Model**: Recognizes lines 324, 152, and 365 by their front signage

Each model was trained with proprietary datasets collected specifically in the AMBA urban environment, totaling approximately **2400 manually labeled images** using Label Studio.

### End-to-End ML Pipeline

The project covers the complete lifecycle of a production ML system:

1. **Data Collection**: Image capture under different lighting, weather, and location conditions
2. **Labeling**: Manual bounding box annotation for each target class
3. **Training**: YOLOv8 fine-tuning with custom data augmentation
4. **Optimization**: Conversion to ONNX with integrated NMS to reduce latency
5. **Deployment**: Integration with ONNX Runtime on Android for on-device inference

### ML Value for this Use Case

Applying Deep Learning techniques solves problems that would be impossible with traditional programming:

• **Generalization**: Models detect obstacles in scenarios never seen during training
• **Real-Time**: ~50ms inference per frame enables instant user alerts
• **Adaptability**: Models can be retrained with new data to improve accuracy

### User Research

Semi-structured interviews were conducted with 7 people with varying degrees of visual impairment. Findings defined priority detections: people as the main obstacle, poorly maintained sidewalks as the second most reported problem, and the need to identify buses at busy stops.`
    },
    technologies: ['Android', 'Kotlin', 'Python', 'YOLOv8', 'ONNX Runtime', 'TensorFlow', 'OpenCV', 'Label Studio', 'TalkBack', 'CameraX'],
    tags: ['Mobile', 'ML', 'Data'],
    imageUrl: 'assets/images/sensai/modo_claro (1).webp',
    imageStyle: 'contain',
    videoUrl: '',
    codeUrl: 'https://github.com/juani8/sensai',
    featured: true,
    category: 'ml',
    role: {
      es: 'Desarrollador Full Stack & ML Engineer',
      en: 'Full Stack Developer & ML Engineer'
    },
    duration: '6 meses',
    team: 2,
    highlights: {
      es: [
        'Pipeline completo de ML: recolección de datos, etiquetado, entrenamiento y deployment',
        '3 modelos YOLO personalizados entrenados con datasets propios (~2400 imágenes)',
        'Optimización de modelos para inferencia móvil con ONNX Runtime',
        'Procesamiento en tiempo real con baja latencia y funcionamiento offline',
        'Diseño centrado en accesibilidad con soporte completo para TalkBack, modos de alto contraste y tipografía Atkinson Hyperlegible',
        'Validación con usuarios reales con discapacidad visual'
      ],
      en: [
        'Complete ML pipeline: data collection, labeling, training and deployment',
        '3 custom YOLO models trained with proprietary datasets (~2400 images)',
        'Model optimization for mobile inference with ONNX Runtime',
        'Real-time processing with low latency and offline operation',
        'Accessibility-centered design with full TalkBack support, high contrast modes and Atkinson Hyperlegible typography',
        'Validation with real users with visual impairments'
      ]
    },
    sections: [
      {
        title: {
          es: 'Proceso de Inferencia',
          en: 'Inference Process'
        },
        content: {
          es: `El flujo de datos durante el uso de los modelos de detección sigue tres fases:

**1. Preprocesamiento**
Captura del entorno desde la cámara → Redimensionamiento a 640×640 → Normalización → Tensorización para compatibilidad con los modelos.

**2. Inferencia**
El modelo ONNX recibe las imágenes preprocesadas y genera predicciones numéricas. Estas se decodifican para obtener las coordenadas de las cajas delimitadoras (bounding boxes). Se aplica filtrado por nivel de confianza y el algoritmo NMS (Non-Maximum Suppression) para eliminar solapamientos.

**3. Posprocesamiento**
Los resultados se transforman a dimensiones originales y se enriquecen con contadores y alertas accesibles para el usuario mediante TTS y vibraciones.

📐 **Ver diagrama de Arquitectura de Alto Nivel** en la sección de diagramas para una visualización completa del flujo.`,
          en: `The data flow during model usage follows three phases:

**1. Preprocessing**
Environment capture from camera → Resize to 640×640 → Normalization → Tensorization for model compatibility.

**2. Inference**
The ONNX model receives preprocessed images and generates numerical predictions. These are decoded to obtain bounding box coordinates. Confidence-level filtering and NMS (Non-Maximum Suppression) algorithm are applied to eliminate overlaps.

**3. Postprocessing**
Results are transformed back to original dimensions and enriched with counters and accessible alerts for the user via TTS and vibrations.

📐 **See High-Level Architecture diagram** in the diagrams section for a complete flow visualization.`
        }
      },
      {
        title: {
          es: 'Pipeline ETL de Entrenamiento',
          en: 'Training ETL Pipeline'
        },
        content: {
          es: `El proceso de entrenamiento de los modelos sigue un pipeline ETL riguroso:

**Extracción**
Recolección de imágenes desde múltiples fuentes: capturas propias en distintas zonas del AMBA (veredas), imágenes web y frames de video (colectivos), y datasets públicos depurados (peatones).

**Transformación**
• Etiquetado manual con Label Studio definiendo clases y bounding boxes
• Generación de particiones 80/10/10 (train/val/test)
• Augmentación de datos: variaciones de iluminación, rotaciones, escalados, mosaic

**Carga**
Entrenamiento iterativo ajustando hiperparámetros hasta alcanzar métricas satisfactorias. Exportación a ONNX con NMS incorporado para simplificar la inferencia móvil.`,
          en: `The model training process follows a rigorous ETL pipeline:

**Extraction**
Image collection from multiple sources: own captures in different AMBA areas (sidewalks), web images and video frames (buses), and curated public datasets (pedestrians).

**Transformation**
• Manual labeling with Label Studio defining classes and bounding boxes
• 80/10/10 partition generation (train/val/test)
• Data augmentation: lighting variations, rotations, scaling, mosaic

**Load**
Iterative training adjusting hyperparameters until satisfactory metrics are achieved. Export to ONNX with built-in NMS to simplify mobile inference.`
        },
        diagramUrl: 'assets/documentos/sensai/ETL de aprendizaje automático.pdf'
      },
      {
        title: {
          es: 'Confección de Datasets',
          en: 'Dataset Creation'
        },
        content: {
          es: `Se construyeron tres datasets independientes para entrenar modelos especializados:

**Dataset de Veredas (~600 imágenes)**
Capturas propias en el AMBA en diferentes condiciones de iluminación y clima. Clase única "daño en vereda" que incluye baldosas levantadas, faltantes y desniveles.
• Entrenamiento: 200 épocas, paciencia 40, batch 16
• Augmentación fuerte en iluminación y saturación

**Dataset de Peatones (~1000 imágenes)**
Datasets públicos depurados para incluir solo personas cercanas como obstáculos.
• Entrenamiento: 120 épocas, paciencia 25, batch 16
• Augmentación centrada en variaciones de iluminación urbana

**Dataset de Colectivos (~800 imágenes)**
Imágenes web y frames de video con frentes de colectivos. Clases separadas por línea (324, 152, 365) con 125-400 imágenes cada una.
• Entrenamiento: 150 épocas, paciencia 30, batch 16
• Augmentación geométrica suave para no desestructurar la morfología`,
          en: `Three independent datasets were built to train specialized models:

**Sidewalks Dataset (~600 images)**
Own captures in AMBA under different lighting and weather conditions. Single class "sidewalk damage" including raised, missing tiles and uneven surfaces.
• Training: 200 epochs, patience 40, batch 16
• Strong augmentation in lighting and saturation

**Pedestrians Dataset (~1000 images)**
Curated public datasets to include only nearby people as obstacles.
• Training: 120 epochs, patience 25, batch 16
• Augmentation focused on urban lighting variations

**Buses Dataset (~800 images)**
Web images and video frames with bus fronts. Separate classes by line (324, 152, 365) with 125-400 images each.
• Training: 150 epochs, patience 30, batch 16
• Soft geometric augmentation to not destructure morphology`
        }
      },
      {
        title: {
          es: 'Diseño Accesible',
          en: 'Accessible Design'
        },
        content: {
          es: `SensAi fue diseñada desde su origen para personas con discapacidad visual:

**Feedback Multimodal**
• Visual: cambios en borde/relleno de tiles ON/OFF
• Auditivo: mensajes TTS breves como "Peatón detectado"
• Háptico: patrones de vibración para obstáculos y colectivos

**Compatibilidad TalkBack**
• Descripciones claras en cada botón y sección
• Títulos marcados como encabezados para navegación
• Estructura predecible con recorrido lineal
• Áreas de contacto amplias y fáciles de encontrar

**Accesibilidad Visual**
• Tipografía Atkinson Hyperlegible (diseñada por Braille Institute)
• Modos claro, oscuro y alto contraste
• Ajuste de tamaño de tipografía`,
          en: `SensAi was designed from the ground up for visually impaired people:

**Multimodal Feedback**
• Visual: border/fill changes in ON/OFF tiles
• Audio: brief TTS messages like "Pedestrian detected"
• Haptic: vibration patterns for obstacles and buses

**TalkBack Compatibility**
• Clear descriptions on each button and section
• Titles marked as headings for navigation
• Predictable structure with linear traversal
• Large, easy-to-find touch areas

**Visual Accessibility**
• Atkinson Hyperlegible typography (designed by Braille Institute)
• Light, dark and high contrast modes
• Font size adjustment`
        }
      },
      {
        title: {
          es: 'Análisis Competitivo',
          en: 'Competitive Analysis'
        },
        content: {
          es: `SensAi se diferencia de las soluciones existentes en varios aspectos clave:

**vs Ray-Ban Meta / OrCam MyEye**
No requiere hardware adicional costoso. Funciona únicamente con el celular que el usuario ya posee.

**vs Google Lookout**
Única solución con detección de veredas rotas, uno de los obstáculos más reportados en el AMBA.

**vs WeWALK**
Distingue la naturaleza de los obstáculos (persona vs vereda vs colectivo), no solo advierte su presencia.

**vs Moovit / Cuándo SUBO**
Permite identificar visualmente qué colectivo llegó cuando varias líneas coinciden en la misma parada, no depende solo de GPS.

**Propuesta Única**
Diseño centrado en discapacidad visual desde el origen, no como feature agregada posteriormente.`,
          en: `SensAi differentiates from existing solutions in several key aspects:

**vs Ray-Ban Meta / OrCam MyEye**
No expensive additional hardware required. Works only with the phone the user already owns.

**vs Google Lookout**
Only solution with broken sidewalk detection, one of the most reported obstacles in AMBA.

**vs WeWALK**
Distinguishes the nature of obstacles (person vs sidewalk vs bus), not just warns of their presence.

**vs Moovit / Cuándo SUBO**
Allows visual identification of which bus arrived when multiple lines coincide at the same stop, not dependent on GPS alone.

**Unique Proposition**
Design centered on visual impairment from the start, not as a feature added later.`
        },
        imageUrl: 'assets/images/sensai/sensai_competencia.webp'
      }
    ],
    diagrams: [
      {
        title: { es: 'Arquitectura de Alto Nivel', en: 'High-Level Architecture' },
        url: 'assets/documentos/sensai/sensai_alto_nivel2.pdf',
        description: { es: 'Diagrama de componentes y flujo de datos de la aplicación', en: 'Application component diagram and data flow' }
      },
      {
        title: { es: 'ETL de Aprendizaje Automático', en: 'Machine Learning ETL' },
        url: 'assets/documentos/sensai/ETL de aprendizaje automático.pdf',
        description: { es: 'Pipeline de extracción, transformación y carga para entrenamiento', en: 'Extraction, transformation and loading pipeline for training' }
      }
    ],
    demoVideos: [
      // App demos
      {
        title: { es: 'Demo Línea 152', en: 'Line 152 Demo' },
        url: 'assets/videos/sensai/demo_152.mp4',
        description: { 
          es: 'Demostración de la app detectando colectivo línea 152 en tiempo real', 
          en: 'App demo detecting line 152 bus in real-time' 
        },
        category: 'app'
      },
      {
        title: { es: 'Demo Línea 324', en: 'Line 324 Demo' },
        url: 'assets/videos/sensai/demo_324.mp4',
        description: { 
          es: 'Demostración de la app detectando colectivo línea 324 en tiempo real', 
          en: 'App demo detecting line 324 bus in real-time' 
        },
        category: 'app'
      },
      {
        title: { es: 'Demo Línea 365', en: 'Line 365 Demo' },
        url: 'assets/videos/sensai/demo_365.mp4',
        description: { 
          es: 'Demostración de la app detectando colectivo línea 365 en tiempo real', 
          en: 'App demo detecting line 365 bus in real-time' 
        },
        category: 'app'
      },
      {
        title: { es: 'Demo Vereda Rota', en: 'Broken Sidewalk Demo' },
        url: 'assets/videos/sensai/demo_vereda.mp4',
        description: { 
          es: 'Demostración de la app detectando veredas en mal estado', 
          en: 'App demo detecting sidewalks in poor condition' 
        },
        category: 'app'
      },
      // Model detection demos
      {
        title: { es: 'Detección Colectivo 324', en: 'Bus 324 Detection' },
        url: 'assets/videos/sensai/boxes_324.mp4',
        description: { 
          es: 'Visualización de bounding boxes del modelo detectando colectivo 324', 
          en: 'Bounding box visualization of model detecting bus 324' 
        },
        category: 'model',
        format: 'landscape'
      },
      {
        title: { es: 'Detección Peatones', en: 'Pedestrian Detection' },
        url: 'assets/videos/sensai/boxes_person.mp4',
        description: { 
          es: 'Visualización de bounding boxes del modelo detectando peatones', 
          en: 'Bounding box visualization of model detecting pedestrians' 
        },
        category: 'model',
        format: 'landscape'
      },
      {
        title: { es: 'Detección Veredas', en: 'Sidewalk Detection' },
        url: 'assets/videos/sensai/boxes_sidewalk.mp4',
        description: { 
          es: 'Visualización de bounding boxes del modelo detectando daños en veredas', 
          en: 'Bounding box visualization of model detecting sidewalk damage' 
        },
        category: 'model'
      }
    ],
    gallery: [
      {
        title: { es: 'Tema Claro', en: 'Light Theme' },
        images: [
          { url: 'assets/images/sensai/tema_claro (0).webp', caption: { es: 'Pantalla principal', en: 'Main screen' } },
          { url: 'assets/images/sensai/tema_claro (2).webp', caption: { es: 'Menú de Opciones', en: 'Options Menu' } },
          { url: 'assets/images/sensai/tema_claro (6).webp', caption: { es: 'Menú de Configuración', en: 'Settings Menu' } },
          { url: 'assets/images/sensai/tema_claro (5).webp', caption: { es: 'Pantalla de Ayuda', en: 'Help Screen' } }
        ]
      },
      {
        title: { es: 'Tema Oscuro', en: 'Dark Theme' },
        images: [
          { url: 'assets/images/sensai/tema_oscuro (0).webp', caption: { es: 'Pantalla principal', en: 'Main screen' } },
          { url: 'assets/images/sensai/tema_oscuro (2).webp', caption: { es: 'Menú de Opciones', en: 'Options Menu' } },
          { url: 'assets/images/sensai/tema_oscuro (6).webp', caption: { es: 'Menú de Configuración', en: 'Settings Menu' } },
          { url: 'assets/images/sensai/tema_oscuro (5).webp', caption: { es: 'Pantalla de Ayuda', en: 'Help Screen' } }
        ]
      },
      {
        title: { es: 'Alto Contraste Claro', en: 'Light High Contrast' },
        images: [
          { url: 'assets/images/sensai/tema_claro_alto_contraste (0).webp', caption: { es: 'Pantalla principal', en: 'Main screen' } },
          { url: 'assets/images/sensai/tema_claro_alto_contraste (2).webp', caption: { es: 'Menú de Opciones', en: 'Options Menu' } },
          { url: 'assets/images/sensai/tema_claro_alto_contraste (6).webp', caption: { es: 'Menú de Configuración', en: 'Settings Menu' } },
          { url: 'assets/images/sensai/tema_claro_alto_contraste (5).webp', caption: { es: 'Pantalla de Ayuda', en: 'Help Screen' } }
        ]
      },
      {
        title: { es: 'Alto Contraste Oscuro', en: 'Dark High Contrast' },
        images: [
          { url: 'assets/images/sensai/tema_oscuro_alto_contraste (0).webp', caption: { es: 'Pantalla principal', en: 'Main screen' } },
          { url: 'assets/images/sensai/tema_oscuro_alto_contraste (2).webp', caption: { es: 'Menú de Opciones', en: 'Options Menu' } },
          { url: 'assets/images/sensai/tema_oscuro_alto_contraste (6).webp', caption: { es: 'Menú de Configuración', en: 'Settings Menu' } },
          { url: 'assets/images/sensai/tema_oscuro_alto_contraste (5).webp', caption: { es: 'Pantalla de Ayuda', en: 'Help Screen' } }
        ]
      }
    ],
  },

  // === Tribe - Red Social ===
  {
    id: 'tribe',
    title: {
      es: 'Tribe',
      en: 'Tribe'
    },
    shortDescription: {
      es: 'Red social móvil con autenticación biométrica, gamificación, temas dinámicos y soporte multilenguaje.',
      en: 'Mobile social network with biometric authentication, gamification, dynamic themes and multilingual support.'
    },
    introDescription: {
      es: `Red social móvil completa con **arquitectura de seguridad robusta**: autenticación biométrica nativa, JWT con refresh tokens, Magic Links y protección contra ataques comunes. Incluye sistema de **gamificación** con XP, niveles y logros desbloqueables. Desarrollada en 8 meses con React Native y backend Node.js/MongoDB.

**¿Qué es Tribe?** Una red social donde podés compartir publicaciones con ubicación, dar likes, comentar, seguir usuarios y personalizar tu experiencia con temas claros/oscuros e idiomas. El sistema de gamificación te premia con XP por cada interacción, desbloqueando niveles y logros.`,
      en: `Complete mobile social network with **robust security architecture**: native biometric authentication, JWT with refresh tokens, Magic Links and protection against common attacks. Includes **gamification system** with XP, levels and unlockable achievements. Developed in 8 months with React Native and Node.js/MongoDB backend.

**What is Tribe?** A social network where you can share location-tagged posts, like, comment, follow users and customize your experience with light/dark themes and languages. The gamification system rewards you with XP for every interaction, unlocking levels and achievements.`
    },
    fullDescription: {
      es: `Tribe es una aplicación móvil tipo red social completa desarrollada con React Native, con un fuerte enfoque en seguridad. La app implementa múltiples capas de protección y mejores prácticas de la industria para garantizar la seguridad de los datos de los usuarios.

**Arquitectura de Seguridad**
La seguridad es el pilar fundamental de Tribe. Implementamos un sistema de defensa en profundidad que incluye: autenticación multifactor (MFA) con biometría nativa, gestión segura de tokens con JWT y refresh tokens, Magic Links para autenticación sin contraseña, hashing robusto con bcrypt, validación exhaustiva de inputs, y protección contra ataques comunes (inyección, XSS, CSRF).

**Autenticación Biométrica**
Integración nativa con los sensores biométricos del dispositivo (huella dactilar y Face ID/reconocimiento facial) usando react-native-biometrics, proporcionando una capa adicional de seguridad sin sacrificar la experiencia de usuario.

**Gestión Segura de Sesiones**
Sistema de tokens dual: access tokens de corta duración (15 minutos) para operaciones y refresh tokens de larga duración (7 días) almacenados de forma segura, con rotación automática y detección de sesiones comprometidas.

**Sistema de Gamificación**
Los usuarios ganan experiencia (XP) por interacciones, suben de nivel y desbloquean logros.

**Funcionalidades Core**
Feed con publicaciones geolocalizadas, sistema de likes/favoritos, comentarios, búsqueda de usuarios, seguimiento social, y cámara moderna con Vision Camera.`,
      en: `Tribe is a complete social network mobile application built with React Native, with a strong focus on security. The app implements multiple layers of protection and industry best practices to ensure user data security.

**Security Architecture**
Security is the fundamental pillar of Tribe. We implement a defense-in-depth system that includes: multi-factor authentication (MFA) with native biometrics, secure token management with JWT and refresh tokens, Magic Links for passwordless authentication, robust hashing with bcrypt, exhaustive input validation, and protection against common attacks (injection, XSS, CSRF).

**Biometric Authentication**
Native integration with device biometric sensors (fingerprint and Face ID/facial recognition) using react-native-biometrics, providing an additional security layer without sacrificing user experience.

**Secure Session Management**
Dual token system: short-lived access tokens (15 minutes) for operations and long-lived refresh tokens (7 days) stored securely, with automatic rotation and compromised session detection.

**Gamification System**
Users earn experience (XP) for interactions, level up and unlock achievements.

**Core Features**
Feed with geolocated posts, likes/favorites system, comments, user search, social following, and modern camera with Vision Camera.`
    },
    technologies: ['React Native', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Vision Camera', 'AsyncStorage'],
    tags: ['Mobile', 'API', 'Security'],
    imageUrl: 'assets/images/projects/tribe_logo.webp',
    imageStyle: 'contain',
    codeUrl: 'https://github.com/mrosariopresedo/Tribe',
    featured: false,
    category: 'main',
    role: {
      es: 'Desarrollador Mobile Full Stack',
      en: 'Full Stack Mobile Developer'
    },
    duration: '8 meses',
    team: 2,
    highlights: {
      es: [
        'Autenticación biométrica nativa (huella + Face ID)',
        'Hashing seguro con bcrypt (12 rounds de salt)',
        'JWT con refresh tokens y rotación automática',
        'Magic Links con tokens únicos y uso único',
        'Validación de inputs contra inyección SQL/NoSQL',
        'Protección contra XSS y CSRF',
        'Detección de sesiones comprometidas',
        'API REST documentada con Swagger/OpenAPI'
      ],
      en: [
        'Native biometric auth (fingerprint + Face ID)',
        'Secure hashing with bcrypt (12 salt rounds)',
        'JWT with refresh tokens and automatic rotation',
        'Magic Links with unique single-use tokens',
        'Input validation against SQL/NoSQL injection',
        'XSS and CSRF protection',
        'Compromised session detection',
        'REST API documented with Swagger/OpenAPI'
      ]
    },
    sections: [
      {
        title: {
          es: 'Autenticación y Seguridad',
          en: 'Authentication & Security'
        },
        content: {
          es: `El sistema de autenticación implementa múltiples capas de seguridad siguiendo estándares de la industria:

**Hashing de Contraseñas**: Implementación de bcrypt con 12 rounds de salt, haciendo computacionalmente inviable el cracking por fuerza bruta.

**JWT con Refresh Tokens**: Access tokens de corta duración (15 min) y refresh tokens de larga duración (7 días) para balance entre seguridad y UX.

**Biometría Nativa**: Integración con react-native-biometrics para huella dactilar y reconocimiento facial.

**Magic Links**: Sistema de login sin contraseña que envía enlaces únicos por email con expiración de 15 minutos y uso único.

**Validación de Inputs**: Sanitización de datos de entrada para prevenir inyección SQL/NoSQL y XSS.

**Manejo de Sesiones**: Detección automática de tokens expirados con flujo de re-autenticación transparente.`,
          en: `The authentication system implements multiple security layers following industry standards:

**Password Hashing**: bcrypt implementation with 12 salt rounds, making brute force cracking computationally infeasible.

**JWT with Refresh Tokens**: Short-lived access tokens (15 min) and long-lived refresh tokens (7 days) for balance between security and UX.

**Native Biometrics**: Integration with react-native-biometrics for fingerprint and facial recognition.

**Magic Links**: Passwordless login system that sends unique links via email with 15-minute expiration and single use.

**Input Validation**: Input data sanitization to prevent SQL/NoSQL injection and XSS.

**Session Management**: Automatic detection of expired tokens with transparent re-authentication flow.`
        }
      },
      {
        title: {
          es: 'Sistema de Gamificación',
          en: 'Gamification System'
        },
        content: {
          es: `Tribe implementa un sistema de gamificación para aumentar el engagement:

**Experiencia (XP)**: Los usuarios ganan puntos por cada acción: publicar (+50 XP), dar like (+5 XP), comentar (+10 XP), ganar seguidores (+20 XP).

**Niveles**: Sistema de progresión con 50 niveles. Cada nivel requiere más XP que el anterior siguiendo una curva exponencial.

**Logros**: Badges desbloqueables por hitos específicos: "Primera publicación", "100 likes recibidos", "10 seguidores", etc.

**Métricas Personales**: Dashboard con estadísticas de actividad, gráficos de progreso y historial de acciones.`,
          en: `Tribe implements a gamification system to increase engagement:

**Experience (XP)**: Users earn points for each action: posting (+50 XP), liking (+5 XP), commenting (+10 XP), gaining followers (+20 XP).

**Levels**: Progression system with 50 levels. Each level requires more XP than the previous one following an exponential curve.

**Achievements**: Unlockable badges for specific milestones: "First post", "100 likes received", "10 followers", etc.

**Personal Metrics**: Dashboard with activity statistics, progress charts and action history.`
        }
      },
      {
        title: {
          es: 'Arquitectura Técnica',
          en: 'Technical Architecture'
        },
        content: {
          es: `**Frontend (React Native 0.75)**
- Navegación: React Navigation con Stack y Bottom Tabs
- Estado: Context API para User, Theme, Language y Posts
- Estilos: StyleSheet dinámicos con sistema de temas
- Componentes: Arquitectura modular con separación por features

**Backend (Node.js/Express)**
- API REST con rutas protegidas por JWT middleware
- MongoDB con Mongoose para modelado de datos
- Controladores separados: auth, users, posts, gamification
- Validación de datos con express-validator`,
          en: `**Frontend (React Native 0.75)**
- Navigation: React Navigation with Stack and Bottom Tabs
- State: Context API for User, Theme, Language and Posts
- Styles: Dynamic StyleSheet with theming system
- Components: Modular architecture with feature separation

**Backend (Node.js/Express)**
- REST API with JWT middleware protected routes
- MongoDB with Mongoose for data modeling
- Separated controllers: auth, users, posts, gamification
- Data validation with express-validator`
        }
      }
    ],
    demoVideos: [
      // === AUTENTICACIÓN Y SEGURIDAD ===
      {
        title: { es: 'Inicio de Sesión', en: 'Login Flow' },
        url: 'assets/videos/tribe/00_inicio_sesion.mp4',
        description: { 
          es: 'Autenticación tradicional con validación de credenciales, JWT tokens y manejo de errores en tiempo real.', 
          en: 'Traditional authentication with credential validation, JWT tokens and real-time error handling.' 
        },
        category: 'auth'
      },
      {
        title: { es: 'Autenticación Biométrica', en: 'Biometric Auth' },
        url: 'assets/videos/tribe/09_biometria.mp4',
        description: { 
          es: 'Login con huella dactilar o Face ID utilizando react-native-biometrics.', 
          en: 'Fingerprint or Face ID login using react-native-biometrics.' 
        },
        category: 'auth'
      },
      {
        title: { es: 'Cambiar Contraseña', en: 'Change Password' },
        url: 'assets/videos/tribe/08_cambiar-contraseña.mp4',
        description: { 
          es: 'Flujo seguro de cambio de contraseña con validación de contraseña actual, requisitos de seguridad y confirmación visual.', 
          en: 'Secure password change flow with current password validation, security requirements and visual confirmation.' 
        },
        category: 'auth'
      },
      // === CONTENIDO SOCIAL ===
      {
        title: { es: 'Feed Principal', en: 'Main Feed' },
        url: 'assets/videos/tribe/01_feed.mp4',
        description: { 
          es: 'Timeline infinito con publicaciones geolocalizadas, pull-to-refresh y carga lazy loading optimizada para rendimiento.', 
          en: 'Infinite timeline with geolocated posts, pull-to-refresh and lazy loading optimized for performance.' 
        },
        category: 'social'
      },
      {
        title: { es: 'Detalle de Publicación', en: 'Post Detail' },
        url: 'assets/videos/tribe/02_detalle-publicacion.mp4',
        description: { 
          es: 'Vista expandida con imagen completa, ubicación del post, sistema de comentarios con scroll infinito y acciones sociales.', 
          en: 'Expanded view with full image, post location, comment system with infinite scroll and social actions.' 
        },
        category: 'social'
      },
      {
        title: { es: 'Likes y Favoritos', en: 'Likes & Favorites' },
        url: 'assets/videos/tribe/03_like-fav.mp4',
        description: { 
          es: 'Sistema dual de interacciones: likes para engagement público y favoritos para guardar contenido privado. Animaciones fluidas.', 
          en: 'Dual interaction system: likes for public engagement and favorites for private content saving. Smooth animations.' 
        },
        category: 'social'
      },
      {
        title: { es: 'Notificaciones', en: 'Notifications' },
        url: 'assets/videos/tribe/04_notificaciones.mp4',
        description: { 
          es: 'Centro de notificaciones con categorías: nuevos seguidores, likes, comentarios y menciones. Marcado como leído individual o masivo.', 
          en: 'Notification center with categories: new followers, likes, comments and mentions. Individual or bulk mark as read.' 
        },
        category: 'social'
      },
      {
        title: { es: 'Crear Publicación', en: 'Create Post' },
        url: 'assets/videos/tribe/16_subir.mp4',
        description: { 
          es: 'Flujo completo de creación: captura/selección de imagen, añadir descripción, geolocalización automática y publicación.', 
          en: 'Complete creation flow: image capture/selection, add description, automatic geolocation and publishing.' 
        },
        category: 'social'
      },
      {
        title: { es: 'Búsqueda de Usuarios', en: 'User Search' },
        url: 'assets/videos/tribe/17_buscar.mp4',
        description: { 
          es: 'Búsqueda en tiempo real con debounce, resultados filtrados, preview de perfil y acción de seguir directa.', 
          en: 'Real-time search with debounce, filtered results, profile preview and direct follow action.' 
        },
        category: 'social'
      },
      // === PERFIL Y GAMIFICACIÓN ===
      {
        title: { es: 'Perfil de Usuario', en: 'User Profile' },
        url: 'assets/videos/tribe/10_perfil-de-usuario.mp4',
        description: { 
          es: 'Vista completa del perfil: avatar, portada, bio, estadísticas (posts, seguidores, siguiendo), grid de publicaciones y nivel de XP.', 
          en: 'Complete profile view: avatar, cover, bio, stats (posts, followers, following), posts grid and XP level.' 
        },
        category: 'profile'
      },
      {
        title: { es: 'Métricas Personales', en: 'Personal Metrics' },
        url: 'assets/videos/tribe/05_metricas.mp4',
        description: { 
          es: 'Dashboard analítico con estadísticas de actividad, gráficos de engagement, historial de acciones y tendencias de crecimiento.', 
          en: 'Analytics dashboard with activity stats, engagement charts, action history and growth trends.' 
        },
        category: 'profile'
      },
      {
        title: { es: 'Sistema de Gamificación', en: 'Gamification System' },
        url: 'assets/videos/tribe/11_gamificacion.mp4',
        description: { 
          es: 'Progresión RPG: XP por acciones (publicar +50, comentar +10, likes +5), 50 niveles con curva exponencial, badges desbloqueables.', 
          en: 'RPG progression: XP for actions (post +50, comment +10, likes +5), 50 levels with exponential curve, unlockable badges.' 
        },
        category: 'profile'
      },
      // === CONFIGURACIÓN Y PERSONALIZACIÓN ===
      {
        title: { es: 'Configuración de Cuenta', en: 'Account Settings' },
        url: 'assets/videos/tribe/06_opciones-cuenta.mp4',
        description: { 
          es: 'Panel de configuración organizado por secciones: perfil, seguridad, apariencia, idioma y notificaciones.', 
          en: 'Settings panel organized by sections: profile, security, appearance, language and notifications.' 
        },
        category: 'settings'
      },
      {
        title: { es: 'Cambiar Imágenes', en: 'Change Images' },
        url: 'assets/videos/tribe/07_opciones-cuenta-cambiar-imagenes-personales.mp4',
        description: { 
          es: 'Personalización visual: cambio de avatar y foto de portada desde galería o cámara, con preview y crop integrado.', 
          en: 'Visual customization: avatar and cover photo change from gallery or camera, with integrated preview and crop.' 
        },
        category: 'settings'
      },
      {
        title: { es: 'Cambio de Tema', en: 'Theme Switching' },
        url: 'assets/videos/tribe/12_cambio-tema.mp4',
        description: { 
          es: 'Alternancia fluida entre tema claro y oscuro con transiciones suaves. Preferencia persistida en AsyncStorage.', 
          en: 'Smooth toggle between light and dark themes with soft transitions. Preference persisted in AsyncStorage.' 
        },
        category: 'settings'
      },
      {
        title: { es: 'Cambio de Idioma', en: 'Language Switch' },
        url: 'assets/videos/tribe/13_cambio-idioma.mp4',
        description: { 
          es: 'Internacionalización (i18n) con cambio en tiempo real sin reinicio de la app. Soporte para español e inglés.', 
          en: 'Internationalization (i18n) with real-time switching without app restart. Spanish and English support.' 
        },
        category: 'settings'
      },
      {
        title: { es: 'Demo Idioma Inglés - Inicio', en: 'English Demo - Home' },
        url: 'assets/videos/tribe/14_cambio-idioma-pagina-inicio-ingles.mp4',
        description: { 
          es: 'Demostración de la pantalla de inicio completamente traducida al inglés, mostrando la cobertura total de traducciones.', 
          en: 'Demonstration of the home screen fully translated to English, showing complete translation coverage.' 
        },
        category: 'settings'
      },
      {
        title: { es: 'Demo Idioma Inglés - Config', en: 'English Demo - Settings' },
        url: 'assets/videos/tribe/15_cambio-idioma-conf-usuario-ingles.mp4',
        description: { 
          es: 'Pantalla de configuración en inglés, demostrando que todos los textos están correctamente traducidos.', 
          en: 'Settings screen in English, demonstrating that all texts are correctly translated.' 
        },
        category: 'settings'
      }
    ],
    links: [
      { label: { es: 'API Docs (Swagger)', en: 'API Docs (Swagger)' }, url: 'https://github.com/mrosariopresedo/Tribe/blob/main/TribeBackend/docs/swagger.yaml', type: 'docs' }
    ]
  },

  // === MoodFlix - Buscador de Películas ===
  {
    id: 'moodflix',
    title: {
      es: 'MoodFlix',
      en: 'MoodFlix'
    },
    shortDescription: {
      es: 'Plataforma web de descubrimiento cinematográfico con playlists personalizadas, trailers y sistema de recomendaciones.',
      en: 'Web platform for movie discovery with personalized playlists, trailers and recommendation system.'
    },
    introDescription: {
      es: `Plataforma web full-stack para descubrir qué ver cuando no sabés qué elegir. Integración completa con **The Movie Database API**, sistema de **playlists CRUD** con persistencia en MongoDB, y filtrado por plataformas de streaming (Netflix, Prime, Disney+). Interfaz moderna con animaciones fluidas y diseño responsive.

**¿Qué es MoodFlix?** Una web app que te ayuda a encontrar películas según tu estado de ánimo o preferencias. Podés buscar por género, año, rating, ver trailers embebidos, crear playlists personalizadas y ver en qué plataforma está disponible cada título.`,
      en: `Full-stack web platform to discover what to watch when you don't know what to choose. Full integration with **The Movie Database API**, **CRUD playlist system** with MongoDB persistence, and filtering by streaming platforms (Netflix, Prime, Disney+). Modern interface with smooth animations and responsive design.

**What is MoodFlix?** A web app that helps you find movies based on your mood or preferences. You can search by genre, year, rating, watch embedded trailers, create personalized playlists, and see which platform each title is available on.`
    },
    fullDescription: {
      es: `MoodFlix es una plataforma diseñada para ayudarte a encontrar qué ver cuando no estás seguro. Desarrollada como proyecto de la materia Aplicaciones Interactivas en UADE.

**Descubrimiento Inteligente**
Búsqueda avanzada con filtros por género, año, rating y plataforma de streaming. El sistema muestra dónde está disponible cada película (Netflix, Amazon Prime, Disney+, etc.).

**Playlists Personalizadas**
Creá y gestioná tus propias listas de películas. Marcá películas como "vistas", agregá a favoritos, y organizá tu watchlist a tu manera.

**Información Completa**
Cada película incluye sinopsis, rating con estrellas, año de lanzamiento, trailer embebido de YouTube, y plataformas de streaming disponibles.

**Sistema de Usuarios**
Registro, login y persistencia de datos. Tus playlists y preferencias se guardan en tu cuenta para acceder desde cualquier dispositivo.

**Interfaz Moderna**
UI con gradientes púrpura/rosa, animaciones fluidas, diseño responsive y notificaciones con sonido para feedback inmediato.`,
      en: `MoodFlix is a platform designed to help you find what to watch when you're not sure. Developed as a project for the Interactive Applications course at UADE.

**Smart Discovery**
Advanced search with filters by genre, year, rating and streaming platform. The system shows where each movie is available (Netflix, Amazon Prime, Disney+, etc.).

**Personalized Playlists**
Create and manage your own movie lists. Mark movies as "watched", add to favorites, and organize your watchlist your way.

**Complete Information**
Each movie includes synopsis, star rating, release year, embedded YouTube trailer, and available streaming platforms.

**User System**
Registration, login and data persistence. Your playlists and preferences are saved to your account for access from any device.

**Modern Interface**
UI with purple/pink gradients, smooth animations, responsive design and sound notifications for immediate feedback.`
    },
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Material UI', 'Node.js', 'Express', 'MongoDB', 'JWT', 'TMDB API', 'Axios'],
    tags: ['Web', 'API'],
    imageUrl: 'assets/images/projects/moodflix_logo.webp',
    imageStyle: 'contain',
    videoUrl: 'assets/videos/moodflix-demo.mp4',
    videoFormat: 'desktop',
    codeUrl: 'https://github.com/mrosariopresedo/APIS',
    featured: false,
    category: 'main',
    role: {
      es: 'Desarrollador Full Stack',
      en: 'Full Stack Developer'
    },
    duration: '4 meses',
    team: 4,
    highlights: {
      es: [
        'Integración completa con The Movie Database API',
        'Sistema CRUD de playlists con persistencia en MongoDB',
        'Autenticación JWT con cookies seguras',
        'Visualización de trailers de YouTube embebidos',
        'Filtrado por plataformas de streaming (Netflix, Prime, Disney+)',
        'Notificaciones con feedback de sonido',
        'Diseño responsive con gradientes y animaciones'
      ],
      en: [
        'Full integration with The Movie Database API',
        'Playlist CRUD system with MongoDB persistence',
        'JWT authentication with secure cookies',
        'Embedded YouTube trailer viewing',
        'Filtering by streaming platforms (Netflix, Prime, Disney+)',
        'Notifications with sound feedback',
        'Responsive design with gradients and animations'
      ]
    },
    sections: [
      {
        title: {
          es: 'Arquitectura del Sistema',
          en: 'System Architecture'
        },
        content: {
          es: `El proyecto sigue una arquitectura cliente-servidor con separación clara de responsabilidades:

**Frontend (React + Vite)**
• Context API para estado global (sesión, playlists, búsqueda)
• Componentes reutilizables con Material UI y Tailwind
• Routing con React Router
• Axios para comunicación con backend

**Backend (Node.js + Express)**
• API RESTful con endpoints para usuarios, películas y playlists
• Autenticación con JWT almacenado en cookies HttpOnly
• Mongoose para modelado de datos en MongoDB
• Proxy a TMDB API para datos de películas`,
          en: `The project follows a client-server architecture with clear separation of concerns:

**Frontend (React + Vite)**
• Context API for global state (session, playlists, search)
• Reusable components with Material UI and Tailwind
• Routing with React Router
• Axios for backend communication

**Backend (Node.js + Express)**
• RESTful API with endpoints for users, movies and playlists
• JWT authentication stored in HttpOnly cookies
• Mongoose for MongoDB data modeling
• TMDB API proxy for movie data`
        }
      }
    ],
    demoVideos: [
      // Landing & Auth
      {
        title: { es: 'Landing Page', en: 'Landing Page' },
        url: 'assets/videos/moodflix/00_landing_effect.mp4',
        description: { 
          es: 'Efecto visual de la página de inicio con animaciones CSS y diseño responsive', 
          en: 'Visual effect of landing page with CSS animations and responsive design' 
        },
        category: 'landing'
      },
      {
        title: { es: 'Login Flow', en: 'Login Flow' },
        url: 'assets/videos/moodflix/01_login_flow.mp4',
        description: { 
          es: 'Flujo de inicio de sesión con manejo de formularios, tokens y feedback toast', 
          en: 'Login flow with form handling, tokens and toast feedback' 
        },
        category: 'landing'
      },
      {
        title: { es: 'Navegación Home', en: 'Home Navigation' },
        url: 'assets/videos/moodflix/10_nav_home_logo.mp4',
        description: { 
          es: 'Navegación rápida al home mediante click en logo, limpieza de estado', 
          en: 'Quick navigation to home via logo click, state cleanup' 
        },
        category: 'landing'
      },
      // Discovery
      {
        title: { es: 'Probar Suerte', en: 'Try Your Luck' },
        url: 'assets/videos/moodflix/02_try_luck_feature.mp4',
        description: { 
          es: 'Feature principal de descubrimiento aleatorio con skeleton loading y renderizado dinámico', 
          en: 'Main random discovery feature with skeleton loading and dynamic rendering' 
        },
        category: 'discovery'
      },
      // Playlist Management
      {
        title: { es: 'Vista de Playlists', en: 'Playlists View' },
        url: 'assets/videos/moodflix/03_playlist_scroll.mp4',
        description: { 
          es: 'Vista de playlists con scroll optimizado y componentes interactivos', 
          en: 'Playlists view with optimized scroll and interactive components' 
        },
        category: 'playlist'
      },
      {
        title: { es: 'Editar Playlist', en: 'Edit Playlist' },
        url: 'assets/videos/moodflix/04_crud_edit_playlist.mp4',
        description: { 
          es: 'CRUD de playlists: editar y renombrar con modal y feedback asíncrono', 
          en: 'Playlist CRUD: edit and rename with modal and async feedback' 
        },
        category: 'playlist'
      },
      {
        title: { es: 'Agregar a Lista', en: 'Add to List' },
        url: 'assets/videos/moodflix/09_crud_add_to_list.mp4',
        description: { 
          es: 'Agregar películas a listas con feedback visual y sonoro', 
          en: 'Add movies to lists with visual and sound feedback' 
        },
        category: 'playlist'
      },
      // Detail
      {
        title: { es: 'Detalle de Película', en: 'Movie Detail' },
        url: 'assets/videos/moodflix/05_movie_detail_modal.mp4',
        description: { 
          es: 'Modal de detalle con rating, sinopsis y datos completos', 
          en: 'Detail modal with rating, synopsis and complete data' 
        },
        category: 'detail'
      },
      {
        title: { es: 'Reproducir Trailer', en: 'Play Trailer' },
        url: 'assets/videos/moodflix/06_play_trailer.mp4',
        description: { 
          es: 'Integración de YouTube iframe para reproducción de trailers', 
          en: 'YouTube iframe integration for trailer playback' 
        },
        category: 'detail'
      },
      // Search
      {
        title: { es: 'Búsqueda en Vivo', en: 'Live Search' },
        url: 'assets/videos/moodflix/07_live_search.mp4',
        description: { 
          es: 'Búsqueda dinámica con debounce para performance óptima', 
          en: 'Dynamic search with debounce for optimal performance' 
        },
        category: 'search'
      },
      {
        title: { es: 'Filtro por Género', en: 'Genre Filter' },
        url: 'assets/videos/moodflix/08_genre_filter.mp4',
        description: { 
          es: 'Sidebar con filtrado complejo por géneros y estado global', 
          en: 'Sidebar with complex genre filtering and global state' 
        },
        category: 'search'
      }
    ],
    diagrams: [
      {
        title: { es: 'Arquitectura del Sistema', en: 'System Architecture' },
        url: 'assets/documentos/moodflix/diagrama_moodflix.pdf',
        description: { es: 'Diagrama de arquitectura cliente-servidor', en: 'Client-server architecture diagram' }
      },
      {
        title: { es: 'API Endpoints', en: 'API Endpoints' },
        url: 'assets/documentos/moodflix/peticiones-y-respuestas-endpoints-moodflix.pdf',
        description: { es: 'Documentación de peticiones y respuestas de la API', en: 'API requests and responses documentation' }
      }
    ]
  },

  // === Marketplace - Microservicios ===
  {
    id: 'marketplace',
    title: {
      es: 'Marketplace - deliver.ar',
      en: 'Marketplace - deliver.ar'
    },
    team: 6,
    duration: '4 meses',
    shortDescription: {
      es: 'Rol DevOps: IaC con Terraform, CI/CD automatizado, configuración de entornos y flujo de trabajo Git.',
      en: 'DevOps role: IaC with Terraform, automated CI/CD, environment setup and Git workflow.'
    },
    fullDescription: {
      es: `Como DevOps del módulo Marketplace me encargué de definir el stack tecnológico, configurar los entornos frontend, backend y base de datos, así como sus respectivos repositorios, despliegues y vínculos, asegurando que el equipo de desarrollo pueda desempeñar sus tareas.

**Configuración Inicial de Entornos**
• Frontend: Estructura de carpetas escalable, gestión de fuentes y paletas de colores
• Backend: Arquitectura MVC, servidor con conexión funcional a PostgreSQL
• Modelo de datos diseñado para el caso de negocio del módulo

**Infrastructure as Code (IaC) con Terraform**
La infraestructura está completamente definida como código, permitiendo reproducibilidad, versionado y automatización del despliegue.

**CI/CD y Despliegues**
• Despliegues de producción mediante Render para frontend y backend
• Flujo CI/CD automatizado: cada push a main genera nuevo despliegue
• Credenciales resguardadas en .env (desarrollo) y secretos de Render (producción)

**Flujo de Trabajo Git**
• Ramas principales: main (producción) y DQH (desarrollo)
• Estrategia de subramas por usuario/funcionalidad
• Protección de main mediante restricción a pull requests
• Validación cruzada entre miembros del equipo`,
      en: `As DevOps for the Marketplace module, I was responsible for defining the technology stack, configuring frontend, backend, and database environments, as well as their respective repositories, deployments, and connections, ensuring the development team could perform their tasks.

**Initial Environment Configuration**
• Frontend: Scalable folder structure, font and color palette management
• Backend: MVC architecture, server with functional PostgreSQL connection
• Data model designed for the module's business case

**Infrastructure as Code (IaC) with Terraform**
The infrastructure is fully defined as code, enabling reproducibility, versioning, and deployment automation.

**CI/CD and Deployments**
• Production deployments via Render for frontend and backend
• Automated CI/CD flow: each push to main triggers a new deployment
• Credentials stored in .env (development) and Render secrets (production)

**Git Workflow**
• Main branches: main (production) and DQH (development)
• Sub-branch strategy per user/feature
• Main branch protection via pull request restrictions
• Cross-validation among team members`
    },
    technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Terraform', 'AWS'],
    tags: ['Web', 'API', 'Cloud', 'IaC'],
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2331/2331970.png',
    imageStyle: 'contain',
    featured: false,
    category: 'cloud',
    role: {
      es: 'DevOps Engineer',
      en: 'DevOps Engineer'
    },
    highlights: {
      es: [
        'Infrastructure as Code con Terraform',
        'Pipeline CI/CD automatizado con Render',
        'Configuración de entornos frontend, backend y base de datos',
        'Gestión de secretos y credenciales',
        'Flujo de trabajo Git con ramas protegidas'
      ],
      en: [
        'Infrastructure as Code with Terraform',
        'Automated CI/CD pipeline with Render',
        'Frontend, backend and database environment setup',
        'Secrets and credentials management',
        'Git workflow with protected branches'
      ]
    },
    sections: [
      {
        title: {
          es: 'Infrastructure as Code (IaC)',
          en: 'Infrastructure as Code (IaC)'
        },
        content: {
          es: `La infraestructura del proyecto está completamente definida como código usando Terraform, lo que permite:

• **Reproducibilidad**: Despliegue consistente en cualquier ambiente
• **Versionado**: Control de cambios en la infraestructura
• **Automatización**: CI/CD para provisionar recursos
• **Documentación viva**: El código es la documentación

Recursos gestionados:
- VPC y subnets
- Instancias EC2 / ECS
- RDS PostgreSQL
- Load Balancers
- Security Groups
- IAM Roles y Policies`,
          en: `The project infrastructure is fully defined as code using Terraform, which allows:

• **Reproducibility**: Consistent deployment in any environment
• **Versioning**: Infrastructure change control
• **Automation**: CI/CD to provision resources
• **Living documentation**: Code is documentation

Managed resources:
- VPC and subnets
- EC2 / ECS instances
- RDS PostgreSQL
- Load Balancers
- Security Groups
- IAM Roles and Policies`
        }
      }
    ],
    links: [
      { label: { es: 'Frontend', en: 'Frontend' }, url: 'https://github.com/juani8/marketplace', type: 'github' },
      { label: { es: 'Backend Services', en: 'Backend Services' }, url: 'https://github.com/juani8/marketplace-services', type: 'github' },
      { label: { es: 'Infrastructure as Code', en: 'Infrastructure as Code' }, url: 'https://github.com/juani8/marketplace-infrastructure-as-code', type: 'github' }
    ]
  }
];

// ============================================
// FUNCIONES HELPER
// ============================================

/**
 * Obtiene todos los proyectos
 */
export function getAllProjects(): Project[] {
  return PROJECTS;
}

/**
 * Obtiene proyectos destacados
 */
export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter(p => p.featured);
}

/**
 * Obtiene proyectos por categoría
 */
export function getProjectsByCategory(category: Project['category']): Project[] {
  return PROJECTS.filter(p => p.category === category);
}

/**
 * Obtiene proyectos por tag
 */
export function getProjectsByTag(tag: ProjectTag): Project[] {
  return PROJECTS.filter(p => p.tags.includes(tag));
}

/**
 * Obtiene un proyecto por ID
 */
export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find(p => p.id === id);
}