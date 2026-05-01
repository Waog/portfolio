import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { UrlStateService } from '@portfolio/url-state';
import isEqual from 'lodash/isEqual';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchTagService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly urlStateService = inject(UrlStateService);
  private readonly tagsSubject = new BehaviorSubject<string[]>([]);

  // Public observable for components to subscribe to
  public readonly tags$: Observable<string[]> = this.tagsSubject
    .asObservable()
    .pipe(distinctUntilChanged((a, b) => isEqual(a, b)));

  constructor() {
    this.initializeFromUrl();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getTagsFromCurrentUrl()),
        distinctUntilChanged(isEqual),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(tags => this.tagsSubject.next(tags));
  }

  // Get current tags synchronously
  public get currentTags(): string[] {
    return this.tagsSubject.value;
  }

  // Add a new tag
  public addTag(tag: string): void {
    const trimmedTag = tag.trim();
    if (trimmedTag && !this.currentTags.includes(trimmedTag)) {
      const updatedTags = [...this.currentTags, trimmedTag];
      this.updateTagsAndUrl(updatedTags);
    }
  }

  // Remove a tag
  public removeTag(tagToRemove: string): void {
    const updatedTags = this.currentTags.filter(tag => tag !== tagToRemove);
    this.updateTagsAndUrl(updatedTags);
  }

  // Replace all tags with the given list
  public setTags(tags: string[]): void {
    const nextTags = [...tags];
    this.updateTagsAndUrl(nextTags);
  }

  // Clear all tags
  public clearAllTags(): void {
    this.updateTagsAndUrl([]);
  }

  // Check if a tag exists
  public hasTag(tag: string): boolean {
    return this.currentTags.includes(tag.trim());
  }

  // Initialize tags from URL on service creation
  private initializeFromUrl(): void {
    this.tagsSubject.next(this.getTagsFromCurrentUrl());
  }

  private getTagsFromCurrentUrl(): string[] {
    const urlTree = this.router.parseUrl(this.router.url);
    const searchTagsParam = urlTree.queryParams['searchTags'];

    if (!searchTagsParam) {
      return [];
    }

    return searchTagsParam
      .split(',')
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag);
  }

  // Update both internal state and URL
  private updateTagsAndUrl(tags: string[]): void {
    this.updateUrl(tags);
    this.tagsSubject.next(tags);
  }

  // Update URL query parameters without adding to browser history
  private updateUrl(tags: string[]): void {
    this.urlStateService.updateValue({
      searchTags: tags.length > 0 ? tags.join(',') : null,
    });
  }
}
