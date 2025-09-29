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
        loadComponent: () => import('./notifications/notifications.component')
      },
      {
        path: 'reviews',
        loadComponent: () => import('./reviews/reviews.component')
      }
    ]
  }
];

export default routes;
