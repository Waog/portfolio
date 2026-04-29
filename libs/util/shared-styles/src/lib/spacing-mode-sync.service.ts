import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpacingModeSyncService {
  private static readonly printModeAttribute = 'data-spacing-print-mode';
  private readonly document = inject(DOCUMENT);

  setPrintMode(enabled: boolean): void {
    const root = this.document.documentElement;
    if (!root) {
      return;
    }

    if (enabled) {
      root.setAttribute(SpacingModeSyncService.printModeAttribute, 'true');
      return;
    }

    root.removeAttribute(SpacingModeSyncService.printModeAttribute);
  }
}
