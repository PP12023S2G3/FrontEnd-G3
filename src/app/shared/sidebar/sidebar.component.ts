import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
 sidebarVisible: boolean = false;
 private router: Router;
 constructor(router: Router) { this.router = router }

}
