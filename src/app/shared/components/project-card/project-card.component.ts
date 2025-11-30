import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { Project, ProjectTag } from '../../../core/data/projects.data';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="project-card" [routerLink]="['/projects', project.id]">
      <!-- Image/Video Section -->
      <div class="project-media">
        @if (project.imageUrl) {
          <img [src]="project.imageUrl" [alt]="project.title[t.lang()]" class="project-image" [class.contain]="project.imageStyle === 'contain'" [class.contain-large]="project.id === 'sensai'" loading="lazy">
        } @else {
          <div class="project-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        }
        
        <!-- Tags overlay -->
        <div class="project-tags">
          @if (project.featured) {
            <span class="tag tag-featured">⭐ {{ t.t('projects.featured') }}</span>
          }
          @for (tag of project.tags; track tag) {
            <span class="tag" [class]="getTagClass(tag)">{{ tag }}</span>
          }
        </div>
        
        <!-- View Details Overlay -->
        <div class="project-overlay">
          <span class="view-details">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            {{ t.t('projects.viewDetails') }}
          </span>
        </div>
      </div>

      <!-- Content Section -->
      <div class="project-content">
        <h3 class="project-title">{{ project.title[t.lang()] }}</h3>
        <p class="project-description">{{ project.shortDescription[t.lang()] }}</p>

        <!-- Technologies -->
        <div class="project-techs">
          @for (tech of project.technologies.slice(0, 5); track tech) {
            <span class="tech-badge">{{ tech }}</span>
          }
          @if (project.technologies.length > 5) {
            <span class="tech-badge tech-more">+{{ project.technologies.length - 5 }}</span>
          }
        </div>

        <!-- Actions -->
        <div class="project-actions" (click)="$event.stopPropagation()">
          @if (project.codeUrl) {
            <a [href]="project.codeUrl" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              {{ t.t('projects.viewCode') }}
            </a>
          } @else if (getFirstGithubLink()) {
            <a [href]="getFirstGithubLink()" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              {{ t.t('projects.viewCode') }}
            </a>
          }
          @if (project.demoVideos && project.demoVideos.length > 0) {
            <button (click)="navigateToDemo()" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              {{ t.t('projects.viewDemo') }}
            </button>
          } @else if (project.demoUrl || project.videoUrl) {
            <a [href]="project.demoUrl || project.videoUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              {{ t.t('projects.viewDemo') }}
            </a>
          }
        </div>
      </div>
    </article>
  `,
  styles: [`
    .project-card {
      background: var(--color-bg-secondary);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      overflow: hidden;
      transition: all var(--transition-normal);
      height: 100%;
      display: flex;
      flex-direction: column;
      cursor: pointer;

      &:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-xl);
        border-color: var(--color-accent-primary);

        .project-image {
          transform: scale(1.05);
        }
        
        .project-overlay {
          opacity: 1;
        }
      }
    }

    .project-media {
      position: relative;
      height: 200px;
      overflow: hidden;
      background: var(--color-bg-tertiary);
    }

    .project-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-slow);
      
      &.contain {
        object-fit: contain;
        padding: 3.5rem;
        background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));
      }
      
      &.contain-large {
        padding: 2rem;
      }
    }

    .project-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-muted);
    }
    
    .project-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity var(--transition-normal);
    }
    
    .view-details {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .project-tags {
      position: absolute;
      top: 1rem;
      left: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tag {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: rgba(59, 130, 246, 0.9);
      color: white;
      backdrop-filter: blur(4px);

      &.tag-featured { 
        background: linear-gradient(135deg, #f59e0b, #ef4444);
        animation: pulse-featured 2s ease-in-out infinite;
      }
      &.tag-mobile { background: rgba(34, 197, 94, 0.9); }
      &.tag-ml { background: rgba(168, 85, 247, 0.9); }
      &.tag-security { background: rgba(239, 68, 68, 0.9); }
      &.tag-cloud { background: rgba(6, 182, 212, 0.9); }
      &.tag-web { background: rgba(249, 115, 22, 0.9); }
      &.tag-desktop { background: rgba(236, 72, 153, 0.9); }
      &.tag-api { background: rgba(251, 191, 36, 0.9); color: #1f2937; }
      &.tag-data { background: rgba(99, 102, 241, 0.9); }
    }
    
    @keyframes pulse-featured {
      0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.5); }
      50% { box-shadow: 0 0 0 4px rgba(245, 158, 11, 0); }
    }

    .project-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .project-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 0.75rem;
    }

    .project-description {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 1rem;
      flex: 1;
    }

    .project-techs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tech-badge {
      padding: 0.25rem 0.6rem;
      background: var(--color-bg-tertiary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      color: var(--color-text-secondary);
      font-weight: 500;

      &.tech-more {
        background: var(--color-accent-primary);
        border-color: var(--color-accent-primary);
        color: white;
      }
    }

    .project-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: auto;
    }

    .btn {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all var(--transition-fast);
      text-decoration: none;
      border: none;
    }

    .btn-primary {
      background: var(--color-accent-gradient);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
      }
    }

    .btn-secondary {
      background: transparent;
      color: var(--color-text-primary);
      border: 2px solid var(--color-border);

      &:hover {
        border-color: var(--color-accent-primary);
        color: var(--color-accent-primary);
      }
    }

    @media (max-width: 480px) {
      .project-actions {
        flex-direction: column;
      }
    }
  `]
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  
  t = inject(TranslationService);
  private router = inject(Router);

  navigateToDemo(): void {
    this.router.navigate(['/projects', this.project.id], { fragment: 'demo-videos' });
  }

  getTagClass(tag: ProjectTag): string {
    const classMap: Record<ProjectTag, string> = {
      'Mobile': 'tag-mobile',
      'Web': 'tag-web',
      'Desktop': 'tag-desktop',
      'ML': 'tag-ml',
      'Security': 'tag-security',
      'Cloud': 'tag-cloud',
      'API': 'tag-api',
      'Data': 'tag-data',
      'IaC': 'tag-cloud'
    };
    return classMap[tag] || '';
  }

  getFirstGithubLink(): string | null {
    if (!this.project.links) return null;
    const githubLink = this.project.links.find(link => link.type === 'github');
    return githubLink ? githubLink.url : null;
  }
}
