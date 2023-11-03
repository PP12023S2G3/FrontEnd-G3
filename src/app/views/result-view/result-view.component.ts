import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { Doctor } from 'src/app/models/Doctor';
import { ResultcDTO } from 'src/app/models/Dtos/ResultDTO';
import { ResultService } from 'src/app/services/result/result.service';



@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css']
})
export class ResultViewComponent implements OnInit {
  buttonTextLabel1 !: string;
  buttonTextLabel2 !: string;
  buttonsCases: boolean = true;
  buttonDownload : boolean = true;
  buttonNo : boolean = false;
  buttonYes : boolean = false;

  doctor !: any;
  diagnostic!: any;
  responseData: any;

  tituloDinamico = 'Resultado';
  formattedDate: any; 



  constructor(private resultDTO: ResultcDTO,private resultService: ResultService) {
  }


  ngOnInit(): void {
    const idResult = localStorage.getItem('idResult');
    const roleId = localStorage.getItem('role');

    if (idResult&&roleId) {
      // Realizar la llamada a tu servicio aquí, por ejemplo:
        this.resultService.getRecord(parseInt(idResult),roleId).subscribe({
        next: (res) => {
           // la respuesta de aca contiene todo lo necesario para mostrar en resultado
          console.log(res);
        },
        error: (error) => {
          // Manejar errores aquí
        }
      });
    }
    this.diagnostic = new Diagnostic();
    this.diagnostic.sectionBody = "Riñon";
    this.doctor = new Doctor();

    this.changeLabelCases();
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

  disableButton(buttonDisable: number) {
    if (buttonDisable === 1) {
      this.buttonDownload = false; //habilitar
      this.buttonsCases = true; //deshabilitar
    } else {
      this.buttonDownload = true; //deshabilitar
      this.buttonsCases = false; //habilitar
    }
  }  

  changeLabelCases() {
    switch (this.diagnostic.sectionBody) {
      case 'Cerebro':
        this.buttonTextLabel1 = 'Hematoma';
        this.buttonTextLabel2 = 'Otro';
        break;
      case 'Pulmones':
        this.buttonTextLabel1 = 'Neumonía';
        this.buttonTextLabel2 = 'Otro';
        break;
      case 'Corazon':
        this.buttonTextLabel1 = 'Ritmia';
        this.buttonTextLabel2 = 'Otro';
        break;
      case 'Riñon':
        this.buttonTextLabel1 = 'Infeccion urinaria';
        this.buttonTextLabel2 = 'Otro';
        break;
      case 'Rodilla':
        this.buttonTextLabel1 = 'Artritis';
        this.buttonTextLabel2 = 'Otro';
        break;
      case 'Muñeca':
        this.buttonTextLabel1 = 'Quebradura';
        this.buttonTextLabel2 = 'Otro';
        break;
      default:
        this.buttonTextLabel1 = 'Botón 1';
        this.buttonTextLabel2 = 'Botón 2';
        break;
    }

  }

  enableButtonDownload(){
    this.buttonDownload = false; //habilitar
  }

}
