import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'lib-section',
  host: { '[class.print-mode]': 'printMode()' },
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  background = input(false, { transform: booleanAttribute });
  fullWidth = input(false, { transform: booleanAttribute });
  noVerticalPadding = input(false, { transform: booleanAttribute });
  printMode = input(false, { transform: booleanAttribute });
}
