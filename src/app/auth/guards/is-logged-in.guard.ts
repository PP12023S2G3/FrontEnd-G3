import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanLoad {
  constructor(private authService: UserAccountService, private router: Router) {}

  canLoad(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn$.pipe(
      map((isLoggedIn) => isLoggedIn || this.router.createUrlTree(['/login']))
    );
  }
}
