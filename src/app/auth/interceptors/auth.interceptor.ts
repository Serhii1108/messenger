import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { StatusCodes } from 'src/app/shared/constance';
import { LoginResponseModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public isRefreshing = false;

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('i18n')) return next.handle(request);

    const req: HttpRequest<unknown> = this.addAuthToken(request);

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (
          err.status === StatusCodes.Unauthorized &&
          !req.url.includes('auth/login')
        ) {
          const updatedReq: HttpRequest<unknown> | false =
            this.updateAccessToken(req);
          if (updatedReq) {
            this.intercept(updatedReq, next);
          }
        }
        throw err;
      })
    );
  }

  private addAuthToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const tokens: LoginResponseModel | null = this.authService.getTokens();
    if (!tokens?.accessToken) return request;

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  }

  private updateAccessToken(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> | false {
    const savedTokens: LoginResponseModel | null = this.authService.getTokens();

    if (savedTokens?.refreshToken && !this.isRefreshing) {
      this.isRefreshing = true;

      this.authService
        .refreshToken(savedTokens.refreshToken)
        .pipe(
          catchError(() => {
            this.isRefreshing = false;
            this.authService.logout();
            this.router.navigateByUrl('/auth/login');
            return of();
          })
        )
        .subscribe((tokens: LoginResponseModel) => {
          this.isRefreshing = false;
          localStorage.setItem('tokens', JSON.stringify(tokens));

          const req: HttpRequest<unknown> = this.addAuthToken(request);
          return req;
        });
    }

    return false;
  }
}
