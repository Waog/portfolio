import { Route } from '@angular/router';
import { WEB_METADATA } from '@portfolio/web-metadata';

import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const legalRoutes: Route[] = [
  {
    path: 'imprint',
    component: ImprintComponent,
    title: WEB_METADATA.pages.legal.imprint.title,
    data: {
      webMetadata: {
        description: WEB_METADATA.pages.legal.imprint.description,
      },
    },
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    title: WEB_METADATA.pages.legal.privacyPolicy.title,
    data: {
      webMetadata: {
        description: WEB_METADATA.pages.legal.privacyPolicy.description,
      },
    },
  },
  {
    path: 'cookie-policy',
    component: CookiePolicyComponent,
    title: WEB_METADATA.pages.legal.cookiePolicy.title,
    data: {
      webMetadata: {
        description: WEB_METADATA.pages.legal.cookiePolicy.description,
      },
    },
  },
  {
    path: '',
    redirectTo: 'imprint',
    pathMatch: 'full',
  },
];
