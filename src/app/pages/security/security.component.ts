import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { getProjectsByCategory, getProjectsByTag, Project } from '../../core/data/projects.data';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [ProjectCardComponent],
  template: `
    <section class="security-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <h1 class="section-title">{{ t.t('security.title') }}</h1>
          <p class="section-subtitle" [innerHTML]="t.t('security.subtitle')"></p>
        </div>

        <!-- Interest Section -->
        <div class="interest-section">
          <div class="interest-card">
            <div class="interest-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <p class="interest-text" [innerHTML]="t.t('security.interest')"></p>
          </div>
        </div>

        <!-- Two Column Layout -->
        <div class="content-grid">
          <!-- Best Practices -->
          <div class="practices-section">
            <h2 class="subsection-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              {{ t.t('security.practices') }}
            </h2>
            
            <ul class="practices-list">
              <li class="practice-item">
                <span>{{ t.t('security.practice1') }}</span>
              </li>
              <li class="practice-item">
                <span>{{ t.t('security.practice2') }}</span>
              </li>
              <li class="practice-item">
                <span>{{ t.t('security.practice3') }}</span>
              </li>
              <li class="practice-item">
                <span>{{ t.t('security.practice4') }}</span>
              </li>
              <li class="practice-item">
                <span>{{ t.t('security.practice5') }}</span>
              </li>
            </ul>
          </div>

          <!-- Learning Section -->
          <div class="learning-section">
            <h2 class="subsection-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              {{ t.t('security.learning') }}
            </h2>
            
            <p class="learning-text">{{ t.t('security.learningText') }}</p>
            
            <div class="learning-items">
              <div class="learning-item">
                <div class="learning-content">
                  <h4>Cursos Especializados</h4>
                  <p>Formación continua en seguridad ofensiva y defensiva.</p>
                </div>
              </div>
              <div class="learning-item">
                <div class="learning-content">
                  <h4>Labs & Práctica</h4>
                  <p>Entornos de laboratorio para pruebas controladas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tools & Technologies -->
        <div class="tools-section">
          <h2 class="subsection-title centered">Herramientas y Conocimientos</h2>
          <div class="tools-grid">
            <div class="tool-item">
              <span class="tool-name">Python</span>
              <span class="tool-desc">Scripting & Automation</span>
            </div>
            <div class="tool-item">
              <span class="tool-name">Linux</span>
              <span class="tool-desc">Security Tools</span>
            </div>
            <div class="tool-item">
              <span class="tool-name">OWASP</span>
              <span class="tool-desc">Web Security</span>
            </div>
            <div class="tool-item">
              <span class="tool-name">Nessus</span>
              <span class="tool-desc">Vulnerability Scanning</span>
            </div>
            <div class="tool-item">
              <span class="tool-name">SIEM</span>
              <span class="tool-desc">Security Monitoring</span>
            </div>
            <div class="tool-item">
              <span class="tool-name">PCI DSS</span>
              <span class="tool-desc">Compliance</span>
            </div>
            <div class="tool-item">
              <span class="tool-name">Active Directory</span>
              <span class="tool-desc">Identity Management</span>
            </div>
          </div>
        </div>

        <!-- Security Projects -->
        <div class="projects-section">
          <h2 class="subsection-title">Proyectos de Seguridad</h2>
          
          @if (securityProjects.length > 0) {
            <div class="projects-grid">
              @for (project of securityProjects; track project.id) {
                <app-project-card [project]="project" />
              }
            </div>
          } @else {
            <div class="coming-soon">
              <h3>Próximamente</h3>
              <p>Trabajando en proyectos de seguridad que pronto estarán disponibles.</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .security-section {
      padding: 8rem 1.5rem 5rem;
      min-height: 100vh;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
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
        background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
        margin: 1rem auto 0;
        border-radius: 2px;
      }
    }

    .section-subtitle {
      color: var(--color-text-secondary);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
      
      ::ng-deep .highlight {
        color: var(--color-accent-primary);
        font-weight: 600;
      }
    }

    /* Interest Section */
    .interest-section {
      margin-bottom: 4rem;
    }

    .interest-card {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: 2.5rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(180deg, #ef4444 0%, #f97316 100%);
      }
    }

    .interest-icon {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ef4444;
    }

    .interest-text {
      color: var(--color-text-secondary);
      font-size: 1.05rem;
      line-height: 1.8;
      margin: 0;
      
      ::ng-deep strong {
        color: var(--color-text-primary);
        font-weight: 600;
      }
    }

    /* Content Grid */
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-bottom: 4rem;
    }

    .subsection-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 1.5rem;

      svg {
        color: #ef4444;
      }

      &.centered {
        justify-content: center;
        text-align: center;
      }
    }

    /* Practices */
    .practices-section {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 2rem;
    }

    .practices-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .practice-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--color-border);
      color: var(--color-text-secondary);
      font-size: 0.95rem;

      &:last-child {
        border-bottom: none;
      }
    }

    .practice-icon {
      font-size: 1.25rem;
    }

    /* Learning */
    .learning-section {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 2rem;
    }

    .learning-text {
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }

    .learning-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .learning-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);

      &:hover {
        transform: translateX(4px);
      }
    }

    .learning-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .learning-content {
      h4 {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.25rem;
      }

      p {
        font-size: 0.85rem;
        color: var(--color-text-muted);
        margin: 0;
      }
    }

    /* Tools */
    .tools-section {
      margin-bottom: 4rem;
    }

    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .tool-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1.5rem 1rem;
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      transition: all var(--transition-fast);

      &:hover {
        border-color: #ef4444;
        transform: translateY(-4px);
      }
    }

    .tool-icon {
      font-size: 2rem;
      margin-bottom: 0.75rem;
    }

    .tool-name {
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 0.25rem;
    }

    .tool-desc {
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    /* Projects */
    .projects-section {
      margin-bottom: 2rem;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .coming-soon {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--color-bg-secondary);
      border: 2px dashed var(--color-border);
      border-radius: var(--radius-xl);

      .coming-soon-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--color-text-muted);
        max-width: 400px;
        margin: 0 auto;
      }
    }

    /* Mobile Styles */
    @media (max-width: 900px) {
      .interest-card {
        flex-direction: column;
        text-align: center;
      }

      .content-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }

      .tools-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class SecurityComponent {
  t = inject(TranslationService);
  
  securityProjects: Project[] = [
    ...getProjectsByCategory('security'),
    ...getProjectsByTag('Security').filter(p => p.category !== 'security')
  ];
}
