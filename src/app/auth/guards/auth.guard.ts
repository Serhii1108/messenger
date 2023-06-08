import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(private authService: AuthService, public router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const path: string | undefined = route.routeConfig?.path;

    if (route.routeConfig?.path === '') {
      return true;
    }

    if (
      (path?.includes('login') || path?.includes('sign-up')) &&
      this.authService.isUserAuthorized
    ) {
      this.router.navigateByUrl('/chat');
      return true;
    }

    if (
      !this.authService.isUserAuthorized &&
      !path?.includes('login') &&
      !path?.includes('sign-up')
    ) {
      this.router.navigateByUrl('/auth/login');
      return true;
    }
    return true;
  }
}
