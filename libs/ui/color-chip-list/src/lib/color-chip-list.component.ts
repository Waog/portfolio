import { CommonModule, isPlatformServer } from '@angular/common';
import {
  afterRender,
  booleanAttribute,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  PLATFORM_ID,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChipSpacing, ColorChipComponent } from '@portfolio/color-chip';

interface ChipItem {
  text: string;
  color: 'green' | 'yellow' | 'gray';
  icon?: string;
}

@Component({
  selector: 'lib-color-chip-list',
  host: { '[class.print-mode]': 'printMode()' },
  imports: [CommonModule, MatButtonModule, MatIconModule, ColorChipComponent],
  templateUrl: './color-chip-list.component.html',
  styleUrl: './color-chip-list.component.scss',
})
export class ColorChipListComponent {
  greenItems = input<string[]>([]);
  yellowItems = input<string[]>([]);
  grayItems = input<string[]>([]);
  spacing = input<ChipSpacing>('large');
  printMode = input(false, { transform: booleanAttribute });
  rows = input<number>(1);

  @ViewChild('chipColumn')
  private chipColumnRef!: ElementRef<HTMLElement>;

  @ViewChildren('chipItem', { read: ElementRef })
  private chipItemRefs!: QueryList<ElementRef<HTMLElement>>;

  @ViewChild('toggleButton', { read: ElementRef })
  private toggleButtonRef?: ElementRef<HTMLElement>;

  expanded = signal(false);
  private readonly hiddenChipFlags = signal<boolean[]>([]);

  readonly allItems = computed(() => this.buildAllItems());
  readonly hiddenItemsCount = computed(
    () => this.hiddenChipFlags().filter(Boolean).length
  );
  readonly showToggleButton = computed(
    () => this.expanded() || this.hiddenItemsCount() > 0
  );
  readonly chipHeightCssVar = computed(
    () => `var(--chip-height-${this.spacing()})`
  );

  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterRender(() => this.updateHiddenChipFlags());
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateHiddenChipFlags();
  }

  isItemHidden(index: number): boolean {
    if (this.expanded()) return false;
    return this.hiddenChipFlags()[index] ?? false;
  }

  toggleCollapsed(): void {
    this.expanded.set(!this.expanded());
  }

  private updateHiddenChipFlags(): void {
    // NOTE: bounding-box checks rely on browser APIs
    if (isPlatformServer(this.platformId)) return;
    if (this.expanded()) {
      this.clearHiddenFlags();
      return;
    }
    const newFlags = this.computeHiddenFlags();
    if (this.flagsChanged(newFlags)) {
      this.hiddenChipFlags.set(newFlags);
    }
  }

  private clearHiddenFlags(): void {
    if (this.hiddenChipFlags().some(Boolean)) {
      this.hiddenChipFlags.set([]);
    }
  }

  private computeHiddenFlags(): boolean[] {
    const chipElements = this.chipItemRefs?.toArray() ?? [];
    if (!this.chipColumnRef?.nativeElement || chipElements.length === 0) {
      return [];
    }
    const containerRect =
      this.chipColumnRef.nativeElement.getBoundingClientRect();
    const toggleButtonRect =
      this.toggleButtonRef?.nativeElement.getBoundingClientRect();
    return chipElements.map(chipRef => {
      const chipRect = chipRef.nativeElement.getBoundingClientRect();
      return (
        this.isChipOutsideContainer(chipRect, containerRect) ||
        this.isChipOverlappingToggleButton(chipRect, toggleButtonRect)
      );
    });
  }

  private isChipOutsideContainer(
    chipRect: DOMRect,
    containerRect: DOMRect
  ): boolean {
    return chipRect.bottom > containerRect.bottom + 1; // +1 px float tolerance
  }

  private isChipOverlappingToggleButton(
    chipRect: DOMRect,
    toggleButtonRect?: DOMRect
  ): boolean {
    if (!toggleButtonRect) return false;
    return !(
      chipRect.right <= toggleButtonRect.left ||
      chipRect.left >= toggleButtonRect.right ||
      chipRect.bottom <= toggleButtonRect.top ||
      chipRect.top >= toggleButtonRect.bottom
    );
  }

  private flagsChanged(newFlags: boolean[]): boolean {
    const currentFlags = this.hiddenChipFlags();
    if (newFlags.length !== currentFlags.length) return true;
    return newFlags.some((flag, i) => flag !== currentFlags[i]);
  }

  private buildAllItems(): ChipItem[] {
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
}
