import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { ColorChipComponent } from '@portfolio/color-chip';
import { SearchEngineService } from '@portfolio/search-engine-angular';
import { SectionHeaderComponent } from '@portfolio/section-header';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-matches-overview',
  imports: [CommonModule, ColorChipComponent, SectionHeaderComponent],
  templateUrl: './matches-overview.component.html',
  styleUrl: './matches-overview.component.scss',
})
export class MatchesOverviewComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  protected matchesOverview$ = inject(SearchEngineService).searchResult$.pipe(
    takeUntil(this.destroy$),
    map(searchResult => searchResult.ui?.matchesOverview)
  );

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
