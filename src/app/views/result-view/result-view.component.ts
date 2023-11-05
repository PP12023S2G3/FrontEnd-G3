import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { Doctor } from 'src/app/models/Doctor';
import { ResultcDTO } from 'src/app/models/Dtos/ResultDTO';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
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
  buttonDownload: boolean = true;
  buttonNo: boolean = false;
  buttonYes: boolean = false;

  doctor !: any;
  diagnostic!: any;
  responseData: any;

  tituloDinamico = 'Resultado';
  formattedDate: any;

  checkboxState: { [key: string]: boolean } = {};

  checkboxes: { [key: string]: string[] } = {
    Cerebro: ['Pérdida visual', 'Debilidad focal', 'Convulsiones'],
    Pulmón: ['Puntada lateral', 'Fiebre', 'Dificultad respiratoria'],
    Riñón: ['Sangre en orina', 'Dolor en zona lumbar', 'Cansancio'],
  };

  constructor(private resultDTO: ResultcDTO, private resultService: ResultService, private feedbackService: FeedbackService) {
  }


  ngOnInit(): void {
    //ejemplo de como llamar al servicio de feedback
    const reqFeedbackBrain = this.feedbackService.createRequestFeedbackBrain(1, true, true, true, true, "comentario");

    this.feedbackService.postFeedbackBrain(reqFeedbackBrain).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });

    const idResult = localStorage.getItem('idResult');
    const roleId = localStorage.getItem('role');

    if (idResult && roleId) {
      // Realizar la llamada a tu servicio aquí, por ejemplo:
      this.resultService.getRecord(parseInt(idResult), roleId).subscribe({
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
    this.diagnostic.sectionBody = "Riñón";
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
  

// Función para registrar cambios en las opciones seleccionadas y obtener el estado de cada opción
onCheckboxChange( option: string) {
  const opcionesSeleccionadas = this.checkboxState;
    const opcionesPermitidas = this.checkboxes[this.diagnostic.sectionBody];
    const opcionesMostradas = opcionesPermitidas.map(
      (opcion) =>
        `${opcion}=${opcionesSeleccionadas[opcion] ? 'true' : 'false'}`
    );

    console.log(
      'Datos enviados con éxito. Opciones enviadas: ' +
        opcionesMostradas.join(', ')
    );
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
      case 'Corazón':
        this.buttonTextLabel1 = 'Ritmia';
        this.buttonTextLabel2 = 'Otro';
        break;
      case 'Riñón':
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

  enableButtonDownload() {
    this.buttonDownload = false; //habilitar
  }


}
