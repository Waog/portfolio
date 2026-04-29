import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomizationStateService } from '@portfolio/customization-state';

@Component({
  selector: 'lib-customization-sidenav',
  imports: [CommonModule, MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './customization-sidenav.component.html',
  styleUrl: './customization-sidenav.component.scss',
})
export class CustomizationSidenavComponent {
  protected readonly customizationStateService = inject(
    CustomizationStateService
  );

  protected hidePanel(): void {
    this.customizationStateService.setPanelShown(false);
  }
}
