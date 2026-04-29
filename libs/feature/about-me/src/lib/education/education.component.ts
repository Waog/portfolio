import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomizationStateService } from '@portfolio/customization-state';

import { SubSectionComponent } from '../sub-section/sub-section.component';

@Component({
  selector: 'lib-education',
  host: { '[class.print-mode]': 'isPrintMode()' },
  imports: [MatIconModule, SubSectionComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent {
  protected readonly isPrintMode = inject(CustomizationStateService)
    .isPrintMode;
}
