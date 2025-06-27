import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts;

@Component({
  selector: 'lib-pdf-generation',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './pdf-generation.component.html',
  styleUrls: ['./pdf-generation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfGenerationComponent implements AfterViewInit {
  showPdfIFrame = false;

  ngAfterViewInit(): void {
    this.generateAndViewInIframe();
  }

  public async generateAndDownload(): Promise<void> {
    pdfMake.createPdf(await this.getDocDefinition()).download('cv.pdf');
  }

  public async generateAndViewInIframe(): Promise<void> {
    this.showPdfIFrame = true;
    pdfMake.createPdf(await this.getDocDefinition()).getBlob(blob => {
      const iframe = document.getElementById('pdfFrame') as HTMLIFrameElement;
      if (iframe) {
        const url = URL.createObjectURL(blob);
        iframe.src = url;
      }
    });
  }

  private async getDocDefinition() {
    return {
      content: [
        {
          table: {
            widths: [200],
            heights: [200],
            body: [
              [
                {
                  text: 'My centered text',
                  alignment: 'center' as const,
                  color: 'black',
                  fillColor: 'lightblue',
                  fontSize: 16,
                  margin: [0, 85, 0, 0],
                  border: [true, true, true, true],
                  borderColor: ['gray', 'gray', 'gray', 'gray'],
                },
              ],
            ],
          },
        },
        {
          image: await this.generateBase64FromAsset('/assets/oli-profile.jpg'),
          width: 150,
          height: 150,
          alignment: 'center' as const,
        },
      ],
    };
  }

  private async generateBase64FromAsset(assetPath: string): Promise<string> {
    const response = await fetch(assetPath);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
