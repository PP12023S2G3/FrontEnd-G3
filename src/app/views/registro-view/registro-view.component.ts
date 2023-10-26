import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';

@Component({
  selector: 'app-registro-view',
  templateUrl: './registro-view.component.html',
  styleUrls: ['./registro-view.component.css']
})
export class RegistroComponent {
  medicalSpeciality: { label: string; value: string }[] | undefined;
  user!: User;

  constructor(private userAccountService: UserAccountService) {
    this.medicalSpeciality = [
      { label: 'Neurólogo', value: 'Neurólogo' },
      { label: 'Cardiólogo', value: 'Cardiólogo' },
      { label: 'Neumonólogo', value: 'Neumonólogo' }
    ];

    this.user = new User();

  }

  registrarse(){
    this.userAccountService.getDoctors().subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('docs', JSON.stringify(res));
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });

    console.log("Registrado");
    this.postSignIn();
  }

  private postSignIn() {
    const req=this.createRequestSignIn("maasdsu","fedacscu","dffcu","sfdnu","fsdnu",1,3,"mansu");

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

  }
}
