import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/Persona';
import { Router } from '@angular/router';
import { UserAccountService } from '../services/userAccount/userAccount.service';
import { LogInRequest } from '../models/LogInRequest';
import {MessageService} from 'primeng/api';
import { LoaderService } from '../shared/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  persona: Persona = new Persona("", "");
  showPassword: boolean = false;
  private router: Router;
  formFieldsCompleted =false;
  form!: boolean;

  constructor(private userAccountService: UserAccountService,router: Router,private messageService: MessageService, private loaderService: LoaderService) { this.router = router }

  ngOnInit(): void {
    this.persona.dni = "";
    this.persona.clave = "";
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.checkFormFields();
    console.log(this.formFieldsCompleted);
    if(!this.formFieldsCompleted){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Completa todos los campos del formulario antes de continuar',
        life: 2000,
      });
      console.log("Usuario dni: " + this.persona.dni + " Usuario clave: " + this.persona.clave);
    }
    else {
      this.loaderService.updateIsLoading(true);
      this.postLogIn()
    }
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
  
  checkFormFields() {
    if (this.persona.dni != undefined && this.persona.clave != undefined && this.persona.dni != '' && this.persona.clave!='') {
      this.formFieldsCompleted = true;
    } else {
      this.formFieldsCompleted = false;
    }
  }

  private postLogIn() {
    const req=new LogInRequest(this.persona.dni,this.persona.clave);
    this.userAccountService.postLogIn(req).subscribe({
      next: (res) => {
          this.userAccountService.saveDataInLocalStorage(res);
          this.loaderService.updateIsLoading(false);
          const userRoleId = res.rol_id;
      this.redirectBasedOnUserRoleId(userRoleId);
      },
      error: (error: { message: any }) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
          life: 2000,
        });
        this.loaderService.updateIsLoading(false);
      }
    });
  }

  private redirectBasedOnUserRoleId(userRoleId: number) {
    switch (userRoleId) {
      case 1:
      case 3:
        this.router.navigate(['/diagnostico']);
        break;
      case 4:
        this.router.navigate(['/historial']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }
}

