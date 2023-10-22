import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { Doctor } from 'src/app/models/Doctor';



@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css']
})
export class ResultViewComponent implements OnInit {
  doctor !: Doctor;
  diagnostic!: Diagnostic;
  responseData: any;

  tituloDinamico = 'Resultado';
    cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }

  constructor() {
  }


  ngOnInit(): void {
      this.diagnostic = new Diagnostic();
      this.doctor = new Doctor();
      

    const storedResponseData = localStorage.getItem('responseData');
    if (storedResponseData) {
      this.responseData = JSON.parse(storedResponseData);
      // Haz algo con los datos recibidos
      console.log(this.responseData);
    }
  }
}
