import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  Project,
  ProjectService,
  TopProjectsService,
} from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import { Subject, takeUntil } from 'rxjs';

import { ProjectItemComponent } from './project-item/project-item.component';

@Component({
  selector: 'lib-project-list',
  imports: [CommonModule, ProjectItemComponent, MatButtonModule, MatIconModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit, OnDestroy {
  public projectService = inject(ProjectService);
  private searchTagService = inject(SearchTagService);
  private topProjectsService = inject(TopProjectsService);
  private destroy$ = new Subject<void>();

  topProjects: Project[] = [];
  showAllProjects = false;

  ngOnInit(): void {
    // Subscribe to search tag changes to update top projects
    this.searchTagService.tags$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.topProjects = this.topProjectsService.getTopProjects();
    });

    // Initialize top projects
    this.topProjects = this.topProjectsService.getTopProjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }

  isTopProject(project: Project): boolean {
    return this.topProjects.some(topProject => topProject.id === project.id);
  }

  toggleAllProjects(): void {
    this.showAllProjects = !this.showAllProjects;
  }
}
