import { Route } from '@angular/router';
import { WEB_METADATA } from '@portfolio/web-metadata';

import { LegalPageComponent } from './legal-page.component';

export const legalRoutes: Route[] = [
  {
    path: 'imprint',
    redirectTo: 'imprint/en',
    pathMatch: 'full',
  },
  {
    path: 'imprint/:lang',
    component: LegalPageComponent,
    title: WEB_METADATA.pages.legal.imprint.title,
    data: {
      webMetadata: {
        description: WEB_METADATA.pages.legal.imprint.description,
      },
      legalTexts: { doc: 'imprint' },
    },
  },
  {
    path: 'privacy-policy',
    redirectTo: 'privacy-policy/en',
    pathMatch: 'full',
  },
  {
    path: 'privacy-policy/:lang',
    component: LegalPageComponent,
    title: WEB_METADATA.pages.legal.privacyPolicy.title,
    data: {
      webMetadata: {
        description: WEB_METADATA.pages.legal.privacyPolicy.description,
      },
      legalTexts: { doc: 'privacy-policy' },
    },
  },
  {
    path: '',
    redirectTo: 'imprint',
    pathMatch: 'full',
  },
];
