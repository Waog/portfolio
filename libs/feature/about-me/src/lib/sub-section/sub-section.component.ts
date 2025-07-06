import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-sub-section',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './sub-section.component.html',
  styleUrl: './sub-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubSectionComponent {}
