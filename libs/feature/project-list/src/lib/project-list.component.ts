import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomizationStateService } from '@portfolio/customization-state';
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
  host: { '[class.print-mode]': 'isPrintMode()' },
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
export class ProjectListComponent {
  private readonly customOrderService = inject(ProjectListCustomOrderService);
  private readonly searchEngineService = inject(SearchEngineService);
  private readonly searchTagService = inject(SearchTagService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly isPrintMode = inject(CustomizationStateService)
    .isPrintMode;

  protected readonly projectsOrder$: Observable<Project[]> =
    this.customOrderService.projectsInOrder$;

  protected readonly showSkeletons$ =
    this.searchEngineService.searchResult$.pipe(
      map(searchResult => searchResult.loading)
    );

  protected readonly topProjectSkeletons = [0, 1, 2];
  protected readonly otherProjectSkeletons = [0, 1, 2, 3, 4, 5, 6];

  @Input() printStart = 0;
  @Input() printCount?: number;
  sectionId = input<string | null>(null);

  protected showAllProjects = false;

  constructor() {
    this.searchTagService.tags$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.showAllProjects = false;
      });
  }

  protected toggleAllProjects(): void {
    this.showAllProjects = !this.showAllProjects;
  }

  protected isPrintSliceMode(): boolean {
    return this.isPrintMode() && this.printCount !== undefined;
  }

  protected shouldShowTopProjectsSection(): boolean {
    if (!this.isPrintSliceMode()) {
      return true;
    }

    return this.rangeIntersects(this.printStart, this.getPrintSliceEnd(), 0, 3);
  }

  protected shouldShowOtherProjectsSection(): boolean {
    if (!this.showAllProjects && !this.isPrintMode()) {
      return false;
    }

    if (!this.isPrintSliceMode()) {
      return true;
    }

    return this.rangeIntersects(
      this.printStart,
      this.getPrintSliceEnd(),
      3,
      Number.POSITIVE_INFINITY
    );
  }

  protected filteredTopProjects(
    projects: Project[] | null | undefined
  ): Project[] {
    if (!projects) {
      return [];
    }

    const topProjects = projects.slice(0, 3);
    if (!this.isPrintSliceMode()) {
      return topProjects;
    }

    return topProjects.filter((_, index) =>
      this.isGlobalIndexInPrintSlice(index)
    );
  }

  protected filteredTopProjectSkeletons(): number[] {
    if (!this.isPrintSliceMode()) {
      return this.topProjectSkeletons;
    }

    return this.getSectionSkeletons(0, 3);
  }

  protected filteredOtherProjects(
    projects: Project[] | null | undefined
  ): Project[] {
    if (!projects) {
      return [];
    }

    const otherProjects = projects.slice(3);
    if (!this.isPrintSliceMode()) {
      return otherProjects;
    }

    return otherProjects.filter((_, index) =>
      this.isGlobalIndexInPrintSlice(index + 3)
    );
  }

  protected filteredOtherProjectSkeletons(): number[] {
    if (!this.isPrintSliceMode()) {
      return this.otherProjectSkeletons;
    }

    return this.getSectionSkeletons(3, Number.POSITIVE_INFINITY);
  }

  protected topProjectCustomIndex(index: number): number {
    if (!this.isPrintSliceMode()) {
      return index + 1;
    }

    return this.printStart + index + 1;
  }

  protected otherProjectCustomIndex(index: number): number {
    const sectionStart = this.isPrintSliceMode()
      ? Math.max(3, this.printStart)
      : 3;
    return sectionStart + index + 1;
  }

  private isGlobalIndexInPrintSlice(globalIndex: number): boolean {
    if (!this.isPrintSliceMode()) {
      return true;
    }

    return (
      globalIndex >= this.printStart && globalIndex < this.getPrintSliceEnd()
    );
  }

  private getPrintSliceEnd(): number {
    const printCount = this.printCount;
    if (printCount === undefined) {
      return this.printStart;
    }

    return this.printStart + printCount;
  }

  private getSectionSkeletons(
    sectionStart: number,
    sectionEnd: number
  ): number[] {
    const intersectionStart = Math.max(sectionStart, this.printStart);
    const intersectionEnd = Math.min(sectionEnd, this.getPrintSliceEnd());
    const count = Math.max(0, intersectionEnd - intersectionStart);

    return Array.from({ length: count }, (_, index) => index);
  }

  private rangeIntersects(
    startA: number,
    endA: number,
    startB: number,
    endB: number
  ): boolean {
    return startA < endB && startB < endA;
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
