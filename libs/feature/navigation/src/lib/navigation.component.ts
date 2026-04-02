import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SearchEngineService } from '@portfolio/search-engine-angular';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'lib-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    MatProgressBarModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  private searchEngine = inject(SearchEngineService);

  protected loadingProgress$: Observable<number> =
    this.searchEngine.searchResult$.pipe(
      map(result => result.ngService?.progressPercent ?? 0)
    );

  downloadCV(): void {
    // TODO: Implement CV download functionality
    throw new Error('Download CV functionality not implemented yet');
  }
}
