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
import { SectionHeaderComponent } from '@portfolio/section-header';
import { Subject, takeUntil } from 'rxjs';

import { ProjectItemComponent } from './project-item.component';

@Component({
  selector: 'lib-project-list',
  imports: [
    CommonModule,
    ProjectItemComponent,
    MatButtonModule,
    MatIconModule,
    SectionHeaderComponent,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit, OnDestroy {
  public projectService = inject(ProjectService);
  public topProjectsService = inject(TopProjectsService);
  private searchTagService = inject(SearchTagService);
  private destroy$ = new Subject<void>();

  topProjects: Project[] = [];
  nonTopProjects: Project[] = [];
  limitedNonTopProjects: Project[] = [];
  showAllProjects = false;
  printMode = false;

  private beforePrintHandler = () => (this.printMode = true);
  private afterPrintHandler = () => (this.printMode = false);

  ngOnInit(): void {
    this.printMode = this.isPrintMode();
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeprint', this.beforePrintHandler);
      window.addEventListener('afterprint', this.afterPrintHandler);
    }
    // Subscribe to search tag changes to update top projects
    this.searchTagService.tags$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.topProjects = this.topProjectsService.getTopProjects();
      this.nonTopProjects = this.topProjectsService.getNonTopProjects();
      this.limitedNonTopProjects = this.nonTopProjects.slice(0, 5);
    });

    // Initialize top projects
    this.topProjects = this.topProjectsService.getTopProjects();
    this.nonTopProjects = this.topProjectsService.getNonTopProjects();
    this.limitedNonTopProjects = this.nonTopProjects.slice(0, 5);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeprint', this.beforePrintHandler);
      window.removeEventListener('afterprint', this.afterPrintHandler);
    }
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

  isPrintMode(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('print').matches
    );
  }
}
