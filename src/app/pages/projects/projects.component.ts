import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { 
  getAllProjects, 
  getFeaturedProjects, 
  Project, 
  ProjectTag 
} from '../../core/data/projects.data';

type FilterType = 'all' | 'featured' | ProjectTag;

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  template: `
    <section class="projects-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <h1 class="section-title">{{ t.t('projects.title') }}</h1>
          <p class="section-subtitle">{{ t.t('projects.subtitle') }}</p>
        </div>

        <!-- Filter Buttons -->
        <div class="filter-container">
          <button 
            class="filter-btn" 
            [class.active]="activeFilter() === 'all'"
            (click)="setFilter('all')">
            {{ t.t('projects.all') }}
          </button>
          <button 
            class="filter-btn" 
            [class.active]="activeFilter() === 'featured'"
            (click)="setFilter('featured')">
            {{ t.t('projects.featured') }}
          </button>
          @for (tag of availableTags; track tag) {
            <button 
              class="filter-btn" 
              [class.active]="activeFilter() === tag"
              [class]="'tag-' + tag.toLowerCase()"
              (click)="setFilter(tag)">
              {{ tag }}
            </button>
          }
        </div>
        
        <!-- Click Hint -->
        <p class="click-hint">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          {{ t.t('projects.clickHint') }}
        </p>

        <!-- Projects Grid -->
        <div class="projects-grid">
          @for (project of filteredProjects(); track project.id) {
            <app-project-card [project]="project" class="project-item animate-fade-in-up" />
          }
        </div>

        <!-- Empty State -->
        @if (filteredProjects().length === 0) {
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              <line x1="12" y1="11" x2="12" y2="17"></line>
              <line x1="9" y1="14" x2="15" y2="14"></line>
            </svg>
            <p>No hay proyectos en esta categoría aún.</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 8rem 1.5rem 5rem;
      min-height: 100vh;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      position: relative;
      display: inline-block;

      &::after {
        content: '';
        display: block;
        width: 60px;
        height: 4px;
        background: var(--color-accent-gradient);
        margin: 1rem auto 0;
        border-radius: 2px;
      }
    }

    .section-subtitle {
      color: var(--color-text-secondary);
      font-size: 1.1rem;
    }

    .filter-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    
    .click-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: var(--color-text-muted);
      font-size: 0.875rem;
      margin-bottom: 2rem;
      
      svg {
        opacity: 0.7;
      }
    }

    .filter-btn {
      padding: 0.5rem 1.25rem;
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: 9999px;
      color: var(--color-text-secondary);
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--color-accent-primary);
        color: var(--color-accent-primary);
      }

      &.active {
        background: var(--color-accent-primary);
        border-color: var(--color-accent-primary);
        color: white;
      }

      &.tag-mobile.active { background: #22c55e; border-color: #22c55e; }
      &.tag-ml.active { background: #a855f7; border-color: #a855f7; }
      &.tag-security.active { background: #ef4444; border-color: #ef4444; }
      &.tag-cloud.active { background: #06b6d4; border-color: #06b6d4; }
      &.tag-web.active { background: #f97316; border-color: #f97316; }
      &.tag-desktop.active { background: #ec4899; border-color: #ec4899; }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .project-item {
      animation-duration: 0.5s;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--color-text-muted);

      svg {
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.1rem;
      }
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }

      .filter-container {
        gap: 0.5rem;
      }

      .filter-btn {
        padding: 0.4rem 1rem;
        font-size: 0.8rem;
      }
    }
  `]
})
export class ProjectsComponent {
  t = inject(TranslationService);
  
  allProjects = getAllProjects();
  featuredProjects = getFeaturedProjects();
  
  activeFilter = signal<FilterType>('all');
  
  availableTags: ProjectTag[] = ['Mobile', 'Web', 'Desktop', 'ML', 'Security', 'Cloud'];

  filteredProjects = signal<Project[]>(this.allProjects);

  setFilter(filter: FilterType): void {
    this.activeFilter.set(filter);
    
    if (filter === 'all') {
      this.filteredProjects.set(this.allProjects);
    } else if (filter === 'featured') {
      this.filteredProjects.set(this.featuredProjects);
    } else {
      this.filteredProjects.set(
        this.allProjects.filter(p => p.tags.includes(filter as ProjectTag))
      );
    }
  }
}
