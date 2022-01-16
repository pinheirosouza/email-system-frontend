import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const logged = this.authService.isLogged();

    if (logged) {
      this.router.navigate([''], { queryParams: route.queryParams });
    }

    return true;
  }
}
