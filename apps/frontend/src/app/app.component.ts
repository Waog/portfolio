import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@portfolio/footer';
import { NavigationComponent } from '@portfolio/navigation';

@Component({
  imports: [RouterModule, FooterComponent, NavigationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
