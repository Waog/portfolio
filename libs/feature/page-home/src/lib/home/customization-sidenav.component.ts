import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  CustomizationStateService,
  SkillMatrixExperienceUnit,
} from '@portfolio/customization-state';
import { ProjectSortOrder } from '@portfolio/search-engine-domain';

import { ProjectReorderDialogComponent } from './project-reorder-dialog.component';

// TODO: move component to own nx lib

@Component({
  selector: 'lib-customization-sidenav',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
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

  protected setSkillMatrixExperienceUnit(
    unit: SkillMatrixExperienceUnit
  ): void {
    this.customizationStateService.setSkillMatrixExperienceUnit(unit);
  }

  protected setProjectSortOrder(sortOrder: ProjectSortOrder): void {
    this.customizationStateService.setProjectSortOrder(sortOrder);
  }

  protected addPrintProjectPage(): void {
    this.customizationStateService.addPrintProjectPage();
  }

  protected removePrintProjectPage(pageIndex: number): void {
    this.customizationStateService.removePrintProjectPage(pageIndex);
  }

  protected setPrintProjectPageSize(pageIndex: number, event: Event): void {
    const projectCount = (event.target as HTMLInputElement).valueAsNumber;
    this.customizationStateService.setPrintProjectPageSize(
      pageIndex,
      projectCount
    );
  }

  protected openReorderDialog(): void {
    this.dialog.open(ProjectReorderDialogComponent, {
      width: '500px',
      height: '95vh',
    });
  }
}
