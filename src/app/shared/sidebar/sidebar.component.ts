import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { Router } from '@angular/router';
import { LogoutService } from '../logout/logout.service';
import { LogoutComponent } from '../logout/logout.component';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit{
 sidebarVisible: boolean = false;
 private router: Router;
 esVisible: boolean = false;
  sidebarItems!: any[];
  role: any;
  userdata:any;

 constructor(private sideBarServices: SidebarService,router: Router, private logoutService: LogoutService, private authService:UserAccountService ) {

  this.role = this.authService.getCurrentUser()?.role;
  this.userdata = this.authService.userData;
  const selectedMenu = localStorage.getItem('selectedMenu');

  if (selectedMenu) {
    this.sidebarItems = JSON.parse(selectedMenu);
  } else {
    this.sidebarItems = this.sideBarServices.menuAuditor;
  }

  this.router = router;

  this.logoutService.getLogoutVisible().subscribe(() => {
    this.esVisible = false;
  });

 }
  ngOnInit(): void {


  }

 updateLogoutVisible() {
  console.log(this.esVisible);
  this.logoutService.updateLogoutVisible(true);
  this.esVisible = true;
}

getMenuItemsForRole(role: string): any {
  if (role === 'Auditor') {
    this.sidebarItems = this.sideBarServices.menuAuditor;
  } else if (role === 'Medico') {
    this.sidebarItems = this.sideBarServices.menuMedico;
  } else if (role === 'ProfDelaSalud') {
    this.sidebarItems = this.sideBarServices.menuProfDelaSalud;
  }

  // Guarda la selección de menú en el almacenamiento local
  localStorage.setItem('selectedMenu', JSON.stringify(this.sidebarItems));

  return this.sidebarItems;
}

}

