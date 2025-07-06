import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { SubSectionComponent } from '../sub-section/sub-section.component';

@Component({
  selector: 'lib-professional-focus',
  imports: [MatIconModule, SubSectionComponent],
  templateUrl: './professional-focus.component.html',
  styleUrl: './professional-focus.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalFocusComponent {}
