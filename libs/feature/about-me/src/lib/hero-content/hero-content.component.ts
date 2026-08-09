import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CustomizationStateService } from '@portfolio/customization-state';

import { HeroHiddenLinkService } from './hero-hidden-link.service';

@Component({
  selector: 'lib-hero-content',
  host: { '[class.print-mode]': 'isPrintMode()' },
  imports: [CommonModule, MatChipsModule, MatIconModule],
  templateUrl: './hero-content.component.html',
  styleUrl: './hero-content.component.scss',
})
export class HeroContentComponent {
  private readonly hiddenLinkService = inject(HeroHiddenLinkService);

  protected readonly isPrintMode = inject(CustomizationStateService)
    .isPrintMode;

  protected readonly hiddenLinkUrl = () =>
    this.hiddenLinkService.getHiddenLinkUrl();
}
