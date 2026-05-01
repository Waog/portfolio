import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CustomizationStateService } from '@portfolio/customization-state';

@Component({
  selector: 'lib-hero-content',
  host: { '[class.print-mode]': 'isPrintMode()' },
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './hero-content.component.html',
  styleUrl: './hero-content.component.scss',
})
export class HeroContentComponent {
  protected readonly isPrintMode = inject(CustomizationStateService)
    .isPrintMode;
}
