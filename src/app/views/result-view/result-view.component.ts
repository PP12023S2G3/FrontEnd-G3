import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { Doctor } from 'src/app/models/Doctor';
import { ResultcDTO } from 'src/app/models/Dtos/ResultDTO';



@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css']
})
export class ResultViewComponent implements OnInit {
  doctor !: any;
  diagnostic!: any;
  responseData: any;

  tituloDinamico = 'Resultado';
    cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }

  constructor(private resultDTO: ResultcDTO) {
  }


  ngOnInit(): void {
      this.diagnostic = this.resultDTO.getCompanyInformation();


    const storedResponseData = localStorage.getItem('responseData');
    if (storedResponseData) {
      this.responseData = JSON.parse(storedResponseData);
      // Haz algo con los datos recibidos
      console.log(this.responseData);
    }
  }
}
