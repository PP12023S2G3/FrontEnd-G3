import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';
import {MessageService} from 'primeng/api';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-registro-view',
  templateUrl: './registro-view.component.html',
  styleUrls: ['./registro-view.component.css'],
  providers: [MessageService],
})
export class RegistroComponent {
  medicalSpeciality?: { label: string; value: string }[] | undefined;
  user!: User;
  form = false;

  constructor(private userAccountService: UserAccountService,private messageService: MessageService) {
    this.medicalSpeciality = [
      { label: 'Neurólogo', value: 'Neurólogo' },
      { label: 'Cardiólogo', value: 'Cardiólogo' },
      { label: 'Neumonólogo', value: 'Neumonólogo' },
      { label: 'Kinesiólogo', value: 'Kinesiólogo' },
      { label: 'Tec. Imágenes', value: 'Tec. Imágenes' },
      { label: 'Jefe de Área', value: 'Jefe de Área' },
      { label: 'Auditor', value: 'Auditor' },
    ];

    this.user = new User();
  }

  registrarse(){
    /*this.userAccountService.getDoctors().subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('docs', JSON.stringify(res));
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });*/



    this.postSignIn();
    console.log("Registrado");
  }

  private postSignIn() {
    //const req=this.createRequestSignIn("maasdsu","fedacscu","dffcu","sfdnu","fsdnu",1,3,"mansu");

    const especialidad = this.user.medicalSpeciality ? this.user.medicalSpeciality.value : '';
    let rolId: number;

    if (especialidad === 'Neurólogo' ||
    especialidad === 'Cardiólogo' ||
    especialidad === 'Neumonólogo' ||
    especialidad === 'Kinesiólogo') {
      rolId = 4;
    }
    else if (especialidad === 'Auditor' ||
    especialidad === 'Jefe de Área') {
      rolId = 1;
    }
    else{
      rolId = 3;
    }

    // Momentáneamente se permiten vacíos hasta que estén las validaciones!
    const req = this.createRequestSignIn(
      this.user.name || '',
      this.user.lastName || '',
      this.user.dni || '',
      this.user.email || '',
      this.user.password || '',
      rolId,
      3,
      especialidad,
    );

    if(this.user.name!=undefined && this.user.lastName!=undefined && this.user.email!=undefined &&
      this.user.dni!=undefined && this.user.password!=undefined && especialidad !=undefined) {
     this.isDataIndalid();
      if(!this.form){

      this.userAccountService.postSignIn(req).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('sign', JSON.stringify(res));
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });
  }
  else {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Datos erroneos por favor corregir',
      life: 2000,
    });
  }
  }
  else {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Completa todos los campos del formulario antes de continuar',
      life: 2000,
    });
  }
}

 isDataIndalid() {
  if (
    (!this.user.name || this.user.name.length < 2) &&
    (!this.user.lastName || this.user.lastName.length < 2) &&
    (!this.user.dni || this.user.dni.length < 1000000 || this.user.dni.length > 99999999) &&
    (!this.user.password || this.user.password.length < 8) &&
    (!this.user.email || this.user.email.length < 4)
  ) {
    this.form = true;
  }
  else {
    this.form=false;
  }
 }

  private createRequestSignIn(nombre: string, apellido: string, dni: string, email: string, password: string, rolId: number, establecimientoId: number | undefined, especialidad: string) :FormData {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('dni', dni);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('rol_id', `${rolId}`);
    if (establecimientoId !== undefined) {
        formData.append('establecimiento_id', `${establecimientoId}`);
    }
    formData.append('especialidad', especialidad);
    return formData;
  }


  OnSelectedMedicalSpeciality(event : any) {
    this.user.medicalSpeciality = event.value;
  }
}
