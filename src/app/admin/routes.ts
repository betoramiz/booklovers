import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () => import('./admin.component'),
    children: [
      {
        path: 'events',
        loadChildren: () => import('./events/routes'),
        canActivate: [authGuard],
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notifications/routes')
      },
      {
        path: 'reviews',
        loadChildren: () => import('./reviews/routes')
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/routes')
      }
    ]
  }
];

export default routes;
