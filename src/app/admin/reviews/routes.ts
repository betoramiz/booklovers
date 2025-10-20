import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reviews.component')
  },
  {
    path: 'list/:bookId',
    loadComponent: () => import('./list.component')
  },
  {
    path: 'create',
    loadComponent: () => import('./create-edit.component')
  }
];

export default routes;
