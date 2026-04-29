import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CustomizationStateService } from '@portfolio/customization-state';

@Component({
  selector: 'lib-sub-section',
  host: { '[class.print-mode]': 'isPrintMode()' },
  imports: [MatCardModule, MatIconModule],
  templateUrl: './sub-section.component.html',
  styleUrl: './sub-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubSectionComponent {
  protected readonly isPrintMode = inject(CustomizationStateService)
    .isPrintMode;
}
