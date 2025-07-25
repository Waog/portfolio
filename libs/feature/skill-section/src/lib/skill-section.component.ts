import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  inject,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { KeywordListComponent } from '@portfolio/keyword-list';
import { SectionHeaderComponent } from '@portfolio/section-header';
import { Category, Tag } from '@portfolio/taxonomy';

import { SkillSectionService } from './skill-section.service';

@Component({
  selector: 'lib-skill-section',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    KeywordListComponent,
    SectionHeaderComponent,
  ],
  templateUrl: './skill-section.component.html',
  styleUrl: './skill-section.component.scss',
})
export class SkillSectionComponent implements AfterViewInit {
  @ViewChildren('categoryRef') categoryElementRefs!: QueryList<ElementRef>;
  @ViewChildren('keywordListRef')
  keywordListElementRefs!: QueryList<ElementRef>;

  readonly SPACER_TAGS: Tag[] = [Tag.get('Spacer')];

  private skillSectionService = inject(SkillSectionService);
  private renderer = inject(Renderer2);

  skillCategories: Map<Category, Tag[]> =
    this.skillSectionService.getSkillCategories();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.handleExceedingRows();
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.handleExceedingRows();
  }

  private handleExceedingRows(): void {
    this.showAllRows();
    // TODO: wait for actual chip-list rendering
    setTimeout(() => {
      this.hideExceedingRowsInPrint();
    }, 1000); // NOTE: Delay to ensure each chip-list reduced itself to one line
  }

  private hideExceedingRowsInPrint() {
    for (let i = this.keywordListElementRefs.length - 1; i >= 0; i--) {
      const categoryElement = this.categoryElementRefs.get(i);
      const keywordListElement = this.keywordListElementRefs.get(i);
      if (keywordListElement && categoryElement) {
        this.hideAllInPrintIfAnyOutsidePage1([
          categoryElement,
          keywordListElement,
        ]);
      }
    }
  }

  private showAllRows(): void {
    this.keywordListElementRefs.forEach(keywordListRef => {
      this.renderer.removeClass(keywordListRef.nativeElement, 'screen-only');
    });
    this.categoryElementRefs.forEach(categoryRef => {
      this.renderer.removeClass(categoryRef.nativeElement, 'screen-only');
    });
  }

  private hideAllInPrintIfAnyOutsidePage1(rows: ElementRef[]) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const anyOutsidePage1 = rows.some(row => !this.isOnPage1(row));
    if (anyOutsidePage1) {
      rows.forEach(row =>
        this.renderer.addClass(row.nativeElement, 'screen-only')
      );
    } else {
      rows.forEach(row =>
        this.renderer.removeClass(row.nativeElement, 'screen-only')
      );
    }
  }

  private isOnPage1(row: ElementRef): boolean {
    const rect = row.nativeElement.getBoundingClientRect();
    const DINA4_HEIGHT_PX = 1131;
    const BOTTOM_MARGIN_PX = 55;
    return rect.bottom + window.scrollY < DINA4_HEIGHT_PX - BOTTOM_MARGIN_PX;
  }
}
