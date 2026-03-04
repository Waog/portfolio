import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ColorChipComponent } from '@portfolio/color-chip';
import { SearchEngineService } from '@portfolio/search-engine-angular';
import { SearchTagService } from '@portfolio/search-tags';
import { SectionHeaderComponent } from '@portfolio/section-header';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { map } from 'rxjs';

@Component({
  selector: 'lib-matches-overview',
  imports: [
    CommonModule,
    ColorChipComponent,
    SectionHeaderComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './matches-overview.component.html',
  styleUrl: './matches-overview.component.scss',
})
export class MatchesOverviewComponent {
  private readonly searchEngineService = inject(SearchEngineService);
  private readonly searchTagService = inject(SearchTagService);
  private readonly searchResult$ = this.searchEngineService.searchResult$;

  protected readonly tags$ = this.searchTagService.tags$;

  protected readonly matchesOverview$ = this.searchResult$.pipe(
    map(searchResult => searchResult.ui?.matchesOverview)
  );

  protected readonly showSkeletons$ = this.searchResult$.pipe(
    map(
      searchResult =>
        searchResult.loading || searchResult.ui?.matchesOverview === undefined
    )
  );
}
