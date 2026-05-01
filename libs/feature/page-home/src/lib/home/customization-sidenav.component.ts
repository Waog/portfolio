import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomizationStateService } from '@portfolio/customization-state';

import { ProjectReorderDialogComponent } from './project-reorder-dialog.component';

@Component({
  selector: 'lib-customization-sidenav',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './customization-sidenav.component.html',
  styleUrl: './customization-sidenav.component.scss',
})
export class CustomizationSidenavComponent {
  protected readonly customizationStateService = inject(
    CustomizationStateService
  );
  private readonly dialog = inject(MatDialog);

  protected hidePanel(): void {
    this.customizationStateService.setPanelShown(false);
  }

  protected setPrintMode(isPrintMode: boolean): void {
    this.customizationStateService.setPrintMode(isPrintMode);
  }

  protected openReorderDialog(): void {
    this.dialog.open(ProjectReorderDialogComponent, {
      width: '500px',
      height: '95vh',
    });
  }
}
