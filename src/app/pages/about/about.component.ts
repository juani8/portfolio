import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { 
  PERSONAL_INFO, 
  EXPERIENCES, 
  EDUCATION, 
  CERTIFICATIONS, 
  SKILLS,
  getSkillsByCategory 
} from '../../core/data/profile.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
    <section class="about-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <h1 class="section-title">{{ t.t('about.title') }}</h1>
          <p class="section-subtitle" [innerHTML]="t.t('about.intro')"></p>
        </div>

        <!-- Main Content Grid -->
        <div class="about-grid">
          <!-- Experience Column -->
          <div class="about-column">
            <h2 class="column-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              {{ t.t('about.experience') }}
            </h2>

            <div class="timeline">
              @for (exp of experiences; track exp.id) {
                <div class="timeline-item">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <h3 class="timeline-title">{{ exp.role[t.lang()] }}</h3>
                      <span class="timeline-date">
                        {{ exp.startDate }} - {{ exp.endDate ?? t.t('about.present') }}
                      </span>
                    </div>
                    <p class="timeline-company">{{ exp.company }}</p>
                    <p class="timeline-description" [innerHTML]="exp.description[t.lang()]"></p>
                    <div class="timeline-techs">
                      @for (tech of exp.technologies; track tech) {
                        <span class="tech-tag">{{ tech }}</span>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Education & Certifications Column -->
          <div class="about-column">
            <!-- Education -->
            <h2 class="column-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              {{ t.t('about.education') }}
            </h2>

            <div class="timeline">
              @for (edu of education; track edu.id) {
                <div class="timeline-item">
                  <div class="timeline-marker" [class.in-progress]="edu.status === 'in-progress'"></div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <h3 class="timeline-title">{{ edu.degree[t.lang()] }}</h3>
                      <span class="timeline-date">
                        {{ edu.startDate }} - {{ edu.endDate ?? t.t('about.inProgress') }}
                      </span>
                    </div>
                    <p class="timeline-company">{{ edu.institution }}</p>
                    <p class="timeline-description" [innerHTML]="edu.description[t.lang()]"></p>
                    @if (edu.status === 'in-progress') {
                      <span class="status-badge in-progress">{{ t.t('about.inProgress') }}</span>
                    }
                    @if (edu.credentialUrl) {
                      <a [href]="edu.credentialUrl" target="_blank" rel="noopener noreferrer" class="cert-link">
                        Ver credencial →
                      </a>
                    }
                  </div>
                </div>
              }
            </div>

            <!-- Certifications -->
            <h2 class="column-title" style="margin-top: 2.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              {{ t.t('about.certifications') }}
            </h2>

            <div class="certifications-list">
              @for (cert of certifications; track cert.id) {
                <div class="certification-card">
                  @if (cert.imageUrl) {
                    <img [src]="cert.imageUrl" [alt]="cert.name" class="cert-image">
                  } @else {
                    <div class="cert-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                      </svg>
                    </div>
                  }
                  <div class="cert-info">
                    <h4 class="cert-name">{{ cert.name }}</h4>
                    <p class="cert-issuer">{{ cert.issuer }} • {{ cert.date }}</p>
                    @if (cert.credentialUrl) {
                      <a [href]="cert.credentialUrl" target="_blank" rel="noopener noreferrer" class="cert-link">
                        Ver credencial →
                      </a>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="skills-section">
          <h2 class="column-title centered">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            {{ t.t('about.skills') }}
          </h2>

          <div class="skills-grid">
            <!-- Languages -->
            <div class="skill-category">
              <h3 class="skill-category-title">Languages</h3>
              <div class="skill-bars">
                @for (skill of languageSkills; track skill.name) {
                  <div class="skill-bar-item">
                    <div class="skill-bar-header">
                      <span class="skill-name">{{ skill.name }}</span>
                      <span class="skill-level">{{ skill.level * 20 }}%</span>
                    </div>
                    <div class="skill-bar">
                      <div class="skill-bar-fill" [style.width.%]="skill.level * 20"></div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Expertise -->
            <div class="skill-category">
              <h3 class="skill-category-title">Expertise</h3>
              <div class="skill-bars">
                @for (skill of frameworkSkills; track skill.name) {
                  <div class="skill-bar-item">
                    <div class="skill-bar-header">
                      <span class="skill-name">{{ skill.name }}</span>
                      <span class="skill-level">{{ skill.level * 20 }}%</span>
                    </div>
                    <div class="skill-bar">
                      <div class="skill-bar-fill" [style.width.%]="skill.level * 20"></div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- DevOps & Infrastructure -->
            <div class="skill-category full-width">
              <h3 class="skill-category-title">DevOps & Infrastructure</h3>
              <div class="skill-tags-grouped">
                <div class="tag-group">
                  <span class="tag-group-label">Tools</span>
                  <div class="skill-tags">
                    @for (skill of toolSkills; track skill.name) {
                      @if (skill.name && skill.name.trim()) {
                        <span class="skill-tag">{{ skill.name }}</span>
                      }
                    }
                  </div>
                </div>
                <div class="tag-group">
                  <span class="tag-group-label">Cloud</span>
                  <div class="skill-tags">
                    @for (skill of cloudSkills; track skill.name) {
                      <span class="skill-tag cloud">{{ skill.name }}</span>
                    }
                  </div>
                </div>
                <div class="tag-group">
                  <span class="tag-group-label">Databases</span>
                  <div class="skill-tags">
                    @for (skill of databaseSkills; track skill.name) {
                      <span class="skill-tag database">{{ skill.name }}</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
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
        background: var(--color-accent-gradient);
        margin: 1rem auto 0;
        border-radius: 2px;
      }
    }

    .section-subtitle {
      max-width: 700px;
      margin: 0 auto;
      color: var(--color-text-secondary);
      font-size: 1.1rem;
      line-height: 1.7;
      
      ::ng-deep strong {
        color: var(--color-accent-primary);
        font-weight: 600;
      }
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      margin-bottom: 4rem;
    }

    .column-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 2rem;

      svg {
        color: var(--color-accent-primary);
      }

      &.centered {
        justify-content: center;
      }
    }

    /* Timeline Styles */
    .timeline {
      position: relative;
      padding-left: 2rem;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--color-border);
      }
    }

    .timeline-item {
      position: relative;
      padding-bottom: 2rem;

      &:last-child {
        padding-bottom: 0;
      }
    }

    .timeline-marker {
      position: absolute;
      left: -2rem;
      top: 0;
      width: 12px;
      height: 12px;
      background: var(--color-accent-primary);
      border-radius: 50%;
      transform: translateX(-5px);
      border: 3px solid var(--color-bg-primary);

      &.in-progress {
        background: var(--color-accent-secondary);
        animation: pulse 2s ease infinite;
      }
    }

    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); }
      50% { box-shadow: 0 0 0 8px rgba(6, 182, 212, 0); }
    }

    .timeline-content {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--color-accent-primary);
        transform: translateX(4px);
      }
    }

    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .timeline-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .timeline-date {
      font-size: 0.85rem;
      color: var(--color-accent-primary);
      font-weight: 600;
    }

    .timeline-company {
      color: var(--color-text-secondary);
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .timeline-description {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .timeline-techs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tech-tag {
      padding: 0.25rem 0.6rem;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      color: var(--color-text-secondary);
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;

      &.in-progress {
        background: rgba(6, 182, 212, 0.15);
        color: var(--color-accent-secondary);
      }
    }

    /* Certifications */
    .certifications-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .certification-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1rem;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--color-accent-primary);
        transform: translateX(4px);
      }
    }

    .cert-image,
    .cert-icon {
      width: 60px;
      height: 60px;
      object-fit: contain;
      border-radius: var(--radius-md);
      flex-shrink: 0;
    }

    .cert-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg-tertiary);
      color: var(--color-accent-primary);
    }

    .cert-name {
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 0.25rem;
    }

    .cert-issuer {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin-bottom: 0.25rem;
    }

    .cert-link {
      font-size: 0.85rem;
      color: var(--color-accent-primary);
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    /* Skills Section */
    .skills-section {
      padding-top: 2rem;
      border-top: 1px solid var(--color-border);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .skill-category {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      
      &.full-width {
        grid-column: 1 / -1;
      }
    }

    .skill-category-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 1rem;
    }

    .skill-bars {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .skill-bar-item {
      width: 100%;
    }

    .skill-bar-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .skill-name {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
    }

    .skill-level {
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }

    .skill-bar {
      height: 6px;
      background: var(--color-bg-tertiary);
      border-radius: 3px;
      overflow: hidden;
    }

    .skill-bar-fill {
      height: 100%;
      background: var(--color-accent-gradient);
      border-radius: 3px;
      transition: width 1s ease;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .skill-tags-grouped {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    
    .tag-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .tag-group-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .skill-tag {
      padding: 0.5rem 0.75rem;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-md);
      font-size: 0.85rem;
      color: var(--color-text-secondary);
      transition: all var(--transition-fast);

      &:hover {
        color: var(--color-accent-primary);
        background: rgba(59, 130, 246, 0.1);
      }

      &.cloud {
        border: 1px solid rgba(6, 182, 212, 0.3);
        color: var(--color-accent-secondary);
      }

      &.database {
        border: 1px solid rgba(168, 85, 247, 0.3);
        color: #a855f7;
      }
    }

    /* Mobile Styles */
    @media (max-width: 900px) {
      .about-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }

      .skills-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .about-section {
        padding: 6rem 1rem 3rem;
      }

      .timeline-header {
        flex-direction: column;
      }

      .certification-card {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class AboutComponent {
  t = inject(TranslationService);
  
  personalInfo = PERSONAL_INFO;
  experiences = EXPERIENCES;
  education = EDUCATION;
  certifications = CERTIFICATIONS;
  
  languageSkills = getSkillsByCategory('language');
  frameworkSkills = getSkillsByCategory('framework');
  toolSkills = getSkillsByCategory('tool');
  cloudSkills = getSkillsByCategory('cloud');
  databaseSkills = getSkillsByCategory('database');
}
