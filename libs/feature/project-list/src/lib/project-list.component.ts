import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import { SectionHeaderComponent } from '@portfolio/section-header';
import { Subject, takeUntil } from 'rxjs';

import { ProjectItemComponent } from './project-item.component';
import { ProjectListCustomOrderService } from './project-list-custom-order.service';

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
  private searchTagService = inject(SearchTagService);
  private customOrderService = inject(ProjectListCustomOrderService);
  private destroy$ = new Subject<void>();

  showAllProjects = false;

  // Single prioritized list of all projects
  allProjectsInOrder: Project[] = [];
  isPrintModeActive = false;

  ngOnInit(): void {
    // Subscribe to search tag changes to update prioritized projects
    this.searchTagService.tags$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.allProjectsInOrder = this.customOrderService.getOrderedProjects();
    });

    // Initialize projects list
    this.allProjectsInOrder = this.customOrderService.getOrderedProjects();

    // Check print mode (this doesn't change dynamically in most cases)
    this.isPrintModeActive = this.checkPrintMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }

  toggleAllProjects(): void {
    this.showAllProjects = !this.showAllProjects;
  }

  checkPrintMode(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('print').matches
    );
  }

  /**
   * Moves a project up in the custom order.
   */
  moveProjectUp(projectId: string): void {
    this.allProjectsInOrder = this.customOrderService.moveProjectUp(projectId);
  }

  /**
   * Moves a project down in the custom order.
   */
  moveProjectDown(projectId: string): void {
    this.allProjectsInOrder =
      this.customOrderService.moveProjectDown(projectId);
  }
}
