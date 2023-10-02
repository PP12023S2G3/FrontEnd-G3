import { Component, OnInit } from '@angular/core';
import { Persona } from './Persona';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  persona: Persona = new Persona("", "");

  ngOnInit(): void {
    this.persona.dni = "";
    this.persona.clave = "";
  }

  /*mostrarInfo() {
    console.log("Usuario dni: " + this.persona.dni + " Usuario clave: " + this.persona.clave);
  }*/

  onSubmit() {
    console.log("ENTRO AL ONSUBMIT");
    // Validar el DNI y la contraseña aquí
    if (!this.validarDNI(this.persona.dni)) {
      alert('El DNI no es válido');
      return;
    }

    if (!this.validarContraseña(this.persona.clave)) {
      alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y ser alfanumérica.');
      return;
    }
    
    console.log("Usuario dni: " + this.persona.dni + " Usuario clave: " + this.persona.clave);
    // Resto del código para enviar la solicitud de inicio de sesión al servidor
  }

  validarDNI(dni: string): boolean {
    // validar el DNI
    return /^\d{8}$/.test(dni);
  }

  validarContraseña(contraseña: string): boolean {
      // Validar la contraseña
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(contraseña);
  }
}

