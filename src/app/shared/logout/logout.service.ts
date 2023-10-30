// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private logoutVisible = new BehaviorSubject<boolean>(true);

  getLogoutVisible(): Observable<boolean> {
    return this.logoutVisible.asObservable();
  }

  updateLogoutVisible(newValue: boolean) {
    this.logoutVisible.next(newValue);
  }

}
