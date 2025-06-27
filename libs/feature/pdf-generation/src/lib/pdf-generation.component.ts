import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import htmlToPdfmake from 'html-to-pdfmake';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import { PdfContentComponent } from './pdf-content.component';

(pdfMake as any).vfs = pdfFonts;

@Component({
  selector: 'lib-pdf-generation',
  imports: [CommonModule, MatButtonModule, MatIconModule, PdfContentComponent],
  templateUrl: './pdf-generation.component.html',
  styleUrls: ['./pdf-generation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfGenerationComponent {
  @ViewChild('pdfContent', { static: true }) pdfContent!: ElementRef;

  generateAndDownload(): void {
    const html = this.pdfContent.nativeElement.innerHTML;
    const pdfContent = htmlToPdfmake(html);
    const docDefinition = { content: pdfContent };
    pdfMake.createPdf(docDefinition).download('cv.pdf');
  }
}
