import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchTagService {
  private tagsSubject = new BehaviorSubject<string[]>([]);

  // Public observable for components to subscribe to
  public readonly tags$: Observable<string[]> = this.tagsSubject.asObservable();

  // Get current tags synchronously
  public get currentTags(): string[] {
    return this.tagsSubject.value;
  }

  // Add a new tag
  public addTag(tag: string): void {
    const trimmedTag = tag.trim();
    if (trimmedTag && !this.currentTags.includes(trimmedTag)) {
      const updatedTags = [...this.currentTags, trimmedTag];
      this.tagsSubject.next(updatedTags);
    }
  }

  // Remove a tag
  public removeTag(tagToRemove: string): void {
    const updatedTags = this.currentTags.filter(tag => tag !== tagToRemove);
    this.tagsSubject.next(updatedTags);
  }

  // Clear all tags
  public clearAllTags(): void {
    this.tagsSubject.next([]);
  }

  // Check if a tag exists
  public hasTag(tag: string): boolean {
    return this.currentTags.includes(tag.trim());
  }
}
