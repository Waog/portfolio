import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '@portfolio/navigation';
import { FooterComponent } from '@portfolio/shared-ui';

@Component({
  imports: [RouterModule, FooterComponent, NavigationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
