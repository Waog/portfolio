import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CustomizationStateService } from '@portfolio/customization-state';

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly customizationStateService = inject(
    CustomizationStateService
  );

  protected togglePanelShown(): void {
    this.customizationStateService.togglePanelShown();
  }
}
