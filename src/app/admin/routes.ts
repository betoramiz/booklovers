import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () => import('./admin.component'),
    children: [
      {
        path: 'events',
        loadChildren: () => import('./events/routes')
      },
      {
        path: 'notifications',
        loadComponent: () => import('./notifications/notifications.component')
      }
    ]
  }
];

export default routes;
