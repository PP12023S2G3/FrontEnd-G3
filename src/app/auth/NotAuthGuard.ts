
import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn, CanActivateChildFn } from '@angular/router';
import { Observable, catchError, map, of, switchMap, take } from 'rxjs';
import { Role } from 'src/app/models/roles';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';


@Injectable({
  providedIn: 'root'
})


export class NotAuthGuard {

  constructor(private authService: UserAccountService, private router: Router) {}

canActivate: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const allowedRoles = next.data['allowedRoles'] as Role[];

  return this.authService.user$.pipe(
    switchMap(user => {
      console.log(user);
      if (!user) {
        return of(this.router.createUrlTree(['/']));

      }else{
        return of(this.router.createUrlTree(['/Diagnostico']));
      }
    })
  );
};

canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => this.canActivate(route, state);
}
