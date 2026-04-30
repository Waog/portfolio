import { CommonModule, isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  HostListener,
  Inject,
  input,
  PLATFORM_ID,
  signal,
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

const DEFAULT_MAX_ROW_WIDTH = 1000;

@Component({
  selector: 'lib-color-chip-list',
  host: { '[class.print-mode]': 'printMode()' },
  imports: [CommonModule, MatButtonModule, MatIconModule, ColorChipComponent],
  templateUrl: './color-chip-list.component.html',
  styleUrl: './color-chip-list.component.scss',
})
export class ColorChipListComponent implements AfterViewInit {
  greenItems = input<string[]>([]);
  yellowItems = input<string[]>([]);
  grayItems = input<string[]>([]);
  spacing = input<ChipSpacing>('large');
  printMode = input(false, { transform: booleanAttribute });

  @ViewChild('chipColumn', { static: false })
  chipColumnRef!: ElementRef<HTMLElement>;

  showAllItems = signal(false);
  private maxItemRowWidth = signal(DEFAULT_MAX_ROW_WIDTH);

  readonly allItems = computed(() => this.calculateAllItems());
  private readonly itemsFittingInRow = computed(() =>
    this.getItemsFittingIntoMaxWidth(this.allItems())
  );
  readonly visibleItems = computed(() =>
    this.showAllItems() ? this.allItems() : this.itemsFittingInRow()
  );
  readonly hiddenItemsCount = computed(
    () => this.allItems().length - this.visibleItems().length
  );
  readonly showToggleButtons = computed(
    () => this.allItems().length > this.itemsFittingInRow().length
  );

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private colorChipDimensionsService: ColorChipDimensionsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.maxItemRowWidth.set(this.calculateMaxItemRowWidth());
      this.changeDetectorRef.detectChanges();
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.maxItemRowWidth.set(this.calculateMaxItemRowWidth());
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
    const green = this.greenItems().map(text => ({
      text,
      color: 'green' as const,
      icon: 'star',
    }));
    const yellow = this.yellowItems().map(text => ({
      text,
      color: 'yellow' as const,
      icon: 'star_border',
    }));
    const gray = this.grayItems().map(text => ({
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
      spacing: this.spacing(),
    });
  }

  getItemsFittingIntoMaxWidth(items: ChipItem[]): ChipItem[] {
    const result: ChipItem[] = [];
    for (const item of items) {
      if (this.getItemsWidth([...result, item]) <= this.maxItemRowWidth()) {
        result.push(item);
      } else {
        break;
      }
    }
    return result;
  }

  toggleItems(): void {
    this.showAllItems.set(!this.showAllItems());
  }
}
