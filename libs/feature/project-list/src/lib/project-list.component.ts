import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchEngineService } from '@portfolio/search-engine-angular';
import { Project } from '@portfolio/search-engine-domain';
import { SearchTagService } from '@portfolio/search-tags';
import { SectionHeaderComponent } from '@portfolio/section-header';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { map, Observable } from 'rxjs';

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
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit {
  private readonly customOrderService = inject(ProjectListCustomOrderService);
  private readonly searchEngineService = inject(SearchEngineService);
  private readonly searchTagService = inject(SearchTagService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly projectsOrder$: Observable<Project[]> =
    this.customOrderService.projectsInOrder$;

  protected readonly showSkeletons$ =
    this.searchEngineService.searchResult$.pipe(
      map(searchResult => searchResult.loading)
    );

  protected readonly topProjectSkeletons = [0, 1, 2];
  protected readonly otherProjectSkeletons = [0, 1, 2, 3, 4, 5, 6];

  protected showAllProjects = false;
  protected isPrintModeActive = false;

  constructor() {
    this.searchTagService.tags$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.showAllProjects = false;
      });
  }

  ngOnInit(): void {
    // Check print mode (this doesn't change dynamically in most cases)
    this.isPrintModeActive = this.checkPrintMode();
  }

  protected toggleAllProjects(): void {
    this.showAllProjects = !this.showAllProjects;
  }

  private checkPrintMode(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('print').matches
    );
  }

  /**
   * Moves a project up in the custom order.
   */
  protected moveProjectUp(projectId: string): void {
    this.customOrderService.moveProjectUp(projectId);
  }

  /**
   * Moves a project down in the custom order.
   */
  protected moveProjectDown(projectId: string): void {
    this.customOrderService.moveProjectDown(projectId);
  }
}
