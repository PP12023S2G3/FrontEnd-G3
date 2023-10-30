import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { Router } from '@angular/router';
import { LogoutService } from '../logout/logout.service';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
 sidebarVisible: boolean = false;
 private router: Router;
 esVisible: boolean = false;
 
 constructor(router: Router, private logoutService: LogoutService) { 
  this.router = router
  this.logoutService.getLogoutVisible().subscribe(() => {
    this.esVisible = false;
  });
 }
 updateLogoutVisible() {
  console.log(this.esVisible);
  this.logoutService.updateLogoutVisible(true);
  this.esVisible = true;
}

}

