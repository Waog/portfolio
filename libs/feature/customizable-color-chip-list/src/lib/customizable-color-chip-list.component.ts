import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import type { ChipSpacing } from '@portfolio/color-chip';
import { ColorChipListComponent } from '@portfolio/color-chip-list';
import { CustomizationStateService } from '@portfolio/customization-state';

@Component({
  selector: 'lib-customizable-color-chip-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    ColorChipListComponent,
  ],
  templateUrl: './customizable-color-chip-list.component.html',
  styleUrl: './customizable-color-chip-list.component.scss',
})
export class CustomizableColorChipListComponent {
  protected readonly customizationStateService = inject(
    CustomizationStateService
  );

  greenItems = input<string[]>([]);
  yellowItems = input<string[]>([]);
  grayItems = input<string[]>([]);
  spacing = input<ChipSpacing>('large');
  printMode = input(false, { transform: booleanAttribute });
  rows = input<number>(1);

  private readonly customSpacing = signal<ChipSpacing | null>(null);
  private readonly customRows = signal<number | null>(null);

  readonly effectiveSpacing = computed(
    () => this.customSpacing() ?? this.spacing()
  );
  readonly effectiveRows = computed(() => this.customRows() ?? this.rows());

  protected setSpacing(spacing: ChipSpacing): void {
    this.customSpacing.set(spacing);
  }

  protected decreaseRows(): void {
    this.customRows.set(Math.max(1, this.effectiveRows() - 1));
  }

  protected increaseRows(): void {
    this.customRows.set(this.effectiveRows() + 1);
  }
}
