import { Component } from '@angular/core';
import { LogoutService } from './logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  esVisible: boolean = true;

  constructor(private logoutService: LogoutService) {
    this.logoutService.getLogoutVisible().subscribe(() => {
      this.esVisible = false;
    });
  }

  updateSharedValue() {
    this.logoutService.updateLogoutVisible(false);
  }

  clearSession() {
    this.logoutService.clearLocalStorage();
  }

}
