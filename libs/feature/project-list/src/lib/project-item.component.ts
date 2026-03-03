import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ColorChipListComponent } from '@portfolio/color-chip-list';
import { Project } from '@portfolio/search-engine-domain';

import { ProjectItemMetaTilesComponent } from './project-item-meta-tiles.component';

@Component({
  selector: 'lib-project-item',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    ProjectItemMetaTilesComponent,
    ColorChipListComponent,
  ],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent {
  project = input.required<Project>();
  isTopProject = input<boolean>(false);
  compact = input<boolean>(false);
  customIndex = input<number>();
  moveUp = output<string>();
  moveDown = output<string>();

  showExpandedContent = false;

  toggleContent() {
    this.showExpandedContent = !this.showExpandedContent;
  }

  handleMoveUp(): void {
    this.moveUp.emit(this.project().id);
  }

  handleMoveDown(): void {
    this.moveDown.emit(this.project().id);
  }
}
