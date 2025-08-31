import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/routes')
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/routes')
  }
];
