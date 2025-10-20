import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./settings.component')
  },
  {
    path: 'members',
    loadComponent: () => import('./members.component')
  },
];

export default routes;
