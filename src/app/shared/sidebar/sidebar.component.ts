import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
 sidebarVisible: boolean = false;

 toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
