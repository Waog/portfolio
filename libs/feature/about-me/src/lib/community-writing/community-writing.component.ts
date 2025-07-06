import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { SubSectionComponent } from '../sub-section/sub-section.component';

@Component({
  selector: 'lib-community-writing',
  imports: [MatIconModule, SubSectionComponent],
  templateUrl: './community-writing.component.html',
  styleUrl: './community-writing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityWritingComponent {}
