import { Component } from '@angular/core';
import { LogoutService } from './logout.service';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  esVisible: boolean = true;

  constructor(private logoutService: LogoutService, private userService: UserAccountService) {
    this.logoutService.getLogoutVisible().subscribe(() => {
      this.esVisible = false;
    });
  }

  updateSharedValue() {
    this.logoutService.updateLogoutVisible(false);
  }

  clearSession() {
    this.userService.clearLocalStorage();
  }

}
