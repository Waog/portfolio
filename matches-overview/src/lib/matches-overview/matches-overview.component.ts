import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SearchTagService } from '@portfolio/tag-input';
import { Subject, takeUntil } from 'rxjs';

import {
  ProjectMatches,
  TechProjectMatchingService,
} from '../services/tech-project-matching.service';

interface TagMatchInfo {
  tag: string;
  matches: ProjectMatches;
}

@Component({
  selector: 'lib-matches-overview',
  imports: [CommonModule],
  templateUrl: './matches-overview.component.html',
  styleUrl: './matches-overview.component.scss',
})
export class MatchesOverviewComponent implements OnInit, OnDestroy {
  private searchTagService = inject(SearchTagService);
  private techProjectMatchingService = inject(TechProjectMatchingService);
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
      matches: this.techProjectMatchingService.getProjectMatchesForTag(tag),
    }));
  }

  getMatchText(matches: ProjectMatches): string {
    const parts: string[] = [];

    if (matches.fullMatches > 0) {
      parts.push(
        `${matches.fullMatches} matching project${
          matches.fullMatches !== 1 ? 's' : ''
        }`
      );
    }

    if (matches.partialMatches > 0) {
      parts.push(
        `${matches.partialMatches} partially matching project${
          matches.partialMatches !== 1 ? 's' : ''
        }`
      );
    }

    if (parts.length === 0) {
      return 'no matching project';
    }

    return parts.join(', ');
  }
}
