import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@portfolio/page-home').then(m => m.homeRoutes),
  },
  {
    path: 'legal',
    loadChildren: () => import('@portfolio/legal').then(m => m.legalRoutes),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
