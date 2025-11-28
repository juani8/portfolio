import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { PERSONAL_INFO } from '../../../core/data/profile.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <!-- Top Section -->
        <div class="footer-top">
          <!-- Brand -->
          <div class="footer-brand">
            <a routerLink="/" class="footer-logo">
              <span class="logo-bracket">&lt;</span>
              <span class="logo-text">juanisosa</span>
              <span class="logo-bracket">/&gt;</span>
            </a>
            <p class="footer-tagline">{{ personalInfo.title[t.lang()] }}</p>
          </div>

          <!-- Quick Links -->
          <div class="footer-links">
            <h4 class="footer-heading">Links</h4>
            <nav class="footer-nav">
              <a routerLink="/">{{ t.t('nav.home') }}</a>
              <a routerLink="/about">{{ t.t('nav.about') }}</a>
              <a routerLink="/projects">{{ t.t('nav.projects') }}</a>
              <a routerLink="/contact">{{ t.t('nav.contact') }}</a>
            </nav>
          </div>

          <!-- Social Links -->
          <div class="footer-social">
            <h4 class="footer-heading">Social</h4>
            <div class="social-links">
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
        </div>

        <!-- Divider -->
        <div class="footer-divider"></div>

        <!-- Bottom Section -->
        <div class="footer-bottom">
          <p class="copyright">
            &copy; {{ currentYear }} {{ personalInfo.name }}. {{ t.t('footer.rights') }}
          </p>
          <p class="made-with">
            {{ t.t('footer.madeWith') }} 
            {{ t.t('footer.and') }} 
            <span class="tech">Angular</span>
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--color-bg-secondary);
      border-top: 1px solid var(--color-border);
      padding: 3rem 0 1.5rem;
      margin-top: auto;
    }

    .footer-container {
      max-width: var(--container-max-width);
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 3rem;
      margin-bottom: 2rem;
    }

    .footer-logo {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--color-text-primary);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.1rem;
    }

    .logo-bracket {
      color: var(--color-accent-primary);
    }

    .logo-text {
      background: var(--color-accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .footer-tagline {
      margin-top: 0.75rem;
      color: var(--color-text-muted);
      font-size: 0.9rem;
    }

    .footer-heading {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .footer-nav {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      a {
        color: var(--color-text-secondary);
        text-decoration: none;
        font-size: 0.9rem;
        transition: color var(--transition-fast);

        &:hover {
          color: var(--color-accent-primary);
        }
      }
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      transition: all var(--transition-fast);

      &:hover {
        background: var(--color-accent-primary);
        color: white;
        transform: translateY(-2px);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .footer-divider {
      height: 1px;
      background: var(--color-border);
      margin: 2rem 0;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .copyright {
      color: var(--color-text-muted);
      font-size: 0.85rem;
      margin: 0;
    }

    .made-with {
      color: var(--color-text-muted);
      font-size: 0.85rem;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    .heart {
      animation: pulse 1.5s ease infinite;
    }

    .tech {
      color: var(--color-accent-primary);
      font-weight: 600;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .footer-top {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }

      .footer-nav {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }

      .social-links {
        justify-content: center;
      }

      .footer-bottom {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  t = inject(TranslationService);
  personalInfo = PERSONAL_INFO;
  currentYear = new Date().getFullYear();
}
