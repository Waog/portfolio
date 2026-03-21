import { Route } from '@angular/router';

import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const legalRoutes: Route[] = [
  {
    path: 'imprint',
    component: ImprintComponent,
    title: 'Imprint | Oliver Stadie',
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    title: 'Privacy | Oliver Stadie',
  },
  {
    path: 'cookie-policy',
    component: CookiePolicyComponent,
    title: 'Cookies | Oliver Stadie',
  },
  { path: '', redirectTo: 'imprint', pathMatch: 'full' },
];
