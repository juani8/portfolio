/**
 * Datos personales y de experiencia para el portfolio
 * Modifica este archivo para actualizar tu información personal.
 */

export interface PersonalInfo {
  name: string;
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  avatar: string;
  email: string;
  location: {
    es: string;
    en: string;
  };
  social: {
    linkedin: string;
    github: string;
    twitter?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  startDate: string;
  endDate: string | null; // null = presente
  technologies: string[];
  type: 'work' | 'freelance';
}

export interface Education {
  id: string;
  institution: string;
  degree: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  startDate: string;
  endDate: string | null; // null = en curso
  status: 'completed' | 'in-progress';
  credentialUrl?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'cloud' | 'database' | 'other';
  level: number; // 1-5
}

// ============================================
// INFORMACIÓN PERSONAL
// ============================================

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Juan Ignacio Sosa',
  title: {
    es: 'Desarrollador de Software',
    en: 'Software Developer'
  },
  description: {
    es: 'Estudiante de Ingeniería en Informática con experiencia en programación, análisis de datos, cloud computing y ciberseguridad. Reconocido por mi capacidad de aprendizaje rápido, adaptabilidad y trabajo en equipo. Busco contribuir a proyectos de desarrollo de software, seguridad informática y datos aplicando conocimientos técnicos en Python, SQL, AWS y Machine Learning.',
    en: 'Computer Engineering student with experience in programming, data analysis, cloud computing, and cybersecurity. Recognized for fast learning ability, adaptability, and teamwork. Seeking to contribute to software development, information security, and data projects by applying technical knowledge in Python, SQL, AWS, and Machine Learning.'
  },
  avatar: 'assets/images/avatar.webp',
  email: 'juanisosa442@gmail.com',
  location: {
    es: 'Buenos Aires, Argentina',
    en: 'Buenos Aires, Argentina'
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/juan-ignacio-sosa-48213422a/', // Actualizar con tu perfil real
    github: 'https://github.com/juani8', // Actualizar con tu usuario real
    twitter: ''
  }
};

// ============================================
// EXPERIENCIA LABORAL
// ============================================

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    company: 'Red Link',
    role: {
      es: 'Delivery Manager Jr.',
      en: 'Delivery Manager Jr.'
    },
    description: {
      es: 'Coordinación y seguimiento de <strong>proyectos tecnológicos</strong> para el sector financiero. Gestión de equipos de desarrollo, control de cronogramas y aseguramiento de entregas de calidad. Comunicación con <strong>stakeholders</strong> y resolución de impedimentos para garantizar el cumplimiento de objetivos.',
      en: 'Coordination and tracking of <strong>technology projects</strong> for the financial sector. Management of development teams, schedule control, and quality delivery assurance. <strong>Stakeholder</strong> communication and impediment resolution to ensure objective fulfillment.'
    },
    startDate: '2024-11',
    endDate: null,
    technologies: ['SQL', 'Python', 'Firebase', 'Power BI', 'Project Management'],
    type: 'work'
  },
  {
    id: 'exp-2',
    company: 'Red Link',
    role: {
      es: 'Pasante de Seguridad Informática',
      en: 'Information Security Intern'
    },
    description: {
      es: 'Enfocado en tareas de <strong>cumplimiento y gobierno</strong>, colaborando en auditorías internas y externas, procesos de certificación como <strong>PCI-DSS</strong>, y la definición de controles, matrices de roles y políticas basadas en Active Directory. Adquirí una visión sólida de controles y estándares, interactuando con equipos técnicos para evaluación de evidencias, <strong>hardening</strong> y vulnerabilidades.',
      en: 'Focused on <strong>compliance and governance</strong> tasks, collaborating on internal and external audits, certification processes such as <strong>PCI-DSS</strong>, and the definition of controls, role matrices, and policies based on Active Directory. Built a solid understanding of security controls and industry standards, engaging with technical teams on evidence evaluation, <strong>hardening</strong> activities, and vulnerability assessments.'
    },
    startDate: '2023-05',
    endDate: '2024-11',
    technologies: ['Faraday', 'PCI-DSS', 'OWASP', 'Risk Analysis'],
    type: 'work'
  },
  {
    id: 'exp-3',
    company: 'Efectivo Sí',
    role: {
      es: 'Pasante de Business Intelligence',
      en: 'Business Intelligence Intern'
    },
    description: {
      es: 'Diseño y ejecución de <strong>procesos ETL</strong>, participando en la integración, depuración y modelado de datos para soluciones analíticas. Complementé con <strong>análisis exploratorio</strong> y visualización de datos en Python, desarrollando reportes estratégicos y pipelines reproducibles. Consolidé mi interés en <strong>Data Engineering</strong> y Machine Learning.',
      en: 'Design and execution of <strong>ETL processes</strong>, contributing to data integration, cleansing, and modeling for analytical solutions. Complemented with <strong>exploratory analysis</strong> and data visualization in Python, developing strategic reports and reproducible pipelines. Strengthened my interest in <strong>Data Engineering</strong> and Machine Learning.'
    },
    startDate: '2022-07',
    endDate: '2023-05',
    technologies: ['Python', 'SQL', 'Power BI', 'ETL'],
    type: 'work'
  }
];

