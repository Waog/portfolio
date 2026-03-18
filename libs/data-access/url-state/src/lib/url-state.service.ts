import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import isEqual from 'lodash/isEqual';

@Injectable({
  providedIn: 'root',
})
export class UrlStateService {
  private values: { [k: string]: string | null };
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.values = { ...this.route.snapshot.queryParams };
    this.syncStateWithRouteChanges();
  }

  private syncStateWithRouteChanges(): void {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(queryParams => {
        if (!isEqual(this.values, queryParams)) {
          this.values = { ...queryParams };
        }
      });
  }

  updateValue(value: { [k: string]: string | null }): void {
    const newValues = { ...this.values, ...value };

    if (isEqual(this.values, newValues)) {
      return;
    }

    this.values = newValues;

    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: this.values,
      replaceUrl: true,
      preserveFragment: true,
    });
  }
}
