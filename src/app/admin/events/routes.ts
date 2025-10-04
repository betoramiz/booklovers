import { Route } from '@angular/router';
import { loadEventResolver } from './resolvers/load-event.resolver';

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
    loadComponent: () => import('./create-edit.component'),
    data: { editMode: true },
    resolve: { loadedEvents: loadEventResolver }
  }
];

export default routes;
