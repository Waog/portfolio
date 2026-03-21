import { Route } from '@angular/router';
import { WEB_METADATA } from '@portfolio/web-metadata';

import { HomeComponent } from './home/home.component';

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    title: WEB_METADATA.pages.home.title,
    data: {
      webMetadata: {
        description: WEB_METADATA.pages.home.description,
      },
    },
  },
];
