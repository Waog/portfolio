import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  inject,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CustomizableColorChipListComponent } from '@portfolio/customizable-color-chip-list';
import { CustomizationStateService } from '@portfolio/customization-state';
import { SearchEngineService } from '@portfolio/search-engine-angular';
import { SectionHeaderComponent } from '@portfolio/section-header';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-skill-section',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    SectionHeaderComponent,
    CustomizableColorChipListComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './skill-section.component.html',
  styleUrl: './skill-section.component.scss',
})
export class SkillSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('categoryRef') categoryElementRefs!: QueryList<ElementRef>;
  @ViewChildren('keywordListRef')
  keywordListElementRefs!: QueryList<ElementRef>;
  @ViewChild('andMoreCategoryRef')
  andMoreCategoryElementRef?: ElementRef;
  @ViewChild('andMoreSpacerRef', { read: ElementRef })
  andMoreSpacerElementRef?: ElementRef;

  private destroy$ = new Subject<void>();
  private readonly searchEngineService = inject(SearchEngineService);
  protected readonly isPrintMode = inject(CustomizationStateService)
    .isPrintMode;
  protected readonly skillSkeletonRows = [0, 1, 2, 3, 4, 5, 6, 7];
  protected hasHiddenRows = false;

  protected categoryRow$ = this.searchEngineService.searchResult$.pipe(
    takeUntil(this.destroy$),
    map(searchResult => searchResult.ui?.skills)
  );

  protected showSkeletons$ = this.searchEngineService.searchResult$.pipe(
    takeUntil(this.destroy$),
    map(
      searchResult =>
        searchResult.loading || searchResult.ui?.skills === undefined
    )
  );

  private renderer = inject(Renderer2);
  private changeDetectorRef = inject(ChangeDetectorRef);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    this.showSkeletons$.pipe(takeUntil(this.destroy$)).subscribe(show => {
      if (!show) {
        this.handleExceedingRows();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.handleExceedingRows();
  }

  private handleExceedingRows(): void {
    this.showAllRows();
    // TODO: wait for actual chip-list rendering
    setTimeout(() => {
      this.hideExceedingRows();
    }, 1000); // NOTE: Delay to ensure each chip-list reduced itself to one line
  }

  private hideExceedingRows() {
    for (let i = this.keywordListElementRefs.length - 1; i >= 0; i--) {
      const categoryElement = this.categoryElementRefs.get(i);
      const keywordListElement = this.keywordListElementRefs.get(i);
      if (keywordListElement && categoryElement) {
        this.hideRowsIfAnyExceedsContainer([
          categoryElement,
          keywordListElement,
        ]);
      }
    }

    this.hasHiddenRows = this.anyRowHidden();
    if (this.hasHiddenRows) {
      this.changeDetectorRef.detectChanges();
      if (!this.isAndMoreWithinContainerBounds()) {
        this.hideLastVisibleRow();
      }
    }
  }

  private isAndMoreWithinContainerBounds(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    const andMoreCells = [
      this.andMoreCategoryElementRef,
      this.andMoreSpacerElementRef,
    ].filter((row): row is ElementRef => row !== undefined);

    if (andMoreCells.length === 0) {
      return true;
    }

    return andMoreCells.every(row => this.isWithinContainerBounds(row));
  }

  private anyRowHidden(): boolean {
    return this.keywordListElementRefs.some(ref =>
      ref.nativeElement.classList.contains('hidden-overflow')
    );
  }

  private hideLastVisibleRow(): void {
    for (let i = this.keywordListElementRefs.length - 1; i >= 0; i--) {
      const categoryElement = this.categoryElementRefs.get(i);
      const keywordListElement = this.keywordListElementRefs.get(i);
      if (
        keywordListElement &&
        categoryElement &&
        !keywordListElement.nativeElement.classList.contains('hidden-overflow')
      ) {
        this.renderer.addClass(
          categoryElement.nativeElement,
          'hidden-overflow'
        );
        this.renderer.addClass(
          keywordListElement.nativeElement,
          'hidden-overflow'
        );
        return;
      }
    }
  }

  private showAllRows(): void {
    this.keywordListElementRefs.forEach(keywordListRef => {
      this.renderer.removeClass(
        keywordListRef.nativeElement,
        'hidden-overflow'
      );
    });
    this.categoryElementRefs.forEach(categoryRef => {
      this.renderer.removeClass(categoryRef.nativeElement, 'hidden-overflow');
    });
  }

  private hideRowsIfAnyExceedsContainer(rows: ElementRef[]) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const anyExceedsContainer = rows.some(
      row => !this.isWithinContainerBounds(row)
    );
    if (anyExceedsContainer) {
      rows.forEach(row =>
        this.renderer.addClass(row.nativeElement, 'hidden-overflow')
      );
    } else {
      rows.forEach(row =>
        this.renderer.removeClass(row.nativeElement, 'hidden-overflow')
      );
    }
  }

  private isWithinContainerBounds(row: ElementRef): boolean {
    const container = row.nativeElement.closest('.page-sheet');
    if (!container) {
      return true;
    }
    const containerRect = container.getBoundingClientRect();
    const rowRect = row.nativeElement.getBoundingClientRect();
    return rowRect.bottom <= containerRect.bottom;
  }
}
