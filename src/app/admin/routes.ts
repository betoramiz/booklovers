import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';
import { loadNotificationsResolver } from './notifications/resolvers/load-notifications.resolver';

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
        loadComponent: () => import('./notifications/notifications.component'),
        resolve: { loadNotificationsResolver: loadNotificationsResolver }
      },
      {
        path: 'reviews',
        loadComponent: () => import('./reviews/reviews.component')
      }
    ]
  }
];

export default routes;
