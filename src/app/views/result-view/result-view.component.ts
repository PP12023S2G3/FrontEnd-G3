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
  buttonText1 !: string;
  buttonText2 !: string;
  botonesHabilitados: boolean = false;
  doctor !: any;
  diagnostic!: any;
  responseData: any;

  tituloDinamico = 'Resultado';
  formattedDate: any;

  

  constructor(private resultDTO: ResultcDTO) {
  }


  ngOnInit(): void {
    this.diagnostic = new Diagnostic();
    this.diagnostic.sectionBody = "Cerebro";
    this.doctor = new Doctor();
    this.buttonCase();
    /*    this.diagnostic = this.resultDTO.getCompanyInformation();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        this.formattedDate = this.diagnostic.dateOfBirth.toLocaleDateString('es-ES', options); // Puedes cambiar 'es-ES' según tu preferencia de idioma
        console.log(this.formattedDate);
        console.log(this.diagnostic);
  
      const storedResponseData = localStorage.getItem('responseData');
      if (storedResponseData) {
        this.responseData = JSON.parse(storedResponseData);
        // Haz algo con los datos recibidos
        console.log(this.responseData);
      } */
  }


  buttonEnabled() {
    this.botonesHabilitados = true;
    
  }
  buttonCase() {
    switch (this.diagnostic.sectionBody) {
      case 'Cerebro':
        this.buttonText1 = 'Hematoma';
        this.buttonText2 = 'Otro';
        break;
      case 'Pulmones':
        this.buttonText1 = 'Neumonía';
        this.buttonText2 = 'Otro';
        break;
      case 'Corazon':
        this.buttonText1 = 'Ritmia';
        this.buttonText2 = 'Otro';
        break;
      case 'Riñon':
        this.buttonText1 = 'Infeccion urinaria';
        this.buttonText2 = 'Otro';
        break;
      case 'Rodilla':
        this.buttonText1 = 'Artritis';
        this.buttonText2 = 'Otro';
        break;
      case 'Muñeca':
        this.buttonText1 = 'Quebradura';
        this.buttonText2 = 'Otro';
        break;
      default:
        this.buttonText1 = 'Botón 1';
        this.buttonText2 = 'Botón 2';
        break;
    }
    
  }

}
