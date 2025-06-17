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
}
