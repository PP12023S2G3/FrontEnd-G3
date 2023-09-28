import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  toggleSidebar() {
    console.log("abrir sidebar")
    // Implementa la lógica para mostrar/ocultar el sidebar aquí
  }
}
