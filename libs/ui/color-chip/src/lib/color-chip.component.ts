import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ChipColor = 'green' | 'yellow' | 'red';

@Component({
  selector: 'lib-color-chip',
  imports: [CommonModule],
  templateUrl: './color-chip.component.html',
  styleUrl: './color-chip.component.scss',
})
export class ColorChipComponent {
  @Input() text = '';
  @Input() color: ChipColor = 'green';
}