// ============================================
// EDUCACIÓN
// ============================================

export const EDUCATION: Education[] = [
  {
    id: 'edu-1',
    institution: 'UADE - Universidad Argentina de la Empresa',
    degree: {
      es: 'Ingeniería en Informática',
      en: 'Computer Engineering'
    },
    description: {
      es: 'Carrera de grado enfocada en <strong>desarrollo de software</strong>, sistemas de información, <strong>inteligencia artificial</strong> y arquitectura de computadoras. 45 materias completadas.',
      en: 'Undergraduate degree focused on <strong>software development</strong>, information systems, <strong>artificial intelligence</strong>, and computer architecture. 45 courses completed.'
    },
    startDate: '2020',
    endDate: null,
    status: 'in-progress'
  },
  {
    id: 'edu-2',
    institution: 'UADE - Universidad Argentina de la Empresa',
    degree: {
      es: 'Analista en Sistemas',
      en: 'Systems Analyst'
    },
    description: {
      es: 'Título intermedio con formación en <strong>análisis, diseño y desarrollo</strong> de sistemas informáticos.',
      en: 'Intermediate degree with training in <strong>analysis, design, and development</strong> of computer systems.'
    },
    startDate: '2020',
    endDate: '2023',
    status: 'completed',
    credentialUrl: 'https://www.linkedin.com/in/juan-ignacio-sosa-48213422a/overlay/1726453402041/single-media-viewer/?type=DOCUMENT&profileId=ACoAADlT_KIBcE2s6i00dbdrT3Xh2zVrkOf2CjU'
  }
];

// ============================================
// CERTIFICACIONES
// ============================================

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    name: 'AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services',
    date: '2024',
    credentialUrl: 'https://www.credly.com/badges/22f1e171-e990-42e2-8743-1437e68c3a26/linked_in_profile'
  }
];

// ============================================
// HABILIDADES
// ============================================

export const SKILLS: Skill[] = [
  // Tools
  { name: 'Python', category: 'language', level: 4 },
  { name: 'SQL', category: 'language', level: 4 },
  { name: 'Java', category: 'language', level: 3 },
  { name: 'JavaScript / TypeScript', category: 'language', level: 3.5 },
  { name: 'Kotlin', category: 'language', level: 3 },
  
  // Expertise
  { name: 'Machine Learning', category: 'framework', level: 4.25 },
  { name: 'Virtualization', category: 'framework', level: 3 },
  { name: 'ETL', category: 'framework', level: 3.5 },
  { name: 'Cloud Computing', category: 'framework', level: 3.75 },
  { name: 'Information Security', category: 'framework', level: 4.25 },
  { name: 'Front-End (React, React Native, Angular)', category: 'framework', level: 4 },
  { name: 'Back-End (Node.js, Spring Boot)', category: 'framework', level: 4 },
  
  // Tools
  { name: 'Git', category: 'tool', level: 5 },
  { name: 'Docker', category: 'tool', level: 4 },
  { name: 'Linux', category: 'tool', level: 4 },
  { name: 'Label Studio', category: 'tool', level: 4 },
  { name: 'Jira', category: 'tool', level: 5 },
  { name: 'Power BI', category: 'tool', level: 4 },
  { name: 'Terraform', category: 'tool', level: 3 },
  { name: 'Pentaho (ETL)', category: 'tool', level: 4 },
  
  // Cloud
  { name: 'AWS', category: 'cloud', level: 4 },
  { name: 'Firebase', category: 'cloud', level: 3 },
  
  // Databases
  { name: 'PostgreSQL', category: 'database', level: 4 },
  { name: 'MySQL', category: 'database', level: 4 },
  { name: 'MongoDB', category: 'database', level: 3 },
  
  // Security Tools & Knowledge
  { name: 'Nessus', category: 'other', level: 4 },
  { name: 'OWASP', category: 'other', level: 4 },
  { name: 'SIEM', category: 'other', level: 3 },
  { name: 'ISO 27001', category: 'other', level: 3 },
  { name: 'PCI DSS', category: 'other', level: 3 },
  { name: 'Active Directory', category: 'other', level: 3 },
];

// ============================================
// FUNCIONES HELPER
// ============================================

export function getSkillsByCategory(category: Skill['category']): Skill[] {
  return SKILLS
    .filter(s => s.category === category && s.name && s.name.trim() !== '')
    .sort((a, b) => b.level - a.level);
}

export function getTopSkills(limit: number = 8): Skill[] {
  return [...SKILLS]
    .filter(s => s.name && s.name.trim() !== '')
    .sort((a, b) => b.level - a.level)
    .slice(0, limit);
}
