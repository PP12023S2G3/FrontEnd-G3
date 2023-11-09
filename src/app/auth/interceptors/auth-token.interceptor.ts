import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { first, Observable, switchMap } from 'rxjs';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private authService: UserAccountService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        return this.authService.isLoggedIn$.pipe(
          first(),
          switchMap((isLoggedIn) => {
            if (isLoggedIn === false) {
              return next.handle(req);
            }

            return this.authService.user$.pipe(
              first(Boolean),
              switchMap(({ token }) => {
                const headers = req.headers.append(
                  'Authorization',
                  `Bearer ${token}`
                );
                return next.handle(req.clone({ headers }));
              })
            );
          })
        );
      }
    }

  export const authTokeninterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true,
  };
