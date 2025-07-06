import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { SubSectionComponent } from '../sub-section/sub-section.component';

@Component({
  selector: 'lib-education',
  imports: [MatIconModule, SubSectionComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent {}
