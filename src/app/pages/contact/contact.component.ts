import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { PERSONAL_INFO } from '../../core/data/profile.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  template: `
    <section class="contact-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <h1 class="section-title">{{ t.t('contact.title') }}</h1>
          <p class="section-subtitle">{{ t.t('contact.subtitle') }}</p>
        </div>

        <div class="contact-content">
          <!-- Contact Info -->
          <div class="contact-info">
            <div class="info-card">
              <h3 class="info-title">{{ t.t('contact.orReachMe') }}</h3>
              
              <div class="info-items">
                <!-- Email -->
                <a [href]="'mailto:' + personalInfo.email" class="info-item">
                  <div class="info-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div class="info-content">
                    <span class="info-label">Email</span>
                    <span class="info-value">{{ personalInfo.email }}</span>
                  </div>
                </a>

                <!-- LinkedIn -->
                <a [href]="personalInfo.social.linkedin" target="_blank" rel="noopener noreferrer" class="info-item">
                  <div class="info-icon linkedin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div class="info-content">
                    <span class="info-label">LinkedIn</span>
                    <span class="info-value">Ver perfil →</span>
                  </div>
                </a>

                <!-- GitHub -->
                <a [href]="personalInfo.social.github" target="_blank" rel="noopener noreferrer" class="info-item">
                  <div class="info-icon github">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div class="info-content">
                    <span class="info-label">GitHub</span>
                    <span class="info-value">Ver proyectos →</span>
                  </div>
                </a>
              </div>

              <!-- Location -->
              <div class="location">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ personalInfo.location[t.lang()] }}</span>
              </div>
            </div>

            <!-- Availability Card -->
            <div class="availability-card">
              <div class="availability-status">
                <span class="status-dot"></span>
                <span>{{ t.t('contact.availableNow') }}</span>
              </div>
              <p class="availability-text">
                {{ t.t('contact.availableText') }}
              </p>
            </div>
            
            <!-- CV Download Card -->
            <div class="cv-card">
              <h3 class="cv-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                {{ t.t('contact.downloadCV') }}
              </h3>
              <div class="cv-options">
                <!-- Spanish CV -->
                <div class="cv-language">
                  <span class="cv-lang-label">🇪🇸 Español</span>
                  <div class="cv-buttons">
                    <a href="assets/documentos/cv/CV_Juan_Ignacio_Sosa_ES.pdf" download class="cv-btn cv-pdf">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      PDF
                    </a>
                    <a href="assets/documentos/cv/CV_Juan_Ignacio_Sosa_ES.docx" download class="cv-btn cv-docx">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      DOCX
                    </a>
                  </div>
                </div>
                <!-- English CV -->
                <div class="cv-language">
                  <span class="cv-lang-label">🇬🇧 English</span>
                  <div class="cv-buttons">
                    <a href="assets/documentos/cv/CV_Juan_Ignacio_Sosa_EN.pdf" download class="cv-btn cv-pdf">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      PDF
                    </a>
                    <a href="assets/documentos/cv/CV_Juan_Ignacio_Sosa_EN.docx" download class="cv-btn cv-docx">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      DOCX
                    </a>
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
    .contact-section {
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
      color: var(--color-text-secondary);
      font-size: 1.1rem;
    }

    .contact-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      max-width: 500px;
      margin: 0 auto;
    }

    /* Contact Info */
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
    }

    .info-card {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: 2rem;
    }

    .info-title {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: var(--color-text-primary);
    }

    .info-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-md);
      text-decoration: none;
      transition: all var(--transition-fast);

      &:hover {
        transform: translateX(4px);
        background: rgba(59, 130, 246, 0.1);
      }
    }

    .info-icon {
      width: 48px;
      height: 48px;
      background: rgba(59, 130, 246, 0.15);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-accent-primary);
      flex-shrink: 0;

      &.linkedin {
        background: rgba(0, 119, 181, 0.15);
        color: #0077b5;
      }

      &.github {
        background: rgba(255, 255, 255, 0.1);
        color: var(--color-text-primary);
      }
    }

    .info-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .info-label {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .info-value {
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .location {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-text-muted);
      font-size: 0.9rem;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
    }

    /* Availability Card */
    .availability-card {
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
      border: 1px solid rgba(34, 197, 94, 0.3);
      border-radius: var(--radius-xl);
      padding: 1.5rem;
    }

    .availability-status {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 700;
      color: #22c55e;
      margin-bottom: 0.75rem;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      background: #22c55e;
      border-radius: 50%;
      animation: pulse 2s ease infinite;
    }

    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
      50% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
    }

    .availability-text {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.6;
    }

    /* CV Card */
    .cv-card {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: 1.5rem;
    }

    .cv-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
      color: var(--color-text-primary);
    }

    .cv-title svg {
      color: var(--color-accent-primary);
    }

    .cv-options {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cv-language {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-md);
    }

    .cv-lang-label {
      font-weight: 600;
      color: var(--color-text-primary);
      font-size: 0.95rem;
    }

    .cv-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .cv-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.875rem;
      border-radius: var(--radius-md);
      font-size: 0.8rem;
      font-weight: 600;
      text-decoration: none;
      transition: all var(--transition-fast);
    }

    .cv-pdf {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);

      &:hover {
        background: rgba(239, 68, 68, 0.25);
        transform: translateY(-2px);
      }
    }

    .cv-docx {
      background: rgba(59, 130, 246, 0.15);
      color: #3b82f6;
      border: 1px solid rgba(59, 130, 246, 0.3);

      &:hover {
        background: rgba(59, 130, 246, 0.25);
        transform: translateY(-2px);
      }
    }

    /* Mobile Styles */
    @media (max-width: 900px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }

      .contact-form-container {
        padding: 1.5rem;
      }

      .cv-language {
        flex-direction: column;
        gap: 0.75rem;
        align-items: flex-start;
      }
    }
  `]
})
export class ContactComponent {
  t = inject(TranslationService);
  personalInfo = PERSONAL_INFO;
}
