import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'lib-section',
  imports: [CommonModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  background = input(false, { transform: booleanAttribute });
  fullWidth = input(false, { transform: booleanAttribute });
  noVerticalPadding = input(false, { transform: booleanAttribute });
}
