import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';
import type { ChipSpacing } from '@portfolio/color-chip';
import { ColorChipListComponent } from '@portfolio/color-chip-list';

@Component({
  selector: 'lib-customizable-color-chip-list',
  imports: [CommonModule, ColorChipListComponent],
  templateUrl: './customizable-color-chip-list.component.html',
  styleUrl: './customizable-color-chip-list.component.scss',
})
export class CustomizableColorChipListComponent {
  greenItems = input<string[]>([]);
  yellowItems = input<string[]>([]);
  grayItems = input<string[]>([]);
  spacing = input<ChipSpacing>('large');
  printMode = input(false, { transform: booleanAttribute });
  rows = input<number>(1);
}
