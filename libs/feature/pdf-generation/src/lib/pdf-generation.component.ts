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

  docDefinition = {
    content: [
      {
        table: {
          widths: [200],
          heights: [200],
          body: [
            [
              {
                text: 'My centered text',
                alignment: 'center',
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
    ],
  };

  ngAfterViewInit(): void {
    this.generateAndViewInIframe();
  }

  generateAndDownload(): void {
    pdfMake.createPdf(this.docDefinition).download('cv.pdf');
  }
  generateAndViewInIframe(): void {
    this.showPdfIFrame = true;
    pdfMake.createPdf(this.docDefinition).getBlob(blob => {
      const url = URL.createObjectURL(blob);
      const iframe = document.getElementById('pdfFrame') as HTMLIFrameElement;
      iframe.src = url;
    });
  }
}
