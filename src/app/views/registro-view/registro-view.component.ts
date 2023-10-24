import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-registro-view',
  templateUrl: './registro-view.component.html',
  styleUrls: ['./registro-view.component.css']
})
export class RegistroComponent {
  medicalSpeciality: { label: string; value: string }[] | undefined;
  user!: User;

  constructor() {
    this.medicalSpeciality = [
      { label: 'Neurólogo', value: 'Neurólogo' },
      { label: 'Cardiólogo', value: 'Cardiólogo' },
      { label: 'Neumonólogo', value: 'Neumonólogo' }
    ];

    this.user = new User();

  }

  registrarse(){
    console.log("Registrado");
  }

  OnSelectedMedicalSpeciality(event : any) {

  }
}
