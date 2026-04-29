import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomizationStateService } from '@portfolio/customization-state';
import { FooterComponent } from '@portfolio/footer';
import { NavigationComponent } from '@portfolio/navigation';
import { SpacingModeSyncService } from '@portfolio/shared-styles';

@Component({
  imports: [RouterModule, FooterComponent, NavigationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly isPrintMode = inject(CustomizationStateService).isPrintMode;
  private readonly spacingModeSyncService = inject(SpacingModeSyncService);

  constructor() {
    effect(() => {
      this.spacingModeSyncService.setPrintMode(this.isPrintMode());
    });
  }
}
