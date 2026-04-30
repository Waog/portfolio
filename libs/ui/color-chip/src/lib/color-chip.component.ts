import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ChipColor = 'green' | 'yellow' | 'red' | 'gray';
export type ChipSpacing = 'small' | 'medium' | 'large';

@Component({
  selector: 'lib-color-chip',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './color-chip.component.html',
  styleUrl: './color-chip.component.scss',
})
export class ColorChipComponent {
  text = input('');
  color = input<ChipColor>('green');
  icon = input<string>();
  spacing = input<ChipSpacing>('medium');
  showCloseButton = input(false);

  closeClick = output<void>();

  onCloseClick(): void {
    this.closeClick.emit();
  }
}
