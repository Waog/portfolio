import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ColorChipComponent } from '@portfolio/color-chip';

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
export class ColorChipListComponent {
  @Input() greenItems: string[] = [];
  @Input() yellowItems: string[] = [];
  @Input() grayItems: string[] = [];

  showAllItems = false;

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

  get visibleItems(): ChipItem[] {
    if (this.showAllItems) {
      return this.allItems;
    }

    // Smart folding logic: prioritize green, then yellow, then gray
    const green = this.allItems.filter(item => item.color === 'green');
    const yellow = this.allItems.filter(item => item.color === 'yellow');
    const gray = this.allItems.filter(item => item.color === 'gray');

    const result = [...green]; // Always show ALL green items

    // Add yellow items until we reach max 10 total
    const remainingSlots = Math.max(0, 10 - result.length);
    result.push(...yellow.slice(0, remainingSlots));

    // If we're below minimum of 6, add gray items to reach minimum
    if (result.length < 6) {
      const neededToReachMin = 6 - result.length;
      result.push(...gray.slice(0, neededToReachMin));
    }

    return result;
  }

  get hiddenItemsCount(): number {
    return this.allItems.length - this.visibleItems.length;
  }

  get shouldShowLessButton(): boolean {
    return (
      this.showAllItems && this.allItems.length > this.getCollapsedItemsCount()
    );
  }

  private getCollapsedItemsCount(): number {
    // Simulate the collapsed logic to see how many items would be visible
    const green = this.allItems.filter(item => item.color === 'green');
    const yellow = this.allItems.filter(item => item.color === 'yellow');
    const gray = this.allItems.filter(item => item.color === 'gray');

    const result = [...green];
    const remainingSlots = Math.max(0, 10 - result.length);
    result.push(...yellow.slice(0, remainingSlots));

    if (result.length < 6) {
      const neededToReachMin = 6 - result.length;
      result.push(...gray.slice(0, neededToReachMin));
    }

    return result.length;
  }

  toggleItems(): void {
    this.showAllItems = !this.showAllItems;
  }

  trackByItem(index: number, item: ChipItem): string {
    return item.text;
  }
}
