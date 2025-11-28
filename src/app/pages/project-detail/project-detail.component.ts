import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslationService } from '../../core/services/translation.service';
import { getProjectById, Project } from '../../core/data/projects.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="project-detail-page">
      <div class="project-container">
        
        <!-- Back Button -->
        <nav class="breadcrumb">
          <a routerLink="/projects" class="back-link">
            <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            {{ t('backToProjects') }}
          </a>
        </nav>

        @if (project()) {
          <!-- Header -->
          <header class="project-header">
            <div class="tags-row">
              @for (tag of project()!.tags; track tag) {
                <span class="tag"
                      [ngClass]="{
                        'tag-mobile': tag === 'Mobile',
                        'tag-web': tag === 'Web',
                        'tag-ml': tag === 'ML',
                        'tag-api': tag === 'API',
                        'tag-cloud': tag === 'Cloud' || tag === 'IaC',
                        'tag-security': tag === 'Security',
                        'tag-data': tag === 'Data',
                        'tag-desktop': tag === 'Desktop'
                      }">
                  {{ tag }}
                </span>
              }
            </div>
            
            <h1 class="project-title">
              {{ getLocalizedText(project()!.title) }}
            </h1>
            
            <p class="project-subtitle">
              {{ getLocalizedText(project()!.shortDescription) }}
            </p>

            <!-- Meta Info -->
            @if (project()!.role || project()!.duration || project()!.team) {
              <div class="meta-info">
                @if (project()!.role) {
                  <div class="meta-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span>{{ getLocalizedText(project()!.role!) }}</span>
                  </div>
                }
                @if (project()!.duration) {
                  <div class="meta-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ project()!.duration }}</span>
                  </div>
                }
                @if (project()!.team) {
                  <div class="meta-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span>{{ project()!.team }} {{ t('teamMembers') }}</span>
                  </div>
                }
              </div>
            }
          </header>

          <!-- Technologies -->
          <section class="content-section">
            <h2 class="section-title section-title-sm">{{ t('technologies') }}</h2>
            <div class="tech-grid">
              @for (tech of project()!.technologies; track tech) {
                <span class="tech-badge">{{ tech }}</span>
              }
            </div>
          </section>

          <!-- Full Description -->
          <section class="content-section">
            <h2 class="section-title">{{ t('description') }}</h2>
            <div class="description-content" [innerHTML]="formatDescription(getLocalizedText(project()!.fullDescription))"></div>
          </section>

          <!-- Highlights -->
          @if (project()!.highlights) {
            <section class="content-section">
              <h2 class="section-title">{{ t('highlights') }}</h2>
              <ul class="highlights-list">
                @for (highlight of getLocalizedArray(project()!.highlights!); track highlight) {
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>{{ highlight }}</span>
                  </li>
                }
              </ul>
            </section>
          }

          <!-- Sections with detailed content -->
          @if (project()!.sections && project()!.sections!.length > 0) {
            @for (section of project()!.sections; track section.title.es) {
              <section class="content-section section-card">
                <h2 class="section-title">
                  {{ getLocalizedText(section.title) }}
                </h2>
                <div class="description-content" [innerHTML]="formatDescription(getLocalizedText(section.content))"></div>
                @if (section.imageUrl) {
                  <div class="section-image section-image-thumbnail" (click)="openImageModal(section.imageUrl!)">
                    <img [src]="section.imageUrl" [alt]="getLocalizedText(section.title)" loading="lazy">
                    <div class="image-expand-hint">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                    </div>
                  </div>
                }
                @if (section.diagramUrl) {
                  <a [href]="section.diagramUrl" target="_blank" class="diagram-link">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    {{ t('viewDiagram') }}
                  </a>
                }
              </section>
            }
          }

          <!-- Diagrams -->
          @if (project()!.diagrams && project()!.diagrams!.length > 0) {
            <section class="content-section">
              <h2 class="section-title">{{ t('diagrams') }}</h2>
              <div class="diagrams-grid">
                @for (diagram of project()!.diagrams; track diagram.url) {
                  <a [href]="diagram.url" target="_blank" class="diagram-card">
                    <div class="diagram-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <div class="diagram-info">
                      <h3>{{ getLocalizedText(diagram.title) }}</h3>
                      @if (diagram.description) {
                        <p>{{ getLocalizedText(diagram.description!) }}</p>
                      }
                    </div>
                    <svg class="diagram-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                }
              </div>
            </section>
          }

          <!-- Demo Videos Gallery -->
          @if (project()!.demoVideos && project()!.demoVideos!.length > 0) {
            <section id="demo-videos" class="content-section demo-section">
              <!-- Header -->
              <div class="demo-header">
                <div>
                  <h2 class="section-title">
                    <span class="demo-icon">:)</span>
                    {{ t('demoVideos') }}
                  </h2>
                  <p class="demo-subtitle">{{ t('demoVideosSubtitle') }}</p>
                  <p class="autoplay-hint">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 3l14 9-14 9V3z"/>
                    </svg>
                    {{ t('autoplayHint') }}
                  </p>
                </div>
                <span class="video-count">
                  <span class="pulse-dot"></span>
                  {{ filteredDemoVideos().length }} {{ t('videos') }}
                </span>
              </div>

              <!-- Category Pills - Dynamic -->
              <div class="filter-row">
                <button (click)="setVideoFilter('all')" class="filter-pill" [class.active]="videoFilter() === 'all'">
                  {{ t('filterAll') }}
                </button>
                @for (category of videoCategories(); track category) {
                  <button 
                    (click)="setVideoFilter(category)" 
                    class="filter-pill" 
                    [class.active]="videoFilter() === category"
                    [attr.data-category]="category">
                    {{ getCategoryLabel(category) }}
                  </button>
                }
              </div>

              <!-- Videos Grid -->
              <div class="videos-grid" [class.desktop-grid]="project()!.videoFormat === 'desktop'">
                @for (video of filteredDemoVideos(); track video.url) {
                  <div class="video-card" 
                       (click)="openVideoModal(video)"
                       (mouseenter)="onVideoCardEnter($event)"
                       (mouseleave)="onVideoCardLeave($event)">
                    <div class="phone-mockup" [class.desktop-mockup]="project()!.videoFormat === 'desktop'">
                      @if (project()!.videoFormat !== 'desktop') {
                        <div class="phone-notch"></div>
                      }
                      <video 
                        [src]="video.url"
                        class="phone-screen"
                        [class.desktop-screen]="project()!.videoFormat === 'desktop'"
                        muted
                        loop
                        playsinline
                        preload="metadata">
                      </video>
                      <div class="play-overlay" [class.desktop-overlay]="project()!.videoFormat === 'desktop'">
                        <div class="play-btn">
                          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                      <span class="category-indicator" [class]="'cat-' + video.category"></span>
                    </div>
                    <div class="video-info">
                      <h4>{{ cleanTitle(getLocalizedText(video.title)) }}</h4>
                      <p>{{ getLocalizedText(video.description!) }}</p>
                    </div>
                  </div>
                }
              </div>

              @if (filteredDemoVideos().length === 0) {
                <div class="empty-state">
                  <span>🎬</span>
                  <p>{{ t('noVideosInCategory') }}</p>
                </div>
              }
            </section>

            <!-- Video Modal -->
            @if (selectedVideo()) {
              <div class="modal-backdrop" (click)="closeVideoModal()">
                <div class="modal-container" [class.modal-desktop]="project()!.videoFormat === 'desktop'" (click)="$event.stopPropagation()">
                  <button class="modal-close" (click)="closeVideoModal()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                  <div class="modal-phone" [class.modal-phone-desktop]="project()!.videoFormat === 'desktop'">
                    @if (project()!.videoFormat !== 'desktop') {
                      <div class="modal-notch"></div>
                    }
                    <video 
                      [src]="selectedVideo()!.url"
                      class="modal-video"
                      [class.modal-video-desktop]="project()!.videoFormat === 'desktop'"
                      autoplay
                      loop
                      playsinline
                      controls>
                    </video>
                  </div>
                  <div class="modal-info">
                    <h3>{{ getLocalizedText(selectedVideo()!.title) }}</h3>
                    <p>{{ getLocalizedText(selectedVideo()!.description!) }}</p>
                  </div>
                </div>
              </div>
            }
          }

          <!-- Video Demo -->
          @if (project()!.videoUrl) {
            <section class="content-section">
              <h2 class="section-title">{{ t('videoDemo') }}</h2>
              <div class="video-embed" [class.video-embed-local]="isLocalVideo(project()!.videoUrl!)">
                @if (isLocalVideo(project()!.videoUrl!)) {
                  <video 
                    [src]="project()!.videoUrl" 
                    controls
                    playsinline
                    preload="metadata"
                    class="local-video">
                  </video>
                } @else {
                  <iframe 
                    [src]="project()!.videoUrl" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                  </iframe>
                }
              </div>
            </section>
          }

          <!-- Gallery -->
          @if (project()!.gallery && project()!.gallery!.length > 0) {
            <section class="content-section gallery-section">
              <h2 class="section-title">{{ t('interfaceGallery') }}</h2>
              <div class="gallery-tabs">
                @for (galleryGroup of project()!.gallery; track galleryGroup.title.es; let i = $index) {
                  <button 
                    class="gallery-tab" 
                    [class.active]="activeGalleryTab() === i"
                    (click)="setActiveGalleryTab(i)">
                    {{ getLocalizedText(galleryGroup.title) }}
                  </button>
                }
              </div>
              <div class="gallery-grid">
                @for (image of project()!.gallery![activeGalleryTab()].images; track image.url) {
                  <div class="gallery-item">
                    <img [src]="image.url" [alt]="image.caption ? getLocalizedText(image.caption) : ''" loading="lazy">
                    @if (image.caption) {
                      <span class="gallery-caption">{{ getLocalizedText(image.caption) }}</span>
                    }
                  </div>
                }
              </div>
            </section>
          }

          <!-- Links / CTAs -->
          <section class="cta-section">
            @if (project()!.codeUrl) {
              <a [href]="project()!.codeUrl" target="_blank" class="cta-btn cta-secondary">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {{ t('viewCode') }}
              </a>
            }
            @if (project()!.demoUrl) {
              <a [href]="project()!.demoUrl" target="_blank" class="cta-btn cta-primary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                {{ t('liveDemo') }}
              </a>
            }
            @if (project()!.links) {
              @for (link of project()!.links; track link.url) {
                <a [href]="link.url" target="_blank" class="cta-btn cta-secondary">
                  {{ getLocalizedText(link.label) }}
                </a>
              }
            }
          </section>

        } @else {
          <!-- Project Not Found -->
          <div class="not-found">
            <div class="not-found-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2>{{ t('projectNotFound') }}</h2>
            <p>{{ t('projectNotFoundDesc') }}</p>
            <a routerLink="/projects" class="cta-btn cta-primary">
              {{ t('backToProjects') }}
            </a>
          </div>
        }
      </div>
      
      <!-- Image Modal -->
      @if (selectedImage()) {
        <div class="image-modal-backdrop" (click)="closeImageModal()">
          <div class="image-modal-container" (click)="$event.stopPropagation()">
            <button class="modal-close" (click)="closeImageModal()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <img [src]="selectedImage()!" alt="Expanded image" class="image-modal-img">
          </div>
        </div>
      }
    </main>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* ======================== */
    /* Page Layout              */
    /* ======================== */
    
    .project-detail-page {
      min-height: 100vh;
      padding: 6rem 0 4rem;
    }

    .project-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* ======================== */
    /* Breadcrumb               */
    /* ======================== */
    
    .breadcrumb {
      margin-bottom: 2rem;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #64748b;
      font-size: 0.875rem;
      text-decoration: none;
      transition: color 0.2s;
    }

    .back-link:hover {
      color: #22d3ee;
    }

    .back-icon {
      width: 1.25rem;
      height: 1.25rem;
      transition: transform 0.2s;
    }

    .back-link:hover .back-icon {
      transform: translateX(-4px);
    }

    /* ======================== */
    /* Header                   */
    /* ======================== */
    
    .project-header {
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid rgba(51, 65, 85, 0.5);
    }

    .tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .tag {
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 9999px;
    }

    .tag-mobile { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
    .tag-web { background: rgba(168, 85, 247, 0.2); color: #c084fc; }
    .tag-ml { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
    .tag-api { background: rgba(249, 115, 22, 0.2); color: #fb923c; }
    .tag-cloud { background: rgba(6, 182, 212, 0.2); color: #22d3ee; }
    .tag-security { background: rgba(239, 68, 68, 0.2); color: #f87171; }
    .tag-data { background: rgba(234, 179, 8, 0.2); color: #facc15; }
    .tag-desktop { background: rgba(100, 116, 139, 0.2); color: #94a3b8; }

    .project-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #f1f5f9;
      line-height: 1.2;
      margin-bottom: 1rem;
    }

    @media (min-width: 768px) {
      .project-title {
        font-size: 3rem;
      }
    }

    .project-subtitle {
      font-size: 1.125rem;
      color: #94a3b8;
      line-height: 1.6;
      max-width: 700px;
    }

    .meta-info {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #64748b;
    }

    .meta-item svg {
      width: 1rem;
      height: 1rem;
    }

    /* ======================== */
    /* Content Sections         */
    /* ======================== */
    
    .content-section {
      margin-bottom: 2.5rem;
    }

    .section-title {
      font-size: 1.375rem;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 1rem;
      line-height: 1.3;
    }

    .section-title-sm {
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
    }

    .section-card {
      padding: 1.5rem;
      background: rgba(30, 41, 59, 0.3);
      border-radius: 1rem;
      border: 1px solid rgba(51, 65, 85, 0.5);
    }

    /* ======================== */
    /* Technologies             */
    /* ======================== */
    
    .tech-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tech-badge {
      padding: 0.5rem 1rem;
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(51, 65, 85, 0.5);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      color: #cbd5e1;
    }

    /* ======================== */
    /* Description              */
    /* ======================== */
    
    .description-content {
      color: #94a3b8;
      line-height: 1.8;
      max-width: 750px;
    }

    .description-content p {
      margin-bottom: 1rem;
    }

    .description-content strong {
      color: #e2e8f0;
      font-weight: 600;
    }

    /* ======================== */
    /* Highlights               */
    /* ======================== */
    
    .highlights-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .highlights-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      color: #94a3b8;
      line-height: 1.5;
    }

    .highlights-list li svg {
      width: 1.25rem;
      height: 1.25rem;
      color: #22d3ee;
      flex-shrink: 0;
      margin-top: 2px;
    }

    /* ======================== */
    /* Diagrams                 */
    /* ======================== */
    
    .diagrams-grid {
      display: grid;
      gap: 1rem;
    }

    @media (min-width: 640px) {
      .diagrams-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .diagram-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(51, 65, 85, 0.5);
      border-radius: 0.75rem;
      text-decoration: none;
      transition: all 0.2s;
    }

    .diagram-card:hover {
      border-color: rgba(6, 182, 212, 0.5);
    }

    .diagram-icon {
      width: 3rem;
      height: 3rem;
      background: rgba(6, 182, 212, 0.1);
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .diagram-icon svg {
      width: 1.5rem;
      height: 1.5rem;
      color: #22d3ee;
    }

    .diagram-info h3 {
      font-size: 0.9375rem;
      font-weight: 500;
      color: #e2e8f0;
      margin-bottom: 0.25rem;
    }

    .diagram-card:hover .diagram-info h3 {
      color: #22d3ee;
    }

    .diagram-info p {
      font-size: 0.8125rem;
      color: #64748b;
    }

    .diagram-arrow {
      width: 1.25rem;
      height: 1.25rem;
      color: #475569;
      margin-left: auto;
    }

    .diagram-card:hover .diagram-arrow {
      color: #22d3ee;
    }

    .diagram-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      color: #22d3ee;
      font-size: 0.875rem;
      text-decoration: none;
    }

    .diagram-link:hover {
      color: #67e8f9;
    }

    .diagram-link svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    /* ======================== */
    /* Demo Videos Section      */
    /* ======================== */
    
    .demo-section {
      padding: 1.5rem;
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.3) 100%);
      border-radius: 1rem;
      border: 1px solid rgba(51, 65, 85, 0.4);
    }

    .demo-header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    @media (min-width: 640px) {
      .demo-header {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    .demo-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      background: linear-gradient(135deg, #06b6d4, #3b82f6);
      border-radius: 0.5rem;
      margin-right: 0.75rem;
      font-size: 1rem;
    }

    .demo-subtitle {
      font-size: 0.875rem;
      color: #64748b;
      margin-top: 0.25rem;
    }
    
    .autoplay-hint {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      margin-top: 0.5rem;
      padding: 0.25rem 0.75rem;
      background: rgba(34, 211, 238, 0.1);
      border: 1px solid rgba(34, 211, 238, 0.3);
      border-radius: 9999px;
      font-size: 0.7rem;
      color: #22d3ee;
    }
    
    .autoplay-hint svg {
      width: 0.75rem;
      height: 0.75rem;
    }

    .video-count {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.75rem;
      background: rgba(30, 41, 59, 0.8);
      border-radius: 9999px;
      font-size: 0.75rem;
      color: #64748b;
    }

    .pulse-dot {
      width: 0.5rem;
      height: 0.5rem;
      background: #22d3ee;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Filter Pills */
    .filter-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .filter-pill {
      padding: 0.375rem 0.875rem;
      background: rgba(51, 65, 85, 0.3);
      border: none;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-pill:hover {
      background: rgba(51, 65, 85, 0.5);
      color: #94a3b8;
    }

    .filter-pill.active {
      background: linear-gradient(135deg, #06b6d4, #3b82f6);
      color: white;
    }

    /* Category-specific active colors */
    .filter-pill[data-category="auth"].active { background: linear-gradient(135deg, #ef4444, #f97316); }
    .filter-pill[data-category="social"].active { background: linear-gradient(135deg, #3b82f6, #6366f1); }
    .filter-pill[data-category="profile"].active { background: linear-gradient(135deg, #8b5cf6, #a855f7); }
    .filter-pill[data-category="settings"].active { background: linear-gradient(135deg, #22c55e, #10b981); }
    /* Moodflix categories */
    .filter-pill[data-category="landing"].active { background: linear-gradient(135deg, #8b5cf6, #ec4899); }
    .filter-pill[data-category="discovery"].active { background: linear-gradient(135deg, #f59e0b, #ef4444); }
    .filter-pill[data-category="playlist"].active { background: linear-gradient(135deg, #10b981, #06b6d4); }
    .filter-pill[data-category="detail"].active { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
    .filter-pill[data-category="search"].active { background: linear-gradient(135deg, #3b82f6, #06b6d4); }
    /* SensAi categories */
    .filter-pill[data-category="app"].active { background: linear-gradient(135deg, #0a4f53, #0097b2); }
    .filter-pill[data-category="model"].active { background: linear-gradient(135deg, #7c3aed, #2563eb); }

    /* Videos Grid */
    .videos-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    @media (min-width: 640px) {
      .videos-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
      }
    }

    @media (min-width: 1024px) {
      .videos-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    /* Video Card */
    .video-card {
      cursor: pointer;
      transition: transform 0.2s;
    }

    .video-card:hover {
      transform: translateY(-4px);
    }

    .phone-mockup {
      position: relative;
      background: linear-gradient(145deg, #1e293b, #0f172a);
      border-radius: 1rem;
      padding: 0.375rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .phone-notch {
      position: absolute;
      top: 0.375rem;
      left: 50%;
      transform: translateX(-50%);
      width: 35%;
      height: 0.25rem;
      background: #0f172a;
      border-radius: 9999px;
      z-index: 10;
    }

    .phone-screen {
      width: 100%;
      aspect-ratio: 9 / 16;
      object-fit: cover;
      border-radius: 0.625rem;
      background: #000;
    }
    
    .phone-screen.desktop-screen {
      aspect-ratio: 16 / 9;
    }
    
    .phone-mockup.desktop-mockup {
      border-radius: 0.5rem;
    }
    
    .videos-grid.desktop-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1024px) {
      .videos-grid.desktop-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .play-overlay.desktop-overlay {
      inset: 0;
      border-radius: 0.5rem;
    }

    .play-overlay {
      position: absolute;
      inset: 0.375rem;
      border-radius: 0.625rem;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: opacity 0.2s;
    }

    .video-card:hover .play-overlay {
      opacity: 0;
    }

    .play-btn {
      width: 2rem;
      height: 2rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .play-btn svg {
      width: 1rem;
      height: 1rem;
      color: #0f172a;
      margin-left: 2px;
    }

    .category-indicator {
      position: absolute;
      bottom: 0.625rem;
      right: 0.625rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
    }

    .cat-auth { background: #f87171; box-shadow: 0 0 6px #f87171; }
    .cat-social { background: #60a5fa; box-shadow: 0 0 6px #60a5fa; }
    .cat-profile { background: #c084fc; box-shadow: 0 0 6px #c084fc; }
    .cat-settings { background: #4ade80; box-shadow: 0 0 6px #4ade80; }
    /* Moodflix categories */
    .cat-landing { background: #e879f9; box-shadow: 0 0 6px #e879f9; }
    .cat-discovery { background: #fb923c; box-shadow: 0 0 6px #fb923c; }
    .cat-playlist { background: #2dd4bf; box-shadow: 0 0 6px #2dd4bf; }
    .cat-detail { background: #a78bfa; box-shadow: 0 0 6px #a78bfa; }
    .cat-search { background: #38bdf8; box-shadow: 0 0 6px #38bdf8; }
    /* SensAi categories */
    .cat-app { background: #0097b2; box-shadow: 0 0 6px #0097b2; }
    .cat-model { background: #8b5cf6; box-shadow: 0 0 6px #8b5cf6; }

    .video-info {
      padding: 0.625rem 0.25rem;
    }

    .video-info h4 {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 0.25rem;
      line-height: 1.3;
    }

    .video-card:hover .video-info h4 {
      color: #22d3ee;
    }

    .video-info p {
      font-size: 0.6875rem;
      color: #64748b;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Empty State */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      text-align: center;
    }

    .empty-state span {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      color: #64748b;
      font-size: 0.875rem;
    }

    /* ======================== */
    /* Video Modal              */
    /* ======================== */
    
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-container {
      position: relative;
      max-width: 320px;
      width: 100%;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-close {
      position: absolute;
      top: -2.5rem;
      right: 0;
      width: 2rem;
      height: 2rem;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .modal-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .modal-close svg {
      width: 1rem;
      height: 1rem;
    }

    .modal-phone {
      position: relative;
      background: linear-gradient(145deg, #1e293b, #0f172a);
      border-radius: 1.5rem;
      padding: 0.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
    }

    .modal-notch {
      position: absolute;
      top: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 30%;
      height: 0.375rem;
      background: #0f172a;
      border-radius: 9999px;
      z-index: 10;
    }

    .modal-video {
      width: 100%;
      aspect-ratio: 9 / 16;
      object-fit: contain;
      border-radius: 1rem;
      background: #000;
    }
    
    /* Desktop modal styles */
    .modal-container.modal-desktop {
      max-width: 800px;
    }
    
    .modal-phone.modal-phone-desktop {
      border-radius: 0.75rem;
      padding: 0;
    }
    
    .modal-video.modal-video-desktop {
      aspect-ratio: 16 / 9;
      border-radius: 0.75rem;
    }

    .modal-info {
      margin-top: 1.25rem;
      text-align: center;
    }

    .modal-info h3 {
      font-size: 1rem;
      font-weight: 600;
      color: white;
      margin-bottom: 0.375rem;
    }

    .modal-info p {
      font-size: 0.8125rem;
      color: #94a3b8;
      line-height: 1.5;
    }

    /* ======================== */
    /* Video Embed              */
    /* ======================== */
    
    .video-embed {
      aspect-ratio: 16 / 9;
      background: rgba(30, 41, 59, 0.5);
      border-radius: 0.75rem;
      overflow: hidden;
    }

    .video-embed iframe {
      width: 100%;
      height: 100%;
    }
    
    .video-embed .local-video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #000;
    }

    /* ======================== */
    /* Section Images           */
    /* ======================== */

    .section-image {
      margin-top: 1.5rem;
      border-radius: 0.75rem;
      overflow: hidden;
      border: 1px solid rgba(51, 65, 85, 0.5);
    }
    
    .section-image.section-image-thumbnail {
      max-width: 300px;
      cursor: pointer;
      position: relative;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .section-image.section-image-thumbnail:hover {
      transform: scale(1.02);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }
    
    .section-image.section-image-thumbnail:hover .image-expand-hint {
      opacity: 1;
    }
    
    .image-expand-hint {
      position: absolute;
      bottom: 0.75rem;
      right: 0.75rem;
      width: 2rem;
      height: 2rem;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 0.375rem;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    .image-expand-hint svg {
      width: 1rem;
      height: 1rem;
      color: white;
    }

    .section-image img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    /* Image Modal */
    .image-modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.2s ease;
    }
    
    .image-modal-container {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
    }
    
    .image-modal-img {
      max-width: 100%;
      max-height: 85vh;
      border-radius: 0.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
    }

    /* ======================== */
    /* Gallery Section          */
    /* ======================== */

    .gallery-section {
      padding: 2rem;
    }

    .gallery-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .gallery-tab {
      padding: 0.5rem 1rem;
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(51, 65, 85, 0.5);
      border-radius: 0.5rem;
      color: #94a3b8;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .gallery-tab:hover {
      background: rgba(51, 65, 85, 0.5);
      color: #e2e8f0;
    }

    .gallery-tab.active {
      background: linear-gradient(135deg, #0ea5e9, #22d3ee);
      color: white;
      border-color: transparent;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .gallery-item {
      position: relative;
      border-radius: 0.75rem;
      overflow: hidden;
      border: 1px solid rgba(51, 65, 85, 0.5);
      background: rgba(15, 23, 42, 0.5);
    }

    .gallery-item img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.3s ease;
    }

    .gallery-item:hover img {
      transform: scale(1.05);
    }

    .gallery-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0.5rem;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      color: white;
      font-size: 0.75rem;
      text-align: center;
    }

    /* ======================== */
    /* CTA Section              */
    /* ======================== */
    
    .cta-section {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(51, 65, 85, 0.5);
      margin-top: 2rem;
    }

    .cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s;
    }

    .cta-btn svg {
      width: 1.125rem;
      height: 1.125rem;
    }

    .cta-primary {
      background: linear-gradient(135deg, #06b6d4, #3b82f6);
      color: white;
    }

    .cta-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
    }

    .cta-secondary {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(51, 65, 85, 0.5);
      color: #e2e8f0;
    }

    .cta-secondary:hover {
      border-color: #22d3ee;
      color: #22d3ee;
    }

    /* ======================== */
    /* Not Found                */
    /* ======================== */
    
    .not-found {
      text-align: center;
      padding: 4rem 1rem;
    }

    .not-found-icon {
      width: 5rem;
      height: 5rem;
      background: rgba(30, 41, 59, 0.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    .not-found-icon svg {
      width: 2.5rem;
      height: 2.5rem;
      color: #475569;
    }

    .not-found h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 0.5rem;
    }

    .not-found p {
      color: #64748b;
      margin-bottom: 1.5rem;
    }
  `]
})
export class ProjectDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translationService = inject(TranslationService);
  private sanitizer = inject(DomSanitizer);
  
  project = signal<Project | undefined>(undefined);
  videoFilter = signal<string>('all');
  selectedVideo = signal<{ title: { es: string; en: string }; url: string; description?: { es: string; en: string }; category?: string } | null>(null);
  selectedImage = signal<string | null>(null);
  activeGalleryTab = signal<number>(0);
  
  // Obtener categorías únicas de los videos del proyecto
  videoCategories = computed(() => {
    const proj = this.project();
    if (!proj?.demoVideos) return [];
    
    const categories = new Set<string>();
    proj.demoVideos.forEach(v => {
      if (v.category) categories.add(v.category);
    });
    return Array.from(categories);
  });
  
  filteredDemoVideos = computed(() => {
    const proj = this.project();
    if (!proj?.demoVideos) return [];
    
    const filter = this.videoFilter();
    if (filter === 'all') return proj.demoVideos;
    
    return proj.demoVideos.filter(v => v.category === filter);
  });
  
  constructor() {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      const foundProject = getProjectById(projectId);
      this.project.set(foundProject);
      this.videoFilter.set('all'); // Reset filter when changing project
      
      if (!foundProject) {
        console.warn(`Project with id "${projectId}" not found`);
      }
    });
    
    // Handle fragment navigation (scroll to demo-videos)
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'demo-videos') {
        setTimeout(() => {
          const element = document.getElementById('demo-videos');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }
  
  setVideoFilter(filter: string) {
    this.videoFilter.set(filter);
  }
  
  setActiveGalleryTab(index: number) {
    this.activeGalleryTab.set(index);
  }
  
  getCategoryLabel(category: string): string {
    const labels: Record<string, { es: string; en: string; icon: string }> = {
      // Tribe categories
      auth: { es: 'Auth', en: 'Auth', icon: '🔐' },
      social: { es: 'Social', en: 'Social', icon: '📱' },
      profile: { es: 'Perfil', en: 'Profile', icon: '👤' },
      settings: { es: 'Config', en: 'Settings', icon: '⚙️' },
      // Moodflix categories
      landing: { es: 'Landing', en: 'Landing', icon: '🏠' },
      discovery: { es: 'Descubrir', en: 'Discovery', icon: '🎲' },
      playlist: { es: 'Playlists', en: 'Playlists', icon: '📋' },
      detail: { es: 'Detalle', en: 'Detail', icon: '🎥' },
      search: { es: 'Búsqueda', en: 'Search', icon: '🔍' },
      // SensAi categories
      app: { es: 'App', en: 'App', icon: '📱' },
      model: { es: 'Modelo', en: 'Model', icon: '🔲' },
    };
    const lang = this.translationService.lang();
    const label = labels[category];
    if (label) {
      return `${label.icon} ${label[lang]}`;
    }
    return category;
  }
  
  playVideo(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.play().catch(() => {});
  }
  
  pauseVideo(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
  }
  
  onVideoCardEnter(event: Event) {
    const card = event.currentTarget as HTMLElement;
    const video = card.querySelector('video');
    if (video) {
      video.play().catch(() => {});
    }
  }
  
  onVideoCardLeave(event: Event) {
    const card = event.currentTarget as HTMLElement;
    const video = card.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
  
  openVideoModal(video: any) {
    this.selectedVideo.set(video);
    document.body.style.overflow = 'hidden';
  }
  
  closeVideoModal() {
    this.selectedVideo.set(null);
    document.body.style.overflow = '';
  }
  
  openImageModal(imageUrl: string) {
    this.selectedImage.set(imageUrl);
    document.body.style.overflow = 'hidden';
  }
  
  closeImageModal() {
    this.selectedImage.set(null);
    document.body.style.overflow = '';
  }
  
  cleanTitle(text: string): string {
    // Remove emoji prefix like "🔐 " from title (only if starts with emoji)
    return text.replace(/^[\p{Emoji}\p{Emoji_Component}]+\s*/gu, '');
  }
  
  isLocalVideo(url: string): boolean {
    // Check if it's a local video file (mp4, webm, etc.)
    return url.startsWith('assets/') || url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');
  }
  
  t(key: string): string {
    return this.translationService.t(key);
  }
  
  getLocalizedText(obj: { es: string; en: string }): string {
    const lang = this.translationService.lang();
    return obj[lang];
  }
  
  getLocalizedArray(obj: { es: string[]; en: string[] }): string[] {
    const lang = this.translationService.lang();
    return obj[lang];
  }
  
  formatDescription(text: string): SafeHtml {
    // Convert markdown-like syntax to HTML
    let formatted = text
      // Convert **bold** to <strong>
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Convert bullet points
      .replace(/^• /gm, '<span class="bullet">•</span> ');
    
    // Convert line breaks to paragraphs for better formatting
    const paragraphs = formatted
      .split('\n\n')
      .filter(p => p.trim().length > 0)
      .map(p => {
        // Replace single line breaks with <br> within paragraphs
        const content = p.trim().replace(/\n/g, '<br>');
        return `<p class="mb-4">${content}</p>`;
      })
      .join('');
    
    return this.sanitizer.bypassSecurityTrustHtml(paragraphs);
  }
}
