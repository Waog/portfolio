import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  selector: 'lib-home',
  imports: [CommonModule, NxWelcomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
