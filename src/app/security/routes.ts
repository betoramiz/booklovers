import { Routes } from '@angular/router';
import { noAuthGuard } from '../shared/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component'),
    canActivate: [noAuthGuard]
  }
];

export default routes;
