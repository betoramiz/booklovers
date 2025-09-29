import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/routes')
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/routes'),
  },
  {
    path: 'security',
    loadChildren: () => import('./security/routes')
  }
];
