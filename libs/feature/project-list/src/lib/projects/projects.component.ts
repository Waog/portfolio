import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchTagService } from '@portfolio/search-tags';
import { Subject, takeUntil } from 'rxjs';

import { ALL_PROJECTS } from '../data/projects.data';
import { Project } from '../models/project';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { TopProjectsService } from '../services/top-projects.service';

@Component({
  selector: 'lib-projects',
  imports: [CommonModule, ProjectItemComponent, MatButtonModule, MatIconModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private searchTagService = inject(SearchTagService);
  private topProjectsService = inject(TopProjectsService);
  private destroy$ = new Subject<void>();

  projects = ALL_PROJECTS;
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
