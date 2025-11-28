# Portfolio - Angular Static Site

## 🚀 Comandos principales

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm start
# o
ng serve

# Build de producción
npm run build
# o
ng build --configuration=production
```

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── data/
│   │   │   ├── profile.data.ts    # 👤 Datos personales, experiencia, educación
│   │   │   └── projects.data.ts    # 📂 Datos de proyectos
│   │   └── services/
│   │       └── translation.service.ts  # 🌐 Servicio de traducciones ES/EN
│   ├── pages/
│   │   ├── home/           # Página de inicio
│   │   ├── about/          # Sobre mí / Experiencia
│   │   ├── projects/       # Listado de proyectos
│   │   ├── ml-ai/          # Sección Machine Learning
│   │   ├── security/       # Sección Seguridad
│   │   └── contact/        # Formulario de contacto
│   ├── shared/
│   │   └── components/
│   │       ├── navbar/     # Barra de navegación
│   │       ├── footer/     # Pie de página
│   │       └── project-card/  # Tarjeta de proyecto reutilizable
│   ├── app.routes.ts       # Configuración de rutas
│   └── app.ts              # Componente raíz
├── assets/
│   └── images/
│       ├── projects/       # 🖼️ Imágenes de proyectos
│       └── certs/          # 🎓 Imágenes de certificaciones
├── styles.scss             # Estilos globales y variables CSS
└── index.html              # HTML principal
```

## ✏️ Archivos a modificar para personalizar

### 1. **Datos personales** (`src/app/core/data/profile.data.ts`)
- `PERSONAL_INFO`: Nombre, título, email, redes sociales
- `EXPERIENCES`: Experiencia laboral
- `EDUCATION`: Educación
- `CERTIFICATIONS`: Certificaciones
- `SKILLS`: Habilidades técnicas

### 2. **Proyectos** (`src/app/core/data/projects.data.ts`)
- Array `PROJECTS`: Agrega, edita o elimina proyectos
- Cada proyecto tiene: título, descripción, tecnologías, tags, URLs

### 3. **Traducciones** (`src/app/core/services/translation.service.ts`)
- Diccionario `translations`: Textos en español e inglés

### 4. **Imágenes**
- `src/assets/images/avatar.png`: Tu foto de perfil
- `src/assets/images/projects/`: Screenshots de proyectos
- `src/assets/images/certs/`: Logos de certificaciones

### 5. **Metadatos** (`src/index.html`)
- Título, descripción, keywords para SEO

## 🎨 Personalización de estilos

Los colores y variables principales están en `src/styles.scss`:

```scss
:root {
  --color-bg-primary: #0f172a;        // Fondo principal
  --color-bg-secondary: #1e293b;      // Fondo secundario
  --color-accent-primary: #3b82f6;    // Color de acento (azul)
  --color-accent-secondary: #06b6d4;  // Color secundario (cyan)
  --color-text-primary: #f1f5f9;      // Texto principal
  --color-text-secondary: #94a3b8;    // Texto secundario
}
```

## 🌐 Despliegue en Render (Static Site)

1. Sube tu código a un repositorio de GitHub

2. En Render:
   - Crea un nuevo "Static Site"
   - Conecta tu repositorio
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist/portfolio/browser`

3. Variables de entorno (opcional):
   - `NODE_VERSION`: `20` (o la versión que uses)

### Configuración de redirects para SPA

Crear archivo `public/_redirects`:
```
/*    /index.html   200
```

O crear `render.yaml` en la raíz:
```yaml
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

## 📧 Configurar formulario de contacto

El formulario actual es solo frontend. Para hacerlo funcional:

### Opción 1: Formspree (recomendado)
1. Registrate en [formspree.io](https://formspree.io)
2. Crea un formulario y obtén tu endpoint
3. Modifica `contact.component.ts`:

```typescript
async onSubmit(): Promise<void> {
  const response = await fetch('https://formspree.io/f/TU_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(this.form)
  });
  // ... manejar respuesta
}
```

### Opción 2: EmailJS
1. Registrate en [emailjs.com](https://www.emailjs.com)
2. Instala: `npm install @emailjs/browser`
3. Configura con tus credenciales

## 🔧 Comandos útiles

```bash
# Generar nuevo componente
ng generate component pages/nombre-componente

# Generar servicio
ng generate service core/services/nombre

# Verificar errores de lint
ng lint

# Build con análisis de bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/portfolio/browser/stats.json
```

## 📱 Responsive

El sitio está optimizado para:
- **Desktop**: > 900px
- **Tablet**: 768px - 900px
- **Mobile**: < 768px

## 🌐 Internacionalización

El idioma se guarda en `localStorage` y se detecta automáticamente del navegador. 
Usar el botón del navbar para cambiar entre ES/EN.

---

**Hecho con ❤️ usando Angular y Tailwind CSS**
