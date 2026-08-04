import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { ProjectSortOrder } from '@portfolio/search-engine-domain';
import { UrlStateService } from '@portfolio/url-state';
import isEqual from 'lodash/isEqual';
import { filter } from 'rxjs';

export type SkillMatrixExperienceUnit = 'project-count' | 'time';

const DEFAULT_PRINT_PROJECT_PAGE_SIZES = [3, 5];
const DEFAULT_NEW_PRINT_PROJECT_PAGE_SIZE = 5;

@Injectable({
  providedIn: 'root',
})
export class CustomizationStateService {
  private readonly panelShownQueryParam = 'customizationPanelShown';
  private readonly printModeQueryParam = 'printMode';
  private readonly skillMatrixExperienceUnitQueryParam =
    'skillMatrixExperienceUnit';
  private readonly projectSortOrderQueryParam = 'projectSortOrder';
  private readonly printProjectPageSizesQueryParam = 'printProjectPageSizes';
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly urlStateService = inject(UrlStateService);

  private readonly _isPanelShown = signal(false);
  private readonly _isPrintMode = signal(false);
  private readonly _skillMatrixExperienceUnit =
    signal<SkillMatrixExperienceUnit>('project-count');
  private readonly _projectSortOrder = signal<ProjectSortOrder>('relevance');
  private readonly _printProjectPageSizes = signal<number[]>([
    ...DEFAULT_PRINT_PROJECT_PAGE_SIZES,
  ]);
  readonly isPanelShown = this._isPanelShown.asReadonly();
  readonly isPrintMode = this._isPrintMode.asReadonly();
  readonly skillMatrixExperienceUnit =
    this._skillMatrixExperienceUnit.asReadonly();
  readonly projectSortOrder = this._projectSortOrder.asReadonly();
  readonly printProjectPageSizes = this._printProjectPageSizes.asReadonly();
  readonly printProjectPageStarts = computed(() =>
    this.computePrintProjectPageStarts(this._printProjectPageSizes())
  );

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

  setProjectSortOrder(sortOrder: ProjectSortOrder): void {
    if (this._projectSortOrder() === sortOrder) {
      return;
    }

    this._projectSortOrder.set(sortOrder);
    this.urlStateService.updateValue({
      [this.projectSortOrderQueryParam]:
        sortOrder === 'relevance' ? null : sortOrder,
    });
  }

  setPrintProjectPageSizes(pageSizes: number[]): void {
    const sanitized = this.sanitizePrintProjectPageSizes(pageSizes);
    if (isEqual(this._printProjectPageSizes(), sanitized)) {
      return;
    }

    this._printProjectPageSizes.set(sanitized);
    this.urlStateService.updateValue({
      [this.printProjectPageSizesQueryParam]: isEqual(
        sanitized,
        DEFAULT_PRINT_PROJECT_PAGE_SIZES
      )
        ? null
        : sanitized.join(','),
    });
  }

  addPrintProjectPage(): void {
    this.setPrintProjectPageSizes([
      ...this._printProjectPageSizes(),
      DEFAULT_NEW_PRINT_PROJECT_PAGE_SIZE,
    ]);
  }

  removePrintProjectPage(pageIndex: number): void {
    const pageSizes = this._printProjectPageSizes();
    if (pageSizes.length <= 1) {
      return;
    }

    this.setPrintProjectPageSizes(
      pageSizes.filter((_, index) => index !== pageIndex)
    );
  }

  setPrintProjectPageSize(pageIndex: number, projectCount: number): void {
    const pageSizes = this._printProjectPageSizes();
    this.setPrintProjectPageSizes(
      pageSizes.map((size, index) =>
        index === pageIndex ? projectCount : size
      )
    );
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
    this._projectSortOrder.set(this.getProjectSortOrderFromUrl());
    this._printProjectPageSizes.set(this.getPrintProjectPageSizesFromUrl());
  }

  private getSkillMatrixExperienceUnitFromUrl(): SkillMatrixExperienceUnit {
    const urlTree = this.router.parseUrl(this.router.url);
    return (
      urlTree.queryParams[this.skillMatrixExperienceUnitQueryParam] ??
      'project-count'
    );
  }

  private getProjectSortOrderFromUrl(): ProjectSortOrder {
    const urlTree = this.router.parseUrl(this.router.url);
    return urlTree.queryParams[this.projectSortOrderQueryParam] ?? 'relevance';
  }

  private getPrintProjectPageSizesFromUrl(): number[] {
    const urlTree = this.router.parseUrl(this.router.url);
    const param = urlTree.queryParams[this.printProjectPageSizesQueryParam];
    if (!param) {
      return [...DEFAULT_PRINT_PROJECT_PAGE_SIZES];
    }

    const parsedPageSizes = (param as string)
      .split(',')
      .map(part => parseInt(part, 10));

    return this.sanitizePrintProjectPageSizes(parsedPageSizes);
  }

  private sanitizePrintProjectPageSizes(pageSizes: number[]): number[] {
    const sanitized = pageSizes
      .filter(size => Number.isFinite(size))
      .map(size => Math.max(1, Math.round(size)));

    return sanitized.length > 0
      ? sanitized
      : [...DEFAULT_PRINT_PROJECT_PAGE_SIZES];
  }

  private computePrintProjectPageStarts(pageSizes: number[]): number[] {
    const starts: number[] = [];
    let cumulativeCount = 0;

    for (const pageSize of pageSizes) {
      starts.push(cumulativeCount);
      cumulativeCount += pageSize;
    }

    return starts;
  }

  private getQueryParamFlag(queryParam: string): boolean {
    const urlTree = this.router.parseUrl(this.router.url);
    return urlTree.queryParams[queryParam] === 'true';
  }
}
