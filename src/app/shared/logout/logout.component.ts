import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  visible : boolean = true; //cambiar

  ocultarLogout() {
    this.visible = false;
  }
  mostrarLogout() {
    this.visible = true;
  }
}
