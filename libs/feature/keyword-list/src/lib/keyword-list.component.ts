import { CommonModule } from '@angular/common';
import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { ColorChipListComponent } from '@portfolio/color-chip-list';
import { MemoizeAllArgs } from '@portfolio/memoize';
import { MatchType, TechnologyMatchingService } from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import { Tag } from '@portfolio/taxonomy';
import { Subject, takeUntil } from 'rxjs';

interface TagWithMatchType {
  tag: Tag;
  matchType: MatchType;
}

@Component({
  selector: 'lib-keyword-list',
  imports: [CommonModule, ColorChipListComponent],
  templateUrl: './keyword-list.component.html',
  styleUrl: './keyword-list.component.scss',
})
export class KeywordListComponent implements OnInit, OnDestroy {
  keywordTags = input.required<Tag[]>();

  tagsWithMatchType: TagWithMatchType[] = [];
  greenTechnologies: string[] = [];
  yellowTechnologies: string[] = [];
  grayTechnologies: string[] = [];
  loading = true;

  private technologyMatchingService = inject(TechnologyMatchingService);
  private searchTagService = inject(SearchTagService);
  private destroy$ = new Subject<void>();
  private updateTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.searchTagService.tags$
      .pipe(takeUntil(this.destroy$))
      .subscribe(searchTags => {
        this.scheduleUpdate(searchTags);
      });
  }

  ngOnDestroy(): void {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = null;
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  private scheduleUpdate(searchTags: string[]): void {
    // Debounce and yield to the browser to render "Loading..." first
    if (this.updateTimeout) clearTimeout(this.updateTimeout);
    this.loading = true;
    this.updateTimeout = setTimeout(() => {
      this.updateTimeout = null;
      this.updateSearchTagMatches(searchTags);
      this.loading = false;
    });
  }

  @MemoizeAllArgs
  private updateSearchTagMatches(searchTags: string[]): void {
    this.tagsWithMatchType = this.getTagsWithMatchType(searchTags);
    this.greenTechnologies = this.getGreenTechnologies();
    this.yellowTechnologies = this.getYellowTechnologies();
    this.grayTechnologies = this.getGrayTechnologies();
  }

  private getTagsWithMatchType(searchTags: string[]): TagWithMatchType[] {
    return this.keywordTags().map(keywordTag => ({
      tag: keywordTag,
      matchType: this.technologyMatchingService.getBestMatchTypeForKeywordTag({
        keywordTag,
        searchTags,
      }),
    }));
  }

  private getGreenTechnologies(): string[] {
    return this.tagsWithMatchType
      .filter(tagWithMatchType => tagWithMatchType.matchType === 'full')
      .map(tagWithMatchType => tagWithMatchType.tag.canonical);
  }

  private getYellowTechnologies(): string[] {
    return this.tagsWithMatchType
      .filter(tagWithMatchType => tagWithMatchType.matchType === 'indirect')
      .map(tagWithMatchType => tagWithMatchType.tag.canonical);
  }

  private getGrayTechnologies(): string[] {
    return this.tagsWithMatchType
      .filter(tagWithMatchType => tagWithMatchType.matchType === 'none')
      .map(tagWithMatchType => tagWithMatchType.tag.canonical);
  }
}
