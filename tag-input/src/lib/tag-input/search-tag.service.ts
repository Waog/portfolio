import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchTagService {
  private router = inject(Router);
  private tagsSubject = new BehaviorSubject<string[]>([]);

  // Public observable for components to subscribe to
  public readonly tags$: Observable<string[]> = this.tagsSubject.asObservable();

  constructor() {
    this.initializeFromUrl();
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
    const urlTree = this.router.parseUrl(this.router.url);
    const searchTagsParam = urlTree.queryParams['searchTags'];

    if (searchTagsParam) {
      const tags = searchTagsParam
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag);
      this.tagsSubject.next(tags);
    }
  }

  // Update both internal state and URL
  private updateTagsAndUrl(tags: string[]): void {
    this.tagsSubject.next(tags);
    this.updateUrl(tags);
  }

  // Update URL query parameters without adding to browser history
  private updateUrl(tags: string[]): void {
    const queryParams: { [key: string]: string | undefined } = {};

    if (tags.length > 0) {
      queryParams['searchTags'] = tags.join(',');
    } else {
      queryParams['searchTags'] = undefined; // Remove parameter when no tags
    }

    this.router.navigate([], {
      relativeTo: null,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true, // This prevents adding to browser history
    });
  }
}
