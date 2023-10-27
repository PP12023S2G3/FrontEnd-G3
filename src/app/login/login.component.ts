import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/Persona';
import { Router } from '@angular/router';
import { UserAccountService } from '../services/userAccount/userAccount.service';
import { LogInRequest } from '../models/LogInRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  persona: Persona = new Persona("", "");
  showPassword: boolean = false;
  private router: Router;

  constructor(private userAccountService: UserAccountService,router: Router) { this.router = router }

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
    // Validar el DNI y la contraseña aquí
    if (/*!this.persona.dni ||*/ !this.validarDNI(this.persona.dni)) {
      alert('El DNI no es válido');
      return;
    }
    if (/*!this.persona.clave ||*/ !this.validarContraseña(this.persona.clave)) {
      alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y ser alfanumérica.');
      return;
    }
    if(!this.validarDNI(this.persona.dni) && !this.validarContraseña(this.persona.clave)) {
      alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      return;
    }
    else {
      console.log("Usuario dni: " + this.persona.dni + " Usuario clave: " + this.persona.clave);
      this.postLogIn()
    }
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
  }

  noAutorizado() {
    console.error('Acceso no autorizado. Por favor, verifica los datos.');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  

  private postLogIn() {
    const req=new LogInRequest(this.persona.dni,this.persona.clave);

    this.userAccountService.postLogIn(req).subscribe({
      /*next: (res) => {
        console.log(res);
        localStorage.setItem('sign', JSON.stringify(res));
      },
      error: (error) => {
        // Manejar errores aquí
      }*/
      next: (res) => {
        if (res) {
          if (res.token) {
            localStorage.setItem('token', res.token);
            console.log('Acceso autorizado con token.');
            this.router.navigate(['/diagnostico']);
          } else {
            // Respuesta sin token (código de estado 200)
            console.log('Acceso autorizado sin token.');
            this.router.navigate(['/diagnostico']);
          }
        } else {
          console.log('El servidor no proporcionó una respuesta válida.');
          this.noAutorizado();
        }
      },
      error: (error) => {
        if (error.status === 401 || error.status === 404) {
          this.noAutorizado();
        } else {
          console.error('Error en el inicio de sesión:', error);
        }
      }
      
    });
  }

}

