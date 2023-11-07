import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { DiagnosticResp } from 'src/app/models/DiagnosticResp';
import { Doctor } from 'src/app/models/Doctor';
import { ResultcDTO } from 'src/app/models/Dtos/ResultDTO';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ResultService } from 'src/app/services/result/result.service';



@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css'],
  providers: [MessageService]
})

export class ResultViewComponent implements OnInit {
  textComment: string = '';
  buttonsCases: boolean = true;
  buttonDownload: boolean = true;
  buttonNo: boolean = false;
  buttonYes: boolean = false;

  doctor !: any;
  diagnostic!: any;
  responseData: any;

  tituloDinamico = 'Resultado';
  formattedDate: any;
  result: DiagnosticResp | any;

  datos_paciente: any;
  resultado: any;
  resultadoList: { key: string, value: any }[] = [];

  labelModels: { [key: string]: string[] } = {
    Cerebro: ['Glioma', 'Meningioma', 'Pituitary', 'No tumor'],
    Corazón: ['Contracción ventricular prematura', 'Fusión de latido ventricular y normal', 'Infarto de miocardio', 'Latido no clasificable', 'Latido normal', 'Latido prematuro supraventricular'],
    Rodilla: ['Rotura LCA', 'LCA Sano'],
    Muñeca: ['Fractura', 'Sin fractura'],
    Pulmones: ['Neumonía', 'No neumonía'],
    Riñon: ['Quistes', 'Cálculos', 'Tumor', 'Normal'],
  };
  datosComplementarios: any;
  datosComplementariosList: { key: string; value: any; }[] = [];


  constructor(private resultDTO: ResultcDTO,private messageService: MessageService, private resultService: ResultService, private feedbackService: FeedbackService) {
  }


  ngOnInit(): void {
    //318 319
  /*  this.feedbackService.postFeedbackBrain(318, true, true, true, true, "comentario").subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error: { message: any }) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
          life: 2000,
        });
      }
    });
    // Para el método postFeedbackWrist
    //315 323
    this.feedbackService.postFeedbackWrist(315, false, true, "comentario").subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error: { message: any }) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
          life: 2000,
        });
      }
    });

    //314 320
    this.feedbackService.postFeedbackLungs(320, true, true, "comentario").subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error: { message: any }) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
          life: 2000,
        });
      }
    });

    //316 321
    this.feedbackService.postFeedbackKidney(321, true, true, true, true, "comentario").subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error: { message: any }) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
          life: 2000,
        });
      }
    });
    //324 325
    this.feedbackService.postFeedbackKnee(325, false, true, "comentario").subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error: { message: any }) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
          life: 2000,
        });
      }
    });
    // Para el método postFeedbackHeart
    //317 322
    this.feedbackService.postFeedbackHeart(322, false, false, false, false, false, true, "comentario").subscribe({
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
      this.resultService.getRecord(parseInt(idResult), roleId).subscribe({
        next: (res) => {
          this.setValueResultDiagnostic(res);
        },
        error: (error: { message: any }) => {
          this.messageService.add({
            severity: 'error',
            summary: error.message,
            life: 2000,
          });
        }
      });
    } */

    this.diagnostic = new Diagnostic();
    this.diagnostic.sectionBody = "Cerebro";
    this.doctor = new Doctor();
  


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

  private setValueResultDiagnostic(res: DiagnosticResp) {
    this.result = res;
    if (this.result.nombre_medico === null) {
      this.result.nombre_medico = '';
    }
    this.datos_paciente = JSON.parse(this.result.datos_paciente);
    this.resultado = JSON.parse(this.result.resultado);
    this.datosComplementarios = JSON.parse(this.result.datos_complementarios);
    this.resultadoList = Object.entries(this.resultado).map(([key, value]) => ({ key, value }));
    this.datosComplementariosList = Object.entries(this.datosComplementarios).map(([key, value]) => ({ key, value }));
  }
  enableButtonDownload(label: string) {
    console.log("Botón clicado:", label);
    this.buttonDownload = false; //habilitar
    console.log("EStoy llamando");
  }
  generateButtons() {
    const labels = this.labelModels[this.diagnostic.sectionBody] || [];
    const buttons = [];

    for (let i = 0; i < labels.length; i++) {

      buttons.push({ label: labels[i] });
    }

    return buttons;
  }

  inputEnableButtonDownload() {
    if(this.textComment.length > 2){
      this.buttonDownload = false;
    }else{
      this.buttonDownload = true;
    }
  }


  disableButtonYes() {
    this.buttonDownload = false;
    this.buttonsCases = true; //deshabilitar
  }

  disableButtonNo() {
    this.buttonDownload = true;
    this.buttonsCases = false; //habilitar

  }

  getHighestKeyValue(): { key: string, value: any } {
    let highestValue: any = null;
    let highestKeyValue: { key: string, value: any } = { key: '', value: null };
    console.log(this.resultadoList)
    for (const item of this.resultadoList) {
      if (highestValue === null || item.value > highestValue) {
        highestValue = item.value;
        highestKeyValue = { key: item.key, value: item.value };
      }
    }

    return highestKeyValue;
  }

}
