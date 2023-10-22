import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { Doctor } from 'src/app/models/Doctor';

@Component({
  selector: 'app-diagnostic-view',
  templateUrl: './diagnostic-view.component.html',
  styleUrls: ['./diagnostic-view.component.css']
})
export class DiagnosticViewComponent implements OnInit {
  doctor!: Doctor;
  diagnostic!: Diagnostic;

  constructor () {
  
  }
  ngOnInit(): void {
    this.diagnostic = new Diagnostic();
    this.doctor = new Doctor();
  }



  tituloDinamico = 'Diagnostico';
    cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }
}

