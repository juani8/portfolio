import { Injectable, signal, computed } from '@angular/core';

export type Language = 'es' | 'en';

export interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Signal para el idioma actual
  private currentLang = signal<Language>('es');
  
  // Computed para exponer el idioma actual
  lang = computed(() => this.currentLang());
  
  // Diccionario de traducciones
  private translations: Translations = {
    // === Navbar ===
    'nav.home': { es: 'Inicio', en: 'Home' },
    'nav.about': { es: 'Sobre mí', en: 'About' },
    'nav.projects': { es: 'Proyectos', en: 'Projects' },
    'nav.mlai': { es: 'ML / IA', en: 'ML / AI' },
    'nav.security': { es: 'Seguridad', en: 'Security' },
    'nav.contact': { es: 'Contacto', en: 'Contact' },
    
    // === Home ===
    'home.greeting': { es: '¡Hola! Soy', en: "Hi! I'm" },
    'home.name': { es: 'Tu Nombre', en: 'Your Name' },
    'home.title': { 
      es: 'Desarrollador de Software con foco en IA, Cloud y Seguridad', 
      en: 'Software Developer focused on AI, Cloud & Security' 
    },
    'home.description': { 
      es: 'Apasionado por crear soluciones tecnológicas innovadoras. Me especializo en desarrollo de aplicaciones, machine learning y seguridad informática, siempre buscando aprender y aplicar las mejores prácticas de la industria.',
      en: 'Passionate about creating innovative technological solutions. I specialize in application development, machine learning, and cybersecurity, always seeking to learn and apply industry best practices.'
    },
    'home.viewProjects': { es: 'Ver proyectos', en: 'View projects' },
    'home.contactMe': { es: 'Contáctame', en: 'Contact me' },
    
    // === About ===
    'about.title': { es: 'Sobre mí', en: 'About me' },
    'about.intro': {
      es: 'Soy un desarrollador de software con experiencia en múltiples tecnologías y un fuerte interés en la inteligencia artificial, el cloud computing y la seguridad informática.',
      en: "I'm a software developer with experience in multiple technologies and a strong interest in artificial intelligence, cloud computing, and cybersecurity."
    },
    'about.experience': { es: 'Experiencia', en: 'Experience' },
    'about.education': { es: 'Educación', en: 'Education' },
    'about.certifications': { es: 'Certificaciones', en: 'Certifications' },
    'about.skills': { es: 'Habilidades', en: 'Skills' },
    'about.present': { es: 'Presente', en: 'Present' },
    'about.inProgress': { es: 'En curso', en: 'In progress' },
    
    // === Projects ===
    'projects.title': { es: 'Proyectos', en: 'Projects' },
    'projects.subtitle': { 
      es: 'Una selección de mis trabajos más destacados',
      en: 'A selection of my most outstanding work'
    },
    'projects.viewCode': { es: 'Ver código', en: 'View code' },
    'projects.viewDemo': { es: 'Ver demo', en: 'View demo' },
    'projects.viewDetails': { es: 'Ver detalles', en: 'View details' },
    'projects.featured': { es: 'Destacado', en: 'Featured' },
    'projects.all': { es: 'Todos', en: 'All' },
    'projects.clickHint': { 
      es: 'Haz clic en un proyecto para ver su detalle completo',
      en: 'Click on a project to see its full details'
    },
    
    // === ML/AI ===
    'mlai.title': { es: 'Machine Learning & IA', en: 'Machine Learning & AI' },
    'mlai.subtitle': {
      es: 'Mi área de mayor foco y desarrollo profesional',
      en: 'My primary area of focus and professional development'
    },
    'mlai.focusBadge': {
      es: '🎯 Área de Especialización',
      en: '🎯 Specialization Area'
    },
    'mlai.sensaiDescription': {
      es: 'SensAi es una aplicación Android que utiliza Machine Learning y Visión por Computadora para asistir a personas con discapacidad visual en el Área Metropolitana de Buenos Aires. El proyecto implementa 3 modelos de detección de objetos personalizados, entrenados con ~2400 imágenes etiquetadas manualmente usando Label Studio. El pipeline de ML abarca el ciclo completo: recolección de datos en campo, etiquetado de bounding boxes, entrenamiento con data augmentation, conversión a ONNX con NMS integrado, y deployment con ONNX Runtime para inferencia on-device (~50ms por frame). Los modelos detectan peatones, veredas dañadas y líneas de colectivos específicas, funcionando 100% offline para garantizar disponibilidad.',
      en: 'SensAi is an Android application that uses Machine Learning and Computer Vision to assist visually impaired people in the Buenos Aires Metropolitan Area. The project implements 3 custom object detection models, trained with ~2400 manually labeled images using Label Studio. The ML pipeline covers the complete cycle: field data collection, bounding box labeling, training with data augmentation, conversion to ONNX with integrated NMS, and deployment with ONNX Runtime for on-device inference (~50ms per frame). The models detect pedestrians, damaged sidewalks, and specific bus lines, working 100% offline to ensure availability.'
    },
    'mlai.clickHint': {
      es: 'Haz clic en la tarjeta para ver el proyecto completo',
      en: 'Click on the card to view the full project'
    },
    'mlai.approach': { es: 'Mi enfoque', en: 'My approach' },
    'mlai.approachText': {
      es: 'Machine Learning e Inteligencia Artificial es el área en la que más foco estoy haciendo y donde más me estoy capacitando actualmente. Me apasiona desarrollar soluciones prácticas de ML, desde la recolección y preparación de datos hasta el entrenamiento y despliegue de modelos en producción. Trabajo principalmente con visión por computadora y detección de objetos, aplicando técnicas de deep learning para resolver problemas del mundo real.',
      en: 'Machine Learning and Artificial Intelligence is the area where I am most focused and where I am currently training the most. I am passionate about developing practical ML solutions, from data collection and preparation to model training and production deployment. I primarily work with computer vision and object detection, applying deep learning techniques to solve real-world problems.'
    },
    'mlai.pipeline': { es: 'Pipeline típico', en: 'Typical pipeline' },
    'mlai.datasets': { es: 'Datasets', en: 'Datasets' },
    'mlai.training': { es: 'Entrenamiento', en: 'Training' },
    'mlai.evaluation': { es: 'Evaluación', en: 'Evaluation' },
    'mlai.deployment': { es: 'Despliegue', en: 'Deployment' },
    
    // === Security ===
    'security.title': { es: 'Seguridad Informática', en: 'Cybersecurity' },
    'security.subtitle': {
      es: 'Protegiendo sistemas y datos',
      en: 'Protecting systems and data'
    },
    'security.interest': {
      es: 'Tengo un fuerte interés en la ciberseguridad y aplico buenas prácticas de seguridad en todos mis proyectos. Estoy constantemente aprendiendo sobre nuevas vulnerabilidades, técnicas de defensa y herramientas de auditoría.',
      en: "I have a strong interest in cybersecurity and apply security best practices in all my projects. I'm constantly learning about new vulnerabilities, defense techniques, and auditing tools."
    },
    'security.practices': { es: 'Buenas prácticas que aplico', en: 'Best practices I apply' },
    'security.practice1': { es: 'Gestión segura de credenciales y secretos', en: 'Secure credential and secrets management' },
    'security.practice2': { es: 'Validación y sanitización de inputs', en: 'Input validation and sanitization' },
    'security.practice3': { es: 'Análisis de dependencias y vulnerabilidades', en: 'Dependency and vulnerability analysis' },
    'security.practice4': { es: 'Implementación de autenticación y autorización', en: 'Authentication and authorization implementation' },
    'security.practice5': { es: 'Cifrado de datos sensibles', en: 'Sensitive data encryption' },
    'security.learning': { es: 'Aprendizaje continuo', en: 'Continuous learning' },
    'security.learningText': {
      es: 'Realizo cursos especializados y sigo las novedades en seguridad para mantenerme actualizado en este campo en constante evolución.',
      en: "I take specialized courses, and follow security news to stay updated in this constantly evolving field."
    },
    
    // === Contact ===
    'contact.title': { es: 'Contacto', en: 'Contact' },
    'contact.subtitle': {
      es: '¿Tienes un proyecto en mente? ¡Hablemos!',
      en: 'Have a project in mind? Let\'s talk!'
    },
    'contact.name': { es: 'Nombre', en: 'Name' },
    'contact.namePlaceholder': { es: 'Tu nombre', en: 'Your name' },
    'contact.email': { es: 'Email', en: 'Email' },
    'contact.emailPlaceholder': { es: 'tu@email.com', en: 'your@email.com' },
    'contact.message': { es: 'Mensaje', en: 'Message' },
    'contact.messagePlaceholder': { es: '¿En qué puedo ayudarte?', en: 'How can I help you?' },
    'contact.send': { es: 'Enviar mensaje', en: 'Send message' },
    'contact.sending': { es: 'Enviando...', en: 'Sending...' },
    'contact.success': { es: '¡Mensaje enviado correctamente!', en: 'Message sent successfully!' },
    'contact.error': { es: 'Error al enviar el mensaje', en: 'Error sending message' },
    'contact.orReachMe': { es: 'O encuéntrame en', en: 'Or find me at' },
    'contact.downloadCV': { es: 'Descargar CV', en: 'Download CV' },
    'contact.availableNow': { es: 'Disponible para incorporación inmediata', en: 'Available for immediate start' },
    'contact.availableText': { 
      es: 'Abierto a oportunidades de tiempo completo en roles relacionados con desarrollo de software, ML/IA o seguridad.',
      en: 'Open to full-time opportunities in roles related to software development, ML/AI, or security.'
    },
    
    // === Footer ===
    'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
    'footer.madeWith': { es: 'Hecho con mucha dedicación', en: 'Made with a lot of dedication' },
    'footer.and': { es: 'y', en: 'and' },
    
    // === Common ===
    'common.loading': { es: 'Cargando...', en: 'Loading...' },
    'common.technologies': { es: 'Tecnologías', en: 'Technologies' },
    'common.readMore': { es: 'Leer más', en: 'Read more' },
    'common.viewAll': { es: 'Ver todo', en: 'View all' },
    
    // === Project Detail ===
    'backToProjects': { es: 'Volver a proyectos', en: 'Back to projects' },
    'technologies': { es: 'Tecnologías', en: 'Technologies' },
    'description': { es: 'Descripción', en: 'Description' },
    'highlights': { es: 'Aspectos destacados', en: 'Highlights' },
    'diagrams': { es: 'Diagramas', en: 'Diagrams' },
    'demoVideos': { es: 'Videos de Demostración', en: 'Demo Videos' },
    'demoVideosSubtitle': { es: 'Explora las funcionalidades de la aplicación en acción', en: 'Explore the app features in action' },
    'autoplayHint': { es: 'Pasa el cursor sobre los videos para reproducir', en: 'Hover the videos to play' },
    'interfaceGallery': { es: 'Galería de Interfaz', en: 'Interface Gallery' },
    'videos': { es: 'videos', en: 'videos' },
    'filterAll': { es: 'Todos', en: 'All' },
    'filterAuth': { es: 'Autenticación', en: 'Authentication' },
    'filterSocial': { es: 'Social', en: 'Social' },
    'filterProfile': { es: 'Perfil', en: 'Profile' },
    'filterSettings': { es: 'Configuración', en: 'Settings' },
    'noVideosInCategory': { es: 'No hay videos en esta categoría', en: 'No videos in this category' },
    'videoDemo': { es: 'Video Demo', en: 'Video Demo' },
    'viewCode': { es: 'Ver código', en: 'View code' },
    'liveDemo': { es: 'Demo en vivo', en: 'Live demo' },
    'viewDiagram': { es: 'Ver diagrama', en: 'View diagram' },
    'teamMembers': { es: 'personas', en: 'people' },
    'projectNotFound': { es: 'Proyecto no encontrado', en: 'Project not found' },
    'projectNotFoundDesc': { es: 'El proyecto que buscas no existe o fue eliminado.', en: 'The project you are looking for does not exist or was removed.' },
  };

  constructor() {
    // Recuperar idioma guardado o usar el del navegador
    const savedLang = localStorage.getItem('portfolio-lang') as Language;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      this.currentLang.set(savedLang);
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language.split('-')[0];
      this.currentLang.set(browserLang === 'es' ? 'es' : 'en');
    }
  }

  /**
   * Obtiene la traducción de una clave
   */
  t(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translation[this.currentLang()];
  }

  /**
   * Cambia el idioma actual
   */
  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    localStorage.setItem('portfolio-lang', lang);
    // Actualizar el atributo lang del HTML
    document.documentElement.lang = lang;
  }

  /**
   * Alterna entre idiomas
   */
  toggleLanguage(): void {
    const newLang = this.currentLang() === 'es' ? 'en' : 'es';
    this.setLanguage(newLang);
  }

  /**
   * Obtiene el idioma actual
   */
  getCurrentLanguage(): Language {
    return this.currentLang();
  }
}
