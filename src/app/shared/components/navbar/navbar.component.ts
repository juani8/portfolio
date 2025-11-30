import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()">
      <div class="navbar-container">
        <!-- Logo -->
        <a routerLink="/" class="navbar-logo">
          <span class="logo-bracket">&lt;</span>
          <span class="logo-text">juanisosa</span>
          <span class="logo-bracket">/&gt;</span>
        </a>

        <!-- Desktop Menu -->
        <div class="navbar-menu" [class.active]="isMenuOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" 
             class="nav-link" (click)="closeMenu()">
            {{ t.t('nav.home') }}
          </a>
          <a routerLink="/about" routerLinkActive="active" 
             class="nav-link" (click)="closeMenu()">
            {{ t.t('nav.about') }}
          </a>
          <a routerLink="/projects" routerLinkActive="active" 
             class="nav-link" (click)="closeMenu()">
            {{ t.t('nav.projects') }}
          </a>
          <a routerLink="/ml-ai" routerLinkActive="active" 
             class="nav-link" (click)="closeMenu()">
            {{ t.t('nav.mlai') }}
          </a>
          <a routerLink="/security" routerLinkActive="active" 
             class="nav-link" (click)="closeMenu()">
            {{ t.t('nav.security') }}
          </a>
          <a routerLink="/contact" routerLinkActive="active" 
             class="nav-link" (click)="closeMenu()">
            {{ t.t('nav.contact') }}
          </a>

          <!-- Language Switcher -->
          <button class="lang-switcher" (click)="toggleLanguage()" [title]="t.lang() === 'es' ? 'Switch to English' : 'Cambiar a Español'">
            <span class="lang-flag" [innerHTML]="t.lang() === 'es' ? flagES : flagEN"></span>
            <span class="lang-text">{{ t.lang() === 'es' ? 'ES' : 'EN' }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lang-arrow"><path d="M7 10l5 5 5-5"/></svg>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="menu-toggle" (click)="toggleMenu()" [attr.aria-label]="isMenuOpen() ? 'Cerrar menú' : 'Abrir menú'">
          <span class="hamburger" [class.open]="isMenuOpen()">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </nav>

    <!-- Overlay para mobile -->
    @if (isMenuOpen()) {
      <div class="menu-overlay" (click)="closeMenu()"></div>
    }
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 1rem 0;
      transition: all var(--transition-normal);
      background: transparent;
    }

    .navbar.scrolled {
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: var(--shadow-md);
      padding: 0.75rem 0;
    }

    .navbar-container {
      max-width: var(--container-max-width);
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .navbar-logo {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-text-primary);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.1rem;
      transition: transform var(--transition-fast);

      &:hover {
        transform: scale(1.02);
      }
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

    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-link {
      padding: 0.5rem 1rem;
      color: var(--color-text-secondary);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);

      &:hover {
        color: var(--color-text-primary);
        background: rgba(255, 255, 255, 0.05);
      }

      &.active {
        color: var(--color-accent-primary);
        background: rgba(59, 130, 246, 0.1);
      }
    }

    .lang-switcher {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 0.75rem;
      margin-left: 0.5rem;
      background: var(--color-bg-tertiary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      font-weight: 600;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--color-accent-primary);
        color: var(--color-accent-primary);
      }
    }

    .lang-flag {
      display: flex;
      align-items: center;
      line-height: 1;
      
      :host ::ng-deep svg {
        display: block;
        border-radius: 2px;
        box-shadow: 0 0 1px rgba(0,0,0,0.3);
      }
    }
    
    .lang-arrow {
      opacity: 0.6;
      transition: transform var(--transition-fast);
    }
    
    .lang-switcher:hover .lang-arrow {
      transform: rotate(180deg);
    }

    .menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      z-index: 1001;
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 24px;

      span {
        display: block;
        height: 2px;
        background: var(--color-text-primary);
        border-radius: 2px;
        transition: all var(--transition-fast);
      }

      &.open {
        span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        span:nth-child(2) {
          opacity: 0;
        }
        span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      }
    }

    .menu-overlay {
      display: none;
    }

    /* Mobile Styles */
    @media (max-width: 900px) {
      .menu-toggle {
        display: block;
      }

      .navbar-menu {
        position: fixed;
        top: 0;
        right: -100%;
        width: 280px;
        height: 100vh;
        background: var(--color-bg-secondary);
        flex-direction: column;
        align-items: flex-start;
        padding: 5rem 2rem 2rem;
        gap: 0.5rem;
        transition: right var(--transition-normal);
        box-shadow: var(--shadow-xl);

        &.active {
          right: 0;
        }
      }

      .nav-link {
        width: 100%;
        padding: 1rem;
        font-size: 1rem;
      }

      .lang-switcher {
        margin-left: 0;
        margin-top: 1rem;
        width: 100%;
        justify-content: center;
      }

      .menu-overlay {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        animation: fadeIn 0.3s ease;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class NavbarComponent {
  t = inject(TranslationService);
  
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  // SVG flags for better cross-platform rendering
  flagES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="20" height="15"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/></svg>`;
  flagEN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="20" height="15"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/><path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/><path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/><path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/></svg>`;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
    // Prevenir scroll cuando el menú está abierto
    document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  toggleLanguage(): void {
    this.t.toggleLanguage();
  }
}
