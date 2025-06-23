import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ColorChipComponent } from '@portfolio/color-chip';
import { ProjectService } from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import { Subject, takeUntil } from 'rxjs';

interface TagMatchInfo {
  tag: string;
  fullMatches: number;
  partialMatches: number;
}

@Component({
  selector: 'lib-matches-overview',
  imports: [CommonModule, ColorChipComponent],
  templateUrl: './matches-overview.component.html',
  styleUrl: './matches-overview.component.scss',
})
export class MatchesOverviewComponent implements OnInit, OnDestroy {
  private searchTagService = inject(SearchTagService);
  private projectService = inject(ProjectService);
  private destroy$ = new Subject<void>();

  tagMatches: TagMatchInfo[] = [];

  ngOnInit(): void {
    this.searchTagService.tags$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tags => {
        this.updateTagMatches(tags);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateTagMatches(tags: string[]): void {
    this.tagMatches = tags.map(tag => ({
      tag,
      fullMatches: this.projectService.getBy({ isFullMatchFor: tag }).length,
      partialMatches: this.projectService.getBy({ isPartialFor: tag }).length,
    }));
  }
}
