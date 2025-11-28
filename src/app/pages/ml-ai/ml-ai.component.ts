import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { getProjectsByCategory, getProjectsByTag, Project } from '../../core/data/projects.data';

@Component({
  selector: 'app-ml-ai',
  standalone: true,
  imports: [ProjectCardComponent],
  template: `
    <section class="mlai-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <h1 class="section-title">{{ t.t('mlai.title') }}</h1>
          <p class="section-subtitle">{{ t.t('mlai.subtitle') }}</p>
        </div>

        <!-- Approach Section -->
        <div class="approach-section">
          <div class="approach-content">
            <h2 class="approach-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              {{ t.t('mlai.approach') }}
            </h2>
            <p class="approach-text">{{ t.t('mlai.approachText') }}</p>
          </div>

          <!-- Pipeline Visualization -->
          <div class="pipeline">
            <h3 class="pipeline-title">{{ t.t('mlai.pipeline') }}</h3>
            <div class="pipeline-steps">
              <div class="pipeline-step">
                <div class="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                </div>
                <span class="step-label">{{ t.t('mlai.datasets') }}</span>
              </div>
              <div class="pipeline-arrow">→</div>
              <div class="pipeline-step">
                <div class="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="M4.93 4.93l2.83 2.83"></path>
                    <path d="M16.24 16.24l2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="M4.93 19.07l2.83-2.83"></path>
                    <path d="M16.24 7.76l2.83-2.83"></path>
                  </svg>
                </div>
                <span class="step-label">{{ t.t('mlai.training') }}</span>
              </div>
              <div class="pipeline-arrow">→</div>
              <div class="pipeline-step">
                <div class="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span class="step-label">{{ t.t('mlai.evaluation') }}</span>
              </div>
              <div class="pipeline-arrow">→</div>
              <div class="pipeline-step">
                <div class="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                  </svg>
                </div>
                <span class="step-label">{{ t.t('mlai.deployment') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Technologies Used -->
        <div class="tech-showcase">
          <h3 class="tech-title">{{ t.t('common.technologies') }}</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span>Python</span>
            </div>
            <div class="tech-item">
              <span>TensorFlow</span>
            </div>
            <div class="tech-item">
              <span>PyTorch</span>
            </div>
            <div class="tech-item">
              <span>Pandas</span>
            </div>
            <div class="tech-item">
              <span>Scikit-learn</span>
            </div>
            <div class="tech-item">
              <span>OpenCV</span>
            </div>
            <div class="tech-item">
              <span>YOLO</span>
            </div>
            <div class="tech-item">
              <span>ONNX</span>
            </div>
          </div>
        </div>

        <!-- Featured Project: SensAi -->
        <div class="featured-project">
          <h2 class="projects-title">Proyecto Destacado</h2>
          <div class="featured-card clickable" (click)="goToSensai()">
            @if (sensaiProject) {
              <div class="featured-content">
                <div class="featured-header">
                  <span class="featured-badge">🏆 Featured</span>
                  <h3 class="featured-name">{{ sensaiProject.title[t.lang()] }}</h3>
                </div>
                <p class="featured-description">{{ t.t('mlai.sensaiDescription') }}</p>
                <div class="featured-highlights">
                  <div class="highlight-item">
                    <strong>{{ t.lang() === 'es' ? '3 Modelos YOLOv8' : '3 YOLOv8 Models' }}</strong>
                    <p>{{ t.lang() === 'es' ? 'Detección de peatones, veredas dañadas y colectivos con ~2400 imágenes etiquetadas.' : 'Detection of pedestrians, damaged sidewalks and buses with ~2400 labeled images.' }}</p>
                  </div>
                  <div class="highlight-item">
                    <strong>{{ t.lang() === 'es' ? 'Pipeline ML Completo' : 'Full ML Pipeline' }}</strong>
                    <p>{{ t.lang() === 'es' ? 'Recolección, etiquetado con Label Studio, entrenamiento y optimización a ONNX.' : 'Collection, Label Studio labeling, training and ONNX optimization.' }}</p>
                  </div>
                  <div class="highlight-item">
                    <strong>{{ t.lang() === 'es' ? 'Inferencia On-Device' : 'On-Device Inference' }}</strong>
                    <p>{{ t.lang() === 'es' ? '~50ms por frame con ONNX Runtime. Sin internet, 100% disponibilidad.' : '~50ms per frame with ONNX Runtime. No internet, 100% availability.' }}</p>
                  </div>
                </div>
                <div class="featured-techs">
                  @for (tech of sensaiProject.technologies; track tech) {
                    <span class="tech-badge">{{ tech }}</span>
                  }
                </div>
                <div class="featured-actions">
                  @if (sensaiProject.codeUrl) {
                    <a [href]="sensaiProject.codeUrl" target="_blank" class="btn btn-secondary" (click)="$event.stopPropagation()">
                      Ver código
                    </a>
                  }
                  <button class="btn btn-primary" (click)="$event.stopPropagation(); goToSensai()">
                    {{ t.t('projects.viewDetails') }}
                  </button>
                </div>
                <p class="click-hint">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                  </svg>
                  {{ t.t('mlai.clickHint') }}
                </p>
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .mlai-section {
      padding: 8rem 1.5rem 5rem;
      min-height: 100vh;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    
    .focus-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
      border: 1px solid rgba(168, 85, 247, 0.4);
      border-radius: 9999px;
      color: #c084fc;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
      animation: pulse-badge 2s ease-in-out infinite;
    }
    
    @keyframes pulse-badge {
      0%, 100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); }
      50% { box-shadow: 0 0 0 8px rgba(168, 85, 247, 0); }
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
        background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
        margin: 1rem auto 0;
        border-radius: 2px;
      }
    }

    .section-subtitle {
      color: var(--color-text-secondary);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Approach Section */
    .approach-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-bottom: 4rem;
    }

    .approach-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;

      svg {
        color: #a855f7;
      }
    }

    .approach-text {
      color: var(--color-text-secondary);
      line-height: 1.8;
      font-size: 1rem;
    }

    /* Pipeline */
    .pipeline {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 2rem;
    }

    .pipeline-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .pipeline-steps {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .pipeline-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .step-icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .step-label {
      font-size: 0.8rem;
      color: var(--color-text-secondary);
      font-weight: 600;
    }

    .pipeline-arrow {
      color: var(--color-text-muted);
      font-size: 1.5rem;
    }

    /* Tech Showcase */
    .tech-showcase {
      margin-bottom: 4rem;
    }

    .tech-title {
      font-size: 1.25rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .tech-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }

    .tech-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);

      &:hover {
        border-color: #a855f7;
        transform: translateY(-2px);
      }
    }

    .tech-icon {
      font-size: 1.25rem;
    }

    /* Featured Project */
    .featured-project {
      margin-bottom: 4rem;
    }

    .projects-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .featured-card {
      background: var(--color-bg-secondary);
      border: 2px solid #a855f7;
      border-radius: var(--radius-xl);
      padding: 2rem;
      position: relative;
      overflow: hidden;
      transition: all var(--transition-normal);

      &.clickable {
        cursor: pointer;
        
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.2);
          border-color: #c084fc;
        }
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #a855f7, #ec4899, #06b6d4);
      }
    }

    .click-hint {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
      color: var(--color-text-muted);
      font-size: 0.85rem;
      
      svg {
        opacity: 0.7;
      }
    }

    .featured-header {
      margin-bottom: 1rem;
    }

    .featured-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      color: white;
      margin-bottom: 0.5rem;
    }

    .featured-name {
      font-size: 1.75rem;
      font-weight: 800;
    }

    .featured-description {
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }

    .featured-highlights {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .highlight-item {
      padding: 1rem;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-md);

      strong {
        display: block;
        font-size: 0.9rem;
        color: #a855f7;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 0.85rem;
        color: var(--color-text-muted);
        margin: 0;
      }
    }

    .featured-techs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tech-badge {
      padding: 0.25rem 0.75rem;
      background: var(--color-bg-tertiary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      color: var(--color-text-secondary);
    }

    .featured-actions {
      display: flex;
      gap: 1rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all var(--transition-fast);
      text-decoration: none;
      border: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 40px rgba(168, 85, 247, 0.3);
      }
    }

    .btn-secondary {
      background: transparent;
      color: var(--color-text-primary);
      border: 2px solid var(--color-border);

      &:hover {
        border-color: #a855f7;
        color: #a855f7;
      }
    }

    /* Other Projects */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    /* Mobile Styles */
    @media (max-width: 900px) {
      .approach-section {
        grid-template-columns: 1fr;
      }

      .pipeline-steps {
        flex-direction: column;
      }

      .pipeline-arrow {
        transform: rotate(90deg);
      }
    }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }

      .featured-actions {
        flex-direction: column;
      }
    }
  `]
})
export class MlAiComponent {
  t = inject(TranslationService);
  private router = inject(Router);
  
  mlProjects: Project[] = [
    ...getProjectsByCategory('ml'),
    ...getProjectsByTag('ML').filter(p => p.category !== 'ml')
  ];
  
  sensaiProject = this.mlProjects.find(p => p.id === 'sensai');

  goToSensai(): void {
    this.router.navigate(['/projects', 'sensai']);
  }
}
