import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-section-header',
  standalone: true,
  host: { '[class.print-mode]': 'printMode()' },
  imports: [CommonModule, MatIconModule],
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
})
export class SectionHeaderComponent {
  text = input.required<string>();
  highlight = input(false, { transform: booleanAttribute });
  printMode = input(false, { transform: booleanAttribute });
}
