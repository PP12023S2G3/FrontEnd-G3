import { Component, OnInit } from '@angular/core';
import { Persona } from './Persona';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  persona: Persona = new Persona("", "");
  showPassword: boolean = false;
  private router: Router;
  constructor(router: Router) { this.router = router }

  ngOnInit(): void {
    this.persona.dni = "";
    this.persona.clave = "";
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
    if(this.validarDNI(this.persona.dni) && this.validarContraseña(this.persona.clave)) {
      // Valores de usuario y contraseña hardcodeados (solo para demostración)
    const dniHardcodeado = "12345678";
    const contraseñaHardcodeada = "Contrasea123";
    console.log(localStorage.getItem('newPassword'))
      if(localStorage.getItem('newPassword')==null){
          if (this.persona.dni === dniHardcodeado && this.persona.clave === contraseñaHardcodeada) {
            this.router.navigate(['/diagnostico']);
          }
            else {
            alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
          }
      }
      else if (this.persona.dni === dniHardcodeado && this.persona.clave === localStorage.getItem('newPassword') ) {
        this.router.navigate(['/diagnostico']);
      }
        else {
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    }

    console.log("Usuario dni: " + this.persona.dni + " Usuario clave: " + this.persona.clave);
  }

  validarDNI(dni: string): boolean {
    // validar el DNI
    return /^\d{8}$/.test(dni);
  }

  validarContraseña(contraseña: string): boolean {
      // Validar la contraseña
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(contraseña);
  }

  irAResetPassword() {
    // Navegar a la página resetPassword
    this.router.navigate(['/resetPassword']);
    localStorage.setItem('newPassword', 'Contrasea321');
  }
}

