import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Role } from 'src/app/models/roles';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';



@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanLoad, CanActivate {
    constructor(private authService: UserAccountService) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
      return this.hasRole(route);
    }

    canLoad(route: Route): Observable<boolean> {
      return this.hasRole(route);
    }

    private hasRole(route: Route | ActivatedRouteSnapshot) {
      const allowedRoles = route.data?.['allowedRoles'];

      return this.authService.user$.pipe(
        map((user) => Boolean(user && allowedRoles.includes(user.role))),
        tap((hasRole) => hasRole === false && alert('Acceso Denegado'))
      );
    }
  }

  /*// Only available for v14.2 and above
  export function hasRole(allowedRoles: Role[]) {
    return () =>
      inject(UserAccountService).user$.pipe(
        map((user) => Boolean(user && allowedRoles.includes(user.especialidad))),
        tap((hasRole) => hasRole === false && alert('Acceso Denegado'))
      );
  } */
