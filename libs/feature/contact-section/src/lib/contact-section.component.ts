import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'lib-contact-section',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  constructor(private snackBar: MatSnackBar) {}

  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.showCopySuccess();
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showCopySuccess();
    }
  }

  private showCopySuccess(): void {
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
