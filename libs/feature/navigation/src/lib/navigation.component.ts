import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PdfGenerationComponent } from '@portfolio/pdf-generation';

@Component({
  selector: 'lib-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    PdfGenerationComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @ViewChild(PdfGenerationComponent)
  pdfGenerationComponent!: PdfGenerationComponent;

  downloadCV(): void {
    if (this.pdfGenerationComponent) {
      this.pdfGenerationComponent.generateAndDownload();
    } else {
      console.error('lib-pdf-generation component not found.');
    }
  }
}
