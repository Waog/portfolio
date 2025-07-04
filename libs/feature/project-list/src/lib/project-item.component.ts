import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { KeywordListComponent } from '@portfolio/keyword-list';
import { Project } from '@portfolio/projects';

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
    KeywordListComponent,
  ],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent {
  project = input.required<Project>();
  isTopProject = input<boolean>(false);

  showExpandedContent = false;

  toggleContent() {
    this.showExpandedContent = !this.showExpandedContent;
  }
}
