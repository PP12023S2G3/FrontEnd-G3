// auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn, CanActivateChildFn } from '@angular/router';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Role } from 'src/app/models/roles';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';


@Injectable({
  providedIn: 'root'
})
 /*
export class AuthGuard  implements CanActivateFn {

 constructor(private authService: UserAccountService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
    const allowedRoles = next.data['allowedRoles'] as Role[];

    return this.authService.user$.pipe(
      switchMap(user => {

        if (user && allowedRoles.includes(user.role as Role)) {
          return of(true);

        }else{

        return of(this.router.createUrlTree(['/login']));
        }

      })
    );
  }
}*/
export class AuthGuard {

  constructor(private authService: UserAccountService, private router: Router) {}

canActivate: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const allowedRoles = next.data['allowedRoles'] as Role[];

  return this.authService.user$.pipe(
    switchMap(user => {
      console.log(user);
      if (user && allowedRoles.includes(user.role as Role)) {
        return of(true);

      }else{

      return of(this.router.createUrlTree(['/login']));
      }

    })
  );
};

canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => this.canActivate(route, state);
}
