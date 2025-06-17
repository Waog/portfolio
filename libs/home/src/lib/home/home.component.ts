import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectsComponent } from '@portfolio/projects';
import { TagInputComponent } from '@portfolio/tag-input';

@Component({
  selector: 'lib-home',
  imports: [CommonModule, ProjectsComponent, TagInputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Tag management is now handled by SearchTagService
}
