// logout-modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LogoutService {
  private logoutState = new BehaviorSubject<boolean>(false);

  get logoutState$(): Observable<boolean> {
    return this.logoutState.asObservable();
  }

  mostrarLogout() {
    this.logoutState.next(true);
  }

  ocultarLogout() {
    this.logoutState.next(false);
  }
}
