import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { UrlStateService } from '@portfolio/url-state';
import isEqual from 'lodash/isEqual';
import { distinctUntilChanged, filter, map } from 'rxjs';

interface ProjectItemCustomization {
  isTopProject?: boolean | null;
  compact?: boolean | null;
}

type CustomizationMap = Record<string, ProjectItemCustomization>;

const QUERY_PARAM = 'customProjItems';
const ENTRY_PATTERN = /([^;()]+):\(([^)]*)\)/g;

/**
 * Aggregates the customizations of all rendered `CustomizableProjectItemComponent`s
 * into a single URL query param and keeps them in sync with URL changes.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomizableProjectItemUrlService {
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

  getIsTopProject(projectId: string): boolean | null {
    return this.customizations()[projectId]?.isTopProject ?? null;
  }

  getCompact(projectId: string): boolean | null {
    return this.customizations()[projectId]?.compact ?? null;
  }

  setIsTopProject(projectId: string, isTopProject: boolean | null): void {
    this.updateCustomization(projectId, { isTopProject });
  }

  setCompact(projectId: string, compact: boolean | null): void {
    this.updateCustomization(projectId, { compact });
  }

  private updateCustomization(
    projectId: string,
    partial: ProjectItemCustomization
  ): void {
    const current = this.customizations();
    const next: CustomizationMap = {
      ...current,
      [projectId]: { ...current[projectId], ...partial },
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
      const [, projectId, propsPart] = match;
      const customization: ProjectItemCustomization = {};

      for (const prop of propsPart.split(';')) {
        const [key, value] = prop.split(':');
        if (key === 'top') {
          customization.isTopProject = value === 'true';
        } else if (key === 'compact') {
          customization.compact = value === 'true';
        }
      }

      if (Object.keys(customization).length > 0) {
        result[projectId] = customization;
      }
    }

    return result;
  }

  private toUrlParam(customizations: CustomizationMap): string | null {
    const entries = Object.entries(customizations).filter(
      ([, customization]) =>
        customization.isTopProject != null || customization.compact != null
    );

    if (entries.length === 0) {
      return null;
    }

    return [...entries]
      .sort(([projectIdA], [projectIdB]) =>
        projectIdA.localeCompare(projectIdB)
      )
      .map(([projectId, customization]) => {
        const props: string[] = [];
        if (customization.isTopProject != null) {
          props.push(`top:${customization.isTopProject}`);
        }
        if (customization.compact != null) {
          props.push(`compact:${customization.compact}`);
        }
        return `${projectId}:(${props.join(';')})`;
      })
      .join(';');
  }
}
