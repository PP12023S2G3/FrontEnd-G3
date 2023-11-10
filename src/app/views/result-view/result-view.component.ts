import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { DiagnosticResp } from 'src/app/models/DiagnosticResp';
import { Doctor } from 'src/app/models/Doctor';
import { ResultcDTO } from 'src/app/models/Dtos/ResultDTO';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ResultService } from 'src/app/services/result/result.service';
import { MessageService } from 'primeng/api';
import { forEach } from 'jszip';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css'],
  providers: [MessageService]
})

export class ResultViewComponent implements OnInit {
  textComment: string = '';
  containerMoreOptions: boolean = true;
  buttonsCases: boolean = false;
  buttonSubmitFeedback: boolean = true;
  buttonNo: boolean = false;
  buttonYes: boolean = false;
  inputDisable : boolean = false;

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
    Corazon: ['Contracción ventricular prematura', 'Fusión de latido ventricular y normal', 'Infarto de miocardio', 'Latido no clasificable', 'Latido normal', 'Latido prematuro supraventricular'],
    Rodilla: ['Rotura LCA', 'LCA Sano'],
    Muñeca: ['Fractura', 'Sin fractura'],
    Pulmones: ['Neumonía', 'No neumonía'],
    Riñones: ['Quistes', 'Cálculos', 'Tumor', 'Normal'],
  };
  buttonsModels: any[] = [];

  datosComplementarios: any;
  datosComplementariosList: { key: string; value: any; }[] = [];
  imagePath: any

  constructor(private resultDTO: ResultcDTO, private messageService: MessageService, private resultService: ResultService, private feedbackService: FeedbackService) {
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

  */
    const idResult = localStorage.getItem('idResult');
    const roleId = localStorage.getItem('roleId');

    if (idResult && roleId) {
      this.resultService.getRecord(parseInt(idResult), roleId).subscribe({
        next: (res) => {

          this.setValueResultDiagnostic(res);
          if (res.modelo_nombre === "Cerebro" || res.modelo_nombre === "Corazon" || res.modelo_nombre === "Muñeca" || res.modelo_nombre === "Rodilla" || res.modelo_nombre === "Riñones" || res.modelo_nombre === "Pulmones" || res.modelo_nombre === "Pulmon") {
            this.diagnostic.sectionBody = res.modelo_nombre;
            this.buttonsModels = [];
            this.generateButtons();
          }
        },
        error: (error: { message: any }) => {
          this.messageService.add({
            severity: 'error',
            summary: error.message,
            life: 2000,
          });
        }
      });
    }


    this.diagnostic = new Diagnostic();
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
    console.log(this.result);
    this.datos_paciente = JSON.parse(this.result.datos_paciente);
    this.resultado = JSON.parse(this.result.resultado);
    this.datosComplementarios = JSON.parse(this.result.datos_complementarios);
    this.resultadoList = Object.entries(this.resultado).map(([key, value]) => ({ key, value }));
    this.datosComplementariosList = Object.entries(this.datosComplementarios).map(([key, value]) => ({ key, value }));
    this.imagePath = 'data:image/png;base64,' + this.result.imagen;
  }

  armarPDF(res: DiagnosticResp) {
    let fecha = new Date().toLocaleDateString();

    let resultadopdf = 'Diagnóstico\nCódigo de diagnóstico: ' + this.result.id + '                                                  Fecha: ' + fecha + '\n\nDatos del médico: \n';
    let condicionesPrevias = "\n";
    this.datosComplementariosList.map((conPrev) => {
      const newKey = conPrev.key.replaceAll("_", " ");
      condicionesPrevias += "-   " + newKey + ": " + (conPrev.value ? "Si" : "No") + "\n";
    })

    resultadopdf = resultadopdf + 'DNI: ' + this.result.usuario_medico_dni + '\n' +
      'Nombre y apellido: ' + this.result.nombre_medico + '\n\n' +
      'Datos del paciente: \n' +
      'Fecha de nacimiento: ' + this.datos_paciente.fecha_nacimiento + '\n' +
      'Peso: ' + this.datos_paciente.peso + 'kg\n' +
      'Altura: ' + this.datos_paciente.altura + 'cm\n' +
      'Sexo: ' + this.datos_paciente.sexo + '\n' +
      'Sección del cuerpo: ' + this.result.modelo_nombre + '\n' +
      'Condiciones previas: ' + condicionesPrevias;

    return resultadopdf;
  }

  descargarPDF() {
    const doc = new jsPDF();

    //Agregar datos al PDF
    let re = "";
    let val = 0;
    this.resultadoList.map((item: { value: number; key: string; }) => {
      if (item.value > val) {
        if (this.result.modelo_id === 3) {
          const newValue = item.value * 100
          re = item.key +  " " + Math.ceil(newValue) + "%\n";
          val = item.value;
        } else {
          re = item.key +  " " + Math.ceil(item.value) + "%\n";
          val = item.value;
        }
      }
    })

    doc.text(this.armarPDF(this.result), 10, 20);

    const imagen = 'data:image/png;base64,' + this.result.imagen;
    doc.addImage(imagen, 'JPEG', 75, 150, 60, 60);

    const pdfResult = '\nResultado: ' + re;
    doc.text(pdfResult, 10, 230);

    doc.save('Diagnóstico '+ this.result.id +'.pdf')
  }

  enableButtonSubmitFeedback() {
    this.buttonSubmitFeedback = false; //habilitar
    console.log("EStoy llamando");
  }

  selectButton(id: number) {
    for (let i = 0; i < this.buttonsModels.length; i++) {
      if (this.buttonsModels[i].id === id) {
        this.buttonsModels[i].idActivate = false;
        this.enableButtonSubmitFeedback();
        this.inputDisable = true;
      } else {
        this.buttonsModels[i].idActivate = true;

      }
    }

  }

  generateButtons(): void {
    const labels = this.labelModels[this.diagnostic.sectionBody] || [];
    for (let i = 0; i < labels.length; i++) {
      this.buttonsModels.push({ label: labels[i], id: i, idActivate: false });
    }

  }

  inputEnableButtonSubmitFeedback() {
      if(this.inputDisable === false && this.textComment.length > 2){
        for (let i = 0; i < this.buttonsModels.length; i++) {
        this.buttonsModels[i].idActivate = true;
        }
        this.buttonSubmitFeedback = false;
      }else if(this.textComment.length < 2){
        this.buttonSubmitFeedback = true;
      }
  }


  disableButtonYes() {
    this.buttonSubmitFeedback = false;
    this.containerMoreOptions = true; //deshabilitar
  }

  disableButtonNo() {
    this.buttonSubmitFeedback = true;
    this.containerMoreOptions = false; //habilitar
  }

  getHighestKeyValue(): { key: string, value: any } {
    let highestValue: any = null;
    let highestKeyValue: { key: string, value: any } = { key: '', value: null };
    const prediction = this.resultado['prediction'];
    const resultEntries = prediction ? Object.entries(prediction) : Object.entries(this.resultado);

    const keyTranslations: { [key: string]: string } = {
      "LCA sano": 'Ligamento cruzado anterior sano',
      lcaSano: 'Ligamento cruzado anterior sano',
      roturaLCA: 'Rotura de ligamento cruzado anterior',
      normal: 'Normal',
      piedra: 'Piedra',
      quiste: 'Quiste',
      tumor: 'Tumor',
      no_pneumonia: 'No neumonía',
      pneumonia: 'Neumonía',
      fractura: 'Fractura',
      sano: 'Sano',
      glioma: 'Glioma',
      meningioma: 'Meningioma',
      pituitary: 'Pituitaria',
      no_tumor: 'No tumor',
      contraccionVentricular: 'Contraccion ventricular',
      fusionVentricularNormal: 'Fusión ventricular normal',
      infarto: 'Infarto',
      prematuroSupraventricular: 'Prematuro supraventricular',
      no_clasificable: 'No clasificable',
    };

    for (const [key, value] of resultEntries) {
      if (typeof value === 'number' && (highestValue === null || value > highestValue)) {
        highestValue = value;
        const translatedKey = keyTranslations[key] || key;
        highestKeyValue = { key: translatedKey, value };
      }
    }

    if (highestKeyValue.value !== null && highestKeyValue.value >= 0 && highestKeyValue.value <= 1) {
      highestKeyValue.value *= 100;
    }
    return highestKeyValue;
  }

}
