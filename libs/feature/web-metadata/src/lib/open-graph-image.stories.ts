import { Component, ElementRef, input, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import html2canvas from 'html2canvas';

/**
 * NOTE: There is no official max size, mainly Best Practices and online experience.
 * Documented max. file size for WhatsApp preview images is 600KB, but sizes above 300KB can be unreliable.
 * Online Best Practices recommend sizes below 300KB.
 * We subtract a small buffer to ensure compliance.
 */
const IMAGE_MAX_SIZE_KB = 290;

@Component({
  selector: 'lib-open-graph-image-story',
  standalone: true,
  template: `
    <section class="story-layout">
      <header class="control-bar">
        <div class="help-content">
          <p class="help-title">Create Open Graph image</p>
          <p class="help-text">
            Download <code>og-image.jpg</code> and reference it in your
            <code>meta</code> tag as <code>og:image</code>. This preview image
            will then be shown when sharing on WhatsApp, LinkedIn, or X.
          </p>
        </div>

        <div class="action-area">
          <button
            class="download-button"
            type="button"
            (click)="downloadImage()"
          >
            Download og-image.jpg
          </button>

          <p class="status" [attr.data-active]="status ? 'true' : 'false'">
            {{ status || 'Ready to export' }}
          </p>
        </div>
      </header>

      <div class="export-stage">
        <article #exportTarget class="share-image-export-target">
          <div class="share-image-safe-area">
            <div class="hero-image">
              <img src="/assets/oli-profile.jpg" alt="Oliver Stadie" />
            </div>

            <div class="hero-message">
              <h1>Oliver Stadie</h1>
              <p>Full-Stack Developer</p>
            </div>
          </div>
        </article>

        <div
          class="safe-area-overlay"
          [attr.data-visible]="showSafeAreaOverlay() ? 'true' : 'false'"
          aria-hidden="true"
        ></div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .story-layout {
        display: grid;
        gap: 14px;
        justify-content: start;
      }

      .control-bar {
        width: 1200px;
        display: grid;
        gap: 12px;
        padding: 16px 18px;
        box-sizing: border-box;
        background: linear-gradient(135deg, #f6f9fd 0%, #e9eff8 100%);
        border: 1px solid #d5dfec;
        border-radius: 12px;
      }

      .help-content {
        flex: 1;
        min-width: 0;
      }

      .help-title {
        margin: 0 0 6px;
        color: #1f2f41;
        font-size: 18px;
        line-height: 1.2;
        font-weight: 700;
      }

      .help-text {
        margin: 0;
        color: #2c3e50;
        font-size: 14px;
        line-height: 1.4;
      }

      .help-text code {
        background: #e3ebf6;
        color: #213244;
        border-radius: 4px;
        padding: 1px 6px;
        font-size: 0.92em;
      }

      .action-area {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .download-button {
        width: fit-content;
        min-width: 260px;
        border: 0;
        border-radius: 8px;
        background: #2c3e50;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        padding: 12px 16px;
        cursor: pointer;
        box-shadow: 0 6px 14px rgba(44, 62, 80, 0.25);
      }

      .download-button:hover {
        background: #1f2c39;
      }

      .status {
        min-height: 20px;
        margin: 0;
        font-size: 13px;
        line-height: 1.3;
        text-align: left;
        color: #5b6978;
      }

      .status[data-active='true'] {
        color: #2c3e50;
      }

      .share-image-export-target {
        width: 1200px;
        height: 630px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0;
        background: linear-gradient(
          160deg,
          #eef2f8 0%,
          #d5deed 58%,
          #c3cfe2 100%
        );
      }

      .export-stage {
        width: 1200px;
        height: 630px;
        position: relative;
      }

      .safe-area-overlay {
        pointer-events: none;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 960px;
        height: 504px;
        transform: translate(-50%, -50%);
        border: 2px dashed rgba(44, 62, 80, 0.8);
        box-shadow: inset 0 0 0 9999px rgba(44, 62, 80, 0.08);
        opacity: 0;
        transition: opacity 120ms ease-in-out;
      }

      .safe-area-overlay[data-visible='true'] {
        opacity: 1;
      }

      .share-image-safe-area {
        width: 960px;
        height: 504px;
        display: grid;
        grid-template-columns: 340px 1fr;
        align-items: center;
        column-gap: 34px;
      }

      .hero-image img {
        width: 340px;
        height: 340px;
        border-radius: 50%;
        object-fit: cover;
        border: 8px solid #ffffff;
        box-shadow: 0 8px 22px rgba(0, 0, 0, 0.16);
      }

      .hero-message {
        min-width: 0;
      }

      .hero-message h1 {
        margin: 0;
        color: #2c3e50;
        font-size: 104px;
        line-height: 0.95;
        letter-spacing: -1.3px;
        font-weight: 700;
      }

      .hero-message p {
        margin: 20px 0 0;
        color: #34495e;
        font-size: 58px;
        line-height: 1.05;
        font-weight: 600;
      }

      @media (max-width: 1240px) {
        .control-bar,
        .export-stage,
        .share-image-export-target {
          width: 100%;
        }

        .action-area {
          width: 100%;
          align-items: stretch;
        }

        .download-button {
          width: 100%;
          min-width: 0;
        }
      }
    `,
  ],
})
class OpenGraphImageStoryComponent {
  @ViewChild('exportTarget', { static: true })
  private exportTarget?: ElementRef<HTMLElement>;

  showSafeAreaOverlay = input(false);

  protected status = '';

  async downloadImage(): Promise<void> {
    const target = this.exportTarget?.nativeElement;
    if (!target) {
      this.status = 'Export target not found.';
      return;
    }

    this.status = 'Rendering image...';

    try {
      const canvas = await html2canvas(target, {
        backgroundColor: null,
        scale: 1,
        useCORS: true,
        width: 1200,
        height: 630,
      });

      const dataUrl = this.compressCanvas(canvas);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'og-image.jpg';
      link.click();

      this.status = 'Download started.';
    } catch (error) {
      console.error('Failed to render Open Graph image.', error);
      window.alert(`Failed to render image. Please try again. ${error}`);
      this.status = 'Failed to render image.';
    }
  }

  private compressCanvas(
    canvas: HTMLCanvasElement,
    maxSizeKB = IMAGE_MAX_SIZE_KB
  ): string {
    let quality = 1;
    let dataUrl: string;

    do {
      dataUrl = canvas.toDataURL('image/jpeg', quality);
      const curSizeKB: number = this.getSizeKB(dataUrl);
      if (curSizeKB <= maxSizeKB) break;
      quality -= 0.01;
      if (quality <= 0) {
        throw new Error(
          `Unable to compress image below ${maxSizeKB} KB. Size at quality ${
            quality + 0.01
          }: ${curSizeKB} KB.`
        );
      }
    } while (quality > 0);

    return dataUrl;
  }

  private getSizeKB(dataUrl: string): number {
    const base64 = dataUrl.split(',')[1];
    const sizeBytes = (base64.length * 3) / 4;
    return sizeBytes / 1024;
  }
}

const meta: Meta<OpenGraphImageStoryComponent> = {
  component: OpenGraphImageStoryComponent,
  title: 'Feature/Open Graph Image Generator',
  tags: ['autodocs'],
  argTypes: {
    showSafeAreaOverlay: {
      control: 'boolean',
      description:
        'Shows a dev-only safe-area overlay (not included in export).',
      table: {
        category: 'Development',
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default meta;

type Story = StoryObj<OpenGraphImageStoryComponent>;

export const Default: Story = {
  args: {
    showSafeAreaOverlay: false,
  },
};
