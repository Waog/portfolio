import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { UrlStateService } from '@portfolio/url-state';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomizationStateService {
  private readonly panelShownQueryParam = 'customizationPanelShown';
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly urlStateService = inject(UrlStateService);

  private readonly _isPanelShown = signal(false);
  readonly isPanelShown = this._isPanelShown.asReadonly();

  constructor() {
    this._isPanelShown.set(this.getIsPanelShownFromUrl());
    this.syncPanelShownWithUrlChanges();
  }

  setPanelShown(isShown: boolean): void {
    if (this._isPanelShown() === isShown) {
      return;
    }

    this._isPanelShown.set(isShown);
    this.urlStateService.updateValue({
      [this.panelShownQueryParam]: isShown ? 'true' : null,
    });
  }

  togglePanelShown(): void {
    this.setPanelShown(!this._isPanelShown());
  }

  private syncPanelShownWithUrlChanges(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this._isPanelShown.set(this.getIsPanelShownFromUrl());
      });
  }

  private getIsPanelShownFromUrl(): boolean {
    const urlTree = this.router.parseUrl(this.router.url);
    const panelShownParam = urlTree.queryParams[this.panelShownQueryParam];
    return panelShownParam === 'true';
  }
}
