import { CommonModule, isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ChipSpacing,
  ColorChipComponent,
  ColorChipDimensionsService,
} from '@portfolio/color-chip';

interface ChipItem {
  text: string;
  color: 'green' | 'yellow' | 'gray';
  icon?: string;
}

@Component({
  selector: 'lib-color-chip-list',
  imports: [CommonModule, MatButtonModule, MatIconModule, ColorChipComponent],
  templateUrl: './color-chip-list.component.html',
  styleUrl: './color-chip-list.component.scss',
})
export class ColorChipListComponent implements AfterViewInit, OnChanges {
  @Input() greenItems: string[] = [];
  @Input() yellowItems: string[] = [];
  @Input() grayItems: string[] = [];
  @Input() spacing: ChipSpacing = 'large';

  @ViewChild('chipColumn', { static: false }) chipColumnRef!: ElementRef;

  showAllItems = false;
  private maxItemRowWidth = 1000;

  // Cached computed properties
  allItems: ChipItem[] = [];
  visibleItems: ChipItem[] = [];
  hiddenItemsCount = 0;
  showToggleButtons = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private colorChipDimensionsService: ColorChipDimensionsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.maxItemRowWidth = this.calculateMaxItemRowWidth();
    this.updateCachedProperties();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Recalculate when inputs change
    if (
      changes['greenItems'] ||
      changes['yellowItems'] ||
      changes['grayItems'] ||
      changes['spacing']
    ) {
      this.updateCachedProperties();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.maxItemRowWidth = this.calculateMaxItemRowWidth();
      this.updateCachedProperties();
      this.changeDetectorRef.detectChanges();
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.maxItemRowWidth = this.calculateMaxItemRowWidth();
    this.updateCachedProperties();
  }

  private calculateMaxItemRowWidth(): number {
    if (isPlatformServer(this.platformId)) {
      return 1000; // Fallback for SSR without window
    }
    if (this.chipColumnRef) {
      const chipColumnWidth =
        this.chipColumnRef.nativeElement.getBoundingClientRect().width;
      if (chipColumnWidth > 0) {
        return chipColumnWidth;
      }
    }
    return window.innerWidth * 0.7; // Fallback calculation
  }

  private calculateAllItems(): ChipItem[] {
    const green = this.greenItems.map(text => ({
      text,
      color: 'green' as const,
      icon: 'star',
    }));
    const yellow = this.yellowItems.map(text => ({
      text,
      color: 'yellow' as const,
      icon: 'star_border',
    }));
    const gray = this.grayItems.map(text => ({
      text,
      color: 'gray' as const,
    }));

    return [...green, ...yellow, ...gray];
  }

  private updateCachedProperties(): void {
    this.allItems = this.calculateAllItems();

    if (this.showAllItems) {
      this.visibleItems = this.allItems;
    } else {
      this.visibleItems = this.getItemsFittingIntoMaxWidth(this.allItems);
    }

    this.hiddenItemsCount = this.allItems.length - this.visibleItems.length;
    this.showToggleButtons =
      this.allItems.length >
      this.getItemsFittingIntoMaxWidth(this.allItems).length;
  }

  getItemsWidth(items: ChipItem[]): number {
    return items.reduce((total, item, index) => {
      const toleranceBuffer = 1; // width calculation is not perfect, so we add a buffer
      const gap = index > 0 ? 8 : 0; // 0.5rem is equivalent to 8px
      return total + this.getItemWidth(item) + gap + toleranceBuffer;
    }, 0);
  }

  getItemWidth(item: ChipItem): number {
    return this.colorChipDimensionsService.getWidth({
      text: item.text,
      icon: item.icon,
      spacing: this.spacing,
    });
  }

  getItemsFittingIntoMaxWidth(items: ChipItem[]): ChipItem[] {
    const result = [];
    for (const item of items) {
      if (this.getItemsWidth([...result, item]) <= this.maxItemRowWidth) {
        result.push(item);
      } else {
        break;
      }
    }
    return result;
  }

  toggleItems(): void {
    this.showAllItems = !this.showAllItems;
    this.updateCachedProperties();
  }
}
