import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserAccountService } from '../services/userAccount/userAccount.service';
import { LogInRequest } from '../models/LogInRequest';
import { Persona } from '../models/Persona';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  persona!: Persona;
  showPassword: boolean = false;
  private router: Router;

  constructor(private userAccountService: UserAccountService,router: Router) { this.router = router }

  ngOnInit(): void {
    this.persona = new Persona();
    this.userAccountService.getDoctors().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit(){

  }

  irAResetPassword(){

  }
  /*mostrarInfo() {
    console.log("Usuario dni: " + this.persona.dni + " Usuario clave: " + this.persona.clave);
  }*/

  /*onSubmit() {
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
            this.postLogIn();
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
    return /^\d{7,8}$/.test(dni);
  }

  validarContraseña(contraseña: string): boolean {
    // Validar la contraseña
    return /^(?=.*[A-ZñÑ])(?=.*\d)[A-Za-zñÑ\d]{8,}$/.test(contraseña);
  }

  irAResetPassword() {
    // Navegar a la página resetPassword
    this.router.navigate(['/resetPassword']);
    localStorage.setItem('newPassword', 'Contrasea321');
  } */

  private postLogIn() {
    const req=new LogInRequest("43898021","farias123");

    this.userAccountService.postLogIn(req).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('sign', JSON.stringify(res));
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });
  }

}

