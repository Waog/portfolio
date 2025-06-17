import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';

import { SearchTagService } from './search-tag.service';

@Component({
  selector: 'lib-tag-input',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './tag-input.component.html',
  styleUrl: './tag-input.component.scss',
})
export class TagInputComponent implements OnDestroy {
  private searchTagService = inject(SearchTagService);
  private destroy$ = new Subject<void>();

  placeholder = 'Add search term, e.g. "Angular"';
  currentInput = '';
  tags: string[] = [];

  constructor() {
    // Subscribe to tag changes from the service
    this.searchTagService.tags$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tags => {
        this.tags = tags;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addTag(): void {
    if (this.currentInput.trim()) {
      this.searchTagService.addTag(this.currentInput);
      this.currentInput = '';
    }
  }

  removeTag(tagToRemove: string): void {
    this.searchTagService.removeTag(tagToRemove);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag();
    }
  }
}
