import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
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
export class ColorChipListComponent implements AfterViewInit, AfterViewChecked {
  @Input() greenItems: string[] = [];
  @Input() yellowItems: string[] = [];
  @Input() grayItems: string[] = [];

  @ViewChild('container', { static: false }) containerRef!: ElementRef;
  @ViewChild('toggleColumn', { static: false }) toggleColumnRef!: ElementRef;
  @ViewChild('chipColumn', { static: false }) chipColumnRef!: ElementRef;

  showAllItems = false;
  private maxItemWidth: number = this.calculateMaxItemRowWidth();

  constructor(
    private colorChipDimensionsService: ColorChipDimensionsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.maxItemWidth = this.calculateMaxItemRowWidth();
  }

  ngAfterViewChecked(): void {
    this.maxItemWidth = this.calculateMaxItemRowWidth();
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.maxItemWidth = this.calculateMaxItemRowWidth();
  }

  private calculateMaxItemRowWidth(): number {
    if (this.containerRef) {
      const containerWidth =
        this.containerRef.nativeElement.getBoundingClientRect().width;
      if (containerWidth > 0) {
        console.log({ containerWidth, first: this.allItems[0].text });
      }
    }
    if (this.toggleColumnRef) {
      const toggleColumnWidth =
        this.toggleColumnRef.nativeElement.getBoundingClientRect().width;
      if (toggleColumnWidth > 0) {
        console.log({ toggleColumnWidth, first: this.allItems[0].text });
      }
    }
    if (this.chipColumnRef) {
      const chipColumnWidth =
        this.chipColumnRef.nativeElement.getBoundingClientRect().width;
      if (chipColumnWidth > 0) {
        console.log({ chipColumnWidth, first: this.allItems[0].text });
        return chipColumnWidth;
      }
    }
    return window.innerWidth * 0.5; // Fallback calculation
  }

  get allItems(): ChipItem[] {
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
      spacing: 'large',
    });
  }

  getItemsFittingIntoMaxWidth(items: ChipItem[]): ChipItem[] {
    const result = [];
    for (const item of items) {
      if (this.getItemsWidth([...result, item]) <= this.maxItemWidth) {
        result.push(item);
      } else {
        break;
      }
    }
    return result;
  }

  get visibleItems(): ChipItem[] {
    if (this.showAllItems) {
      return this.allItems;
    }

    return this.getItemsFittingIntoMaxWidth(this.allItems);
  }

  get hiddenItemsCount(): number {
    return this.allItems.length - this.visibleItems.length;
  }

  get showToggleButtons(): boolean {
    return (
      this.allItems.length >
      this.getItemsFittingIntoMaxWidth(this.allItems).length
    );
  }

  toggleItems(): void {
    this.showAllItems = !this.showAllItems;
  }
}
