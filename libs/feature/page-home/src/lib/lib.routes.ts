import { Route } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    title: 'Oliver Stadie – Full-Stack Web & App Developer',
  },
];
