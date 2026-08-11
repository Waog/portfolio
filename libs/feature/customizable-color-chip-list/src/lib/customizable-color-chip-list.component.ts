import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import type { ChipSpacing } from '@portfolio/color-chip';
import { ColorChipListComponent } from '@portfolio/color-chip-list';
import { CustomizationStateService } from '@portfolio/customization-state';

import { CustomizableColorChipListUrlService } from './customizable-color-chip-list-url.service';

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
  private readonly customizableColorChipListUrlService = inject(
    CustomizableColorChipListUrlService
  );

  greenItems = input<string[]>([]);
  yellowItems = input<string[]>([]);
  grayItems = input<string[]>([]);
  spacing = input<ChipSpacing>('large');
  printMode = input(false, { transform: booleanAttribute });
  rows = input<number>(1);
  urlPersistenceKey = input.required<string>();

  private readonly customSpacing = computed(() =>
    this.customizableColorChipListUrlService.getSpacing(
      this.urlPersistenceKey()
    )
  );
  private readonly customRows = computed(() =>
    this.customizableColorChipListUrlService.getRows(this.urlPersistenceKey())
  );

  readonly effectiveSpacing = computed(
    () => this.customSpacing() ?? this.spacing()
  );
  readonly effectiveRows = computed(() => this.customRows() ?? this.rows());

  protected setSpacing(spacing: ChipSpacing): void {
    this.customizableColorChipListUrlService.setSpacing(
      this.urlPersistenceKey(),
      this.spacing() === spacing ? null : spacing
    );
  }

  protected decreaseRows(): void {
    const rows = Math.max(1, this.effectiveRows() - 1);
    this.customizableColorChipListUrlService.setRows(
      this.urlPersistenceKey(),
      this.rows() === rows ? null : rows
    );
  }

  protected increaseRows(): void {
    const rows = this.effectiveRows() + 1;
    this.customizableColorChipListUrlService.setRows(
      this.urlPersistenceKey(),
      this.rows() === rows ? null : rows
    );
  }
}
