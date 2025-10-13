import { Routes } from '@angular/router';
import { notificationDetailResolver } from './resolvers/notification-detail.resolver';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./notifications.component')
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail.component'),
    resolve: { notification: notificationDetailResolver }
  }
];

export default routes;
