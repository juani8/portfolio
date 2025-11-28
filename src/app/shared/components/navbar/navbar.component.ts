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
            <span class="lang-flag">{{ t.lang() === 'es' ? '🇬🇧' : '🇪🇸' }}</span>
            <span class="lang-text">{{ t.lang() === 'es' ? 'EN' : 'ES' }}</span>
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
      font-size: 1rem;
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
