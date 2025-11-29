import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { PERSONAL_INFO, getTopSkills } from '../../core/data/profile.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero-container">
        <!-- Hero Content -->
        <div class="hero-content">
          <p class="hero-greeting animate-fade-in-up">{{ t.t('home.greeting') }}</p>
          <h1 class="hero-name animate-fade-in-up" style="animation-delay: 0.1s">
            {{ personalInfo.name }}
          </h1>
          <h2 class="hero-title animate-fade-in-up" style="animation-delay: 0.2s" [innerHTML]="t.t('home.title')">
          </h2>
          <p class="hero-description animate-fade-in-up" style="animation-delay: 0.3s" [innerHTML]="t.t('home.description')">
          </p>

          <!-- CTA Buttons -->
          <div class="hero-cta animate-fade-in-up" style="animation-delay: 0.4s">
            <a routerLink="/projects" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              {{ t.t('home.viewProjects') }}
            </a>
            <a routerLink="/contact" class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              {{ t.t('home.contactMe') }}
            </a>
          </div>

          <!-- Social Links -->
          <div class="hero-social animate-fade-in-up" style="animation-delay: 0.5s">
            <a [href]="personalInfo.social.github" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a [href]="personalInfo.social.linkedin" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a [href]="'mailto:' + personalInfo.email" class="social-link" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>

        <!-- Hero Image/Avatar -->
        <div class="hero-image animate-fade-in" style="animation-delay: 0.3s">
          <div class="avatar-wrapper">
            @if (personalInfo.avatar) {
              <img [src]="personalInfo.avatar" [alt]="personalInfo.name" class="avatar-img">
            } @else {
              <div class="avatar-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            }
            <div class="avatar-ring"></div>
            <div class="avatar-glow"></div>
          </div>
        </div>
      </div>

      <!-- Skills Preview -->
      <div class="skills-preview animate-fade-in-up" style="animation-delay: 0.6s">
        <div class="skills-container">
          @for (skill of topSkills; track skill.name) {
            <span class="skill-tag">{{ skill.name }}</span>
          }
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator animate-fade-in" style="animation-delay: 0.8s">
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 6rem 1.5rem 2rem;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                    radial-gradient(ellipse at bottom left, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
        pointer-events: none;
      }
    }

    .hero-container {
      max-width: var(--container-max-width);
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      position: relative;
      z-index: 1;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
    }

    .hero-greeting {
      color: var(--color-accent-primary);
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .hero-name {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      color: var(--color-text-primary);
      margin-bottom: 0.5rem;
      line-height: 1.1;
    }

    .hero-title {
      font-size: clamp(1.25rem, 2.5vw, 1.75rem);
      font-weight: 600;
      background: var(--color-accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1.5rem;
      
      ::ng-deep .highlight {
        background: var(--color-accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 700;
      }
    }

    .hero-description {
      font-size: 1.1rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
      max-width: 540px;
      margin-bottom: 2rem;
      
      ::ng-deep strong {
        color: var(--color-text-primary);
        font-weight: 600;
      }
    }

    .hero-cta {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 1rem;
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
        box-shadow: 0 10px 40px rgba(59, 130, 246, 0.4);
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

    .hero-social {
      display: flex;
      gap: 1rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      transition: all var(--transition-fast);

      &:hover {
        background: var(--color-accent-primary);
        border-color: var(--color-accent-primary);
        color: white;
        transform: translateY(-2px);
      }
    }

    .hero-image {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .avatar-wrapper {
      position: relative;
      width: 320px;
      height: 320px;
    }

    .avatar-img,
    .avatar-placeholder {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      position: relative;
      z-index: 2;
      background: var(--color-bg-secondary);
      border: 4px solid var(--color-bg-tertiary);
    }

    .avatar-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-muted);
    }

    .avatar-ring {
      position: absolute;
      inset: -10px;
      border-radius: 50%;
      border: 2px dashed var(--color-accent-primary);
      opacity: 0.5;
      animation: spin 30s linear infinite;
    }

    .avatar-glow {
      position: absolute;
      inset: -20px;
      border-radius: 50%;
      background: var(--color-accent-gradient);
      opacity: 0.2;
      filter: blur(40px);
      z-index: 0;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .skills-preview {
      margin-top: 3rem;
      position: relative;
      z-index: 1;
    }

    .skills-container {
      max-width: var(--container-max-width);
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
    }

    .skill-tag {
      padding: 0.5rem 1rem;
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: 9999px;
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--color-accent-primary);
        color: var(--color-accent-primary);
      }
    }

    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
    }

    .scroll-mouse {
      width: 24px;
      height: 40px;
      border: 2px solid var(--color-text-muted);
      border-radius: 12px;
      display: flex;
      justify-content: center;
      padding-top: 8px;
    }

    .scroll-wheel {
      width: 4px;
      height: 8px;
      background: var(--color-accent-primary);
      border-radius: 2px;
      animation: scroll 2s ease infinite;
    }

    @keyframes scroll {
      0%, 100% {
        transform: translateY(0);
        opacity: 1;
      }
      50% {
        transform: translateY(8px);
        opacity: 0.5;
      }
    }

    /* Mobile Styles */
    @media (max-width: 900px) {
      .hero-container {
        grid-template-columns: 1fr;
        gap: 3rem;
        text-align: center;
      }

      .hero-content {
        align-items: center;
        order: 2;
      }

      .hero-description {
        max-width: 100%;
      }

      .hero-cta {
        justify-content: center;
      }

      .hero-social {
        justify-content: center;
      }

      .hero-image {
        order: 1;
      }

      .avatar-wrapper {
        width: 220px;
        height: 220px;
      }
    }

    @media (max-width: 480px) {
      .hero-cta {
        flex-direction: column;
        width: 100%;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HomeComponent {
  t = inject(TranslationService);
  personalInfo = PERSONAL_INFO;
  topSkills = getTopSkills(10);
}
