import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Inicio | juanisosa'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre mí | juanisosa'
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Proyectos | juanisosa'
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    title: 'Proyecto | juanisosa'
  },
  {
    path: 'ml-ai',
    loadComponent: () => import('./pages/ml-ai/ml-ai.component').then(m => m.MlAiComponent),
    title: 'Machine Learning & IA | juanisosa'
  },
  {
    path: 'security',
    loadComponent: () => import('./pages/security/security.component').then(m => m.SecurityComponent),
    title: 'Seguridad | juanisosa'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contacto | juanisosa'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
