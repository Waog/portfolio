import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { UrlStateService } from '@portfolio/url-state';
import { filter } from 'rxjs';

export type SkillMatrixExperienceUnit = 'project-count' | 'time';

@Injectable({
  providedIn: 'root',
})
export class CustomizationStateService {
  private readonly panelShownQueryParam = 'customizationPanelShown';
  private readonly printModeQueryParam = 'printMode';
  private readonly skillMatrixExperienceUnitQueryParam =
    'skillMatrixExperienceUnit';
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly urlStateService = inject(UrlStateService);

  private readonly _isPanelShown = signal(false);
  private readonly _isPrintMode = signal(false);
  private readonly _skillMatrixExperienceUnit =
    signal<SkillMatrixExperienceUnit>('project-count');
  readonly isPanelShown = this._isPanelShown.asReadonly();
  readonly isPrintMode = this._isPrintMode.asReadonly();
  readonly skillMatrixExperienceUnit =
    this._skillMatrixExperienceUnit.asReadonly();

  constructor() {
    this.setStateFromUrl();
    this.syncStateWithUrlChanges();
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

  setPrintMode(isPrintMode: boolean): void {
    if (this._isPrintMode() === isPrintMode) {
      return;
    }

    this._isPrintMode.set(isPrintMode);
    this.urlStateService.updateValue({
      [this.printModeQueryParam]: isPrintMode ? 'true' : null,
    });
  }

  togglePrintMode(): void {
    this.setPrintMode(!this._isPrintMode());
  }

  setSkillMatrixExperienceUnit(unit: SkillMatrixExperienceUnit): void {
    if (this._skillMatrixExperienceUnit() === unit) {
      return;
    }

    this._skillMatrixExperienceUnit.set(unit);
    this.urlStateService.updateValue({
      [this.skillMatrixExperienceUnitQueryParam]:
        unit === 'project-count' ? null : unit,
    });
  }

  private syncStateWithUrlChanges(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.setStateFromUrl();
      });
  }

  private setStateFromUrl(): void {
    this._isPanelShown.set(this.getQueryParamFlag(this.panelShownQueryParam));
    this._isPrintMode.set(this.getQueryParamFlag(this.printModeQueryParam));
    this._skillMatrixExperienceUnit.set(
      this.getSkillMatrixExperienceUnitFromUrl()
    );
  }

  private getSkillMatrixExperienceUnitFromUrl(): SkillMatrixExperienceUnit {
    const urlTree = this.router.parseUrl(this.router.url);
    return (
      urlTree.queryParams[this.skillMatrixExperienceUnitQueryParam] ??
      'project-count'
    );
  }

  private getQueryParamFlag(queryParam: string): boolean {
    const urlTree = this.router.parseUrl(this.router.url);
    return urlTree.queryParams[queryParam] === 'true';
  }
}
