import { Routes } from '@angular/router';
import { eventResolver } from './resolvers/event.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./pages.component'),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home.component')
      },
      {
        path: 'events',
        loadComponent: () => import('./events.component'),
        resolve: {
          events: eventResolver
        }
      },
      {
        path: 'notifications',
        loadComponent: () => import('./notifications.component')
      }
    ]
  },
];

export default routes;
