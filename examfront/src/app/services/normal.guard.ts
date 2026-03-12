import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const normalGuard: CanActivateFn = (route, state) => {

  const login = inject(LoginService);
  const router = inject(Router);

  if (login.isLoggedIn() && login.getUserRole() == 'NORMAL') {
    return true;
  }

  router.navigate(['login']);
  return false;
};
