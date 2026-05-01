import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomizationStateService } from '@portfolio/customization-state';

@Component({
  selector: 'lib-customization-sidenav',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
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

  protected setPrintMode(isPrintMode: boolean): void {
    this.customizationStateService.setPrintMode(isPrintMode);
  }
}
