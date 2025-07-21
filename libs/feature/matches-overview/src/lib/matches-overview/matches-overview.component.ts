import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ColorChipComponent } from '@portfolio/color-chip';
import { ProjectService } from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import { SectionHeaderComponent } from '@portfolio/section-header';
import { Subject, takeUntil } from 'rxjs';

interface TagMatchInfo {
  searchTag: string;
  fullMatches: number;
  partialMatches: number;
}

@Component({
  selector: 'lib-matches-overview',
  imports: [CommonModule, ColorChipComponent, SectionHeaderComponent],
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
      .subscribe(searchTags => {
        this.updateSearchTagMatches(searchTags);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateSearchTagMatches(searchTags: string[]): void {
    this.tagMatches = searchTags.map(searchTag => ({
      searchTag,
      fullMatches: this.projectService.getBy({ isFullMatchFor: searchTag })
        .length,
      partialMatches: this.projectService.getBy({ isPartialFor: searchTag })
        .length,
    }));
  }
}
