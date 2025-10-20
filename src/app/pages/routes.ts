import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages.component')
  },
  {
    path: 'events',
    loadComponent: () => import('./events.component')
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications.component')
  }
];

export default routes;
