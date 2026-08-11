import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { ChipSpacing } from '@portfolio/color-chip';
import { UrlStateService } from '@portfolio/url-state';
import isEqual from 'lodash/isEqual';
import { distinctUntilChanged, filter, map } from 'rxjs';

interface ColorChipListCustomization {
  spacing?: ChipSpacing | null;
  rows?: number | null;
}

type CustomizationMap = Record<string, ColorChipListCustomization>;

const QUERY_PARAM = 'customColorChipLists';
const ENTRY_PATTERN = /([^;()]+):\(([^)]*)\)/g;

/**
 * Aggregates the customizations of all rendered
 * `CustomizableColorChipListComponent`s into a single URL query param and
 * keeps them in sync with URL changes.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomizableColorChipListUrlService {
  private readonly router = inject(Router);
  private readonly urlStateService = inject(UrlStateService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly customizations = signal<CustomizationMap>(
    this.getCustomizationsFromCurrentUrl()
  );

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getCustomizationsFromCurrentUrl()),
        distinctUntilChanged(isEqual),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(customizations => this.customizations.set(customizations));
  }

  getSpacing(urlPersistenceKey: string): ChipSpacing | null {
    return this.customizations()[urlPersistenceKey]?.spacing ?? null;
  }

  getRows(urlPersistenceKey: string): number | null {
    return this.customizations()[urlPersistenceKey]?.rows ?? null;
  }

  setSpacing(urlPersistenceKey: string, spacing: ChipSpacing | null): void {
    this.updateCustomization(urlPersistenceKey, { spacing });
  }

  setRows(urlPersistenceKey: string, rows: number | null): void {
    this.updateCustomization(urlPersistenceKey, { rows });
  }

  private updateCustomization(
    urlPersistenceKey: string,
    partial: ColorChipListCustomization
  ): void {
    const current = this.customizations();
    const next: CustomizationMap = {
      ...current,
      [urlPersistenceKey]: { ...current[urlPersistenceKey], ...partial },
    };

    if (isEqual(current, next)) {
      return;
    }

    this.customizations.set(next);
    this.urlStateService.updateValue({
      [QUERY_PARAM]: this.toUrlParam(next),
    });
  }

  private getCustomizationsFromCurrentUrl(): CustomizationMap {
    const urlTree = this.router.parseUrl(this.router.url);
    return this.parseUrlParam(urlTree.queryParams[QUERY_PARAM] ?? null);
  }

  private parseUrlParam(param: string | null): CustomizationMap {
    const result: CustomizationMap = {};
    if (!param) {
      return result;
    }

    for (const match of param.matchAll(ENTRY_PATTERN)) {
      const [, urlPersistenceKey, propsPart] = match;
      const customization: ColorChipListCustomization = {};

      for (const prop of propsPart.split(';')) {
        const [key, value] = prop.split(':');
        if (key === 'spacing' && this.isChipSpacing(value)) {
          customization.spacing = value;
        } else if (key === 'rows') {
          const rows = Number(value);
          if (Number.isInteger(rows) && rows > 0) {
            customization.rows = rows;
          }
        }
      }

      if (Object.keys(customization).length > 0) {
        result[urlPersistenceKey] = customization;
      }
    }

    return result;
  }

  private toUrlParam(customizations: CustomizationMap): string | null {
    const entries = Object.entries(customizations).filter(
      ([, customization]) =>
        customization.spacing != null || customization.rows != null
    );

    if (entries.length === 0) {
      return null;
    }

    return [...entries]
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([urlPersistenceKey, customization]) => {
        const props: string[] = [];
        if (customization.spacing != null) {
          props.push(`spacing:${customization.spacing}`);
        }
        if (customization.rows != null) {
          props.push(`rows:${customization.rows}`);
        }
        return `${urlPersistenceKey}:(${props.join(';')})`;
      })
      .join(';');
  }

  private isChipSpacing(value: string): value is ChipSpacing {
    return value === 'small' || value === 'medium' || value === 'large';
  }
}
