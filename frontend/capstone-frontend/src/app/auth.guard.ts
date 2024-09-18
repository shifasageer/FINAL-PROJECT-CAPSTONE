import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwtToken');

  if (token) {
    return true; // Allow access if the user is authenticated
  } else {
    // Redirect to the signup page if not authenticated
    router.navigate(['/signup']);
    return false; // Block access to the route
  }
};
