import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ChipColor = 'green' | 'yellow' | 'red';
export type ChipSpacing = 'small' | 'medium' | 'large';

@Component({
  selector: 'lib-color-chip',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './color-chip.component.html',
  styleUrl: './color-chip.component.scss',
})
export class ColorChipComponent {
  @Input() text = '';
  @Input() color: ChipColor = 'green';
  @Input() icon?: string;
  @Input() spacing: ChipSpacing = 'medium';
  @Input() showCloseButton = false;

  @Output() closeClick = new EventEmitter<void>();

  onCloseClick(): void {
    this.closeClick.emit();
  }
}
