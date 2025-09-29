import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(!await authService.isAuthenticated()) {
    return router.createUrlTree(['security']);
  }

  return true;
};
