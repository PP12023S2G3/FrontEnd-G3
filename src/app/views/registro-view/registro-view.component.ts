import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-registro-view',
  templateUrl: './registro-view.component.html',
  styleUrls: ['./registro-view.component.css']
})
export class RegistroComponent {
  section: 'inicial' | 'final' = 'inicial';
  medicalSpeciality: { label: string; value: string }[] | undefined;
  user!: User;
  showDropdown: boolean = true;

  constructor() {
    this.medicalSpeciality = [
      { label: 'Neurólogo', value: 'Neurólogo' },
      { label: 'Cardiólogo', value: 'Cardiólogo' },
      { label: 'Neumonólogo', value: 'Neumonólogo' }
    ];

    this.user = new User();

  }

  siguienteEtapa() {
    this.section = 'final';
    this.showDropdown = false;
  }

  finalizarRegistro() {
    
  }

  regresarEtapa() {
    this.section = 'inicial';
    this.showDropdown = true;
  }

  OnSelectedMedicalSpeciality(event : any) {

  }
  

}
