import { Route } from '@angular/router';

import { AccessibilityComponent } from './accessibility/accessibility.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

export const legalRoutes: Route[] = [
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'accessibility', component: AccessibilityComponent },
  { path: '', redirectTo: 'imprint', pathMatch: 'full' },
];
