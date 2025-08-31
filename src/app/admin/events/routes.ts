import { Route } from '@angular/router';

const routes: Route[] = [
  {
    path: '', redirectTo: 'events', pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./events.component')
  },
  {
    path: 'create',
    loadComponent: () => import('./create-edit.component')
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./create-edit.component')
  }
];

export default routes;
