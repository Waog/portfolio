import { Route } from '@angular/router';

import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const legalRoutes: Route[] = [
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'cookie-policy', component: CookiePolicyComponent },
  { path: '', redirectTo: 'imprint', pathMatch: 'full' },
];
