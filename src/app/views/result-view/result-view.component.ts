import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { DiagnosticResp } from 'src/app/models/DiagnosticResp';
import { Doctor } from 'src/app/models/Doctor';
import { ResultcDTO } from 'src/app/models/Dtos/ResultDTO';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ResultService } from 'src/app/services/result/result.service';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/shared/loader/loader.service';
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
    Cerebro: ['Glioma', 'Meningioma', 'Pituitaria', 'No tumor'],
    Corazon: ['Contracción ventricular prematura', 
              'Fusión de latido ventricular y normal', 'Infarto de miocardio', 
              'Latido no clasificable', 'Latido normal', 'Latido prematuro supraventricular'],
    Rodilla: ['LCA Sano', 'Rotura LCA'],
    Muñeca: ['Fractura', 'Sano'],
    Pulmones: ['Neumonía', 'No neumonía'],
    Riñones: ['Quiste', 'Piedra', 'Tumor', 'Normal'],
  };
  buttonsModels: any[] = [];
  datosComplementarios: any;
  datosComplementariosList: { key: string; value: any; }[] = [];
  imagePath: any


  constructor(private loaderService: LoaderService, private resultDTO: ResultcDTO, private messageService: MessageService, private resultService: ResultService, private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loaderService.updateIsLoading(true);

    const idResult = localStorage.getItem('idResult');
    const roleId = localStorage.getItem('roleId');

    if (idResult && roleId) {
      this.resultService.getRecord(parseInt(idResult), roleId).subscribe({
        next: (res) => {
          this.setValueResultDiagnostic(res);
          if (res.modelo_nombre === "Cerebro" || res.modelo_nombre === "Corazon" || 
              res.modelo_nombre === "Muñeca" || res.modelo_nombre === "Rodilla" || 
              res.modelo_nombre === "Riñones" || res.modelo_nombre === "Pulmones" || 
              res.modelo_nombre === "Pulmon") {
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
  }

  enviarFeedback() {
    const id = this.result.imagen_id;
    
    if(this.result.modelo_id === 1){
      const envioCerebro = this.obtenerValoresBotonesCerebro();
      console.log(envioCerebro);
      const labelSeleccionado = this.obtenerLabelSeleccionado() ?? this.textComment;
      console.log(labelSeleccionado);
      this.feedbackService.postFeedbackBrain(id, ...envioCerebro, this.textComment).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Feedback enviado: ' + '"' + labelSeleccionado + '"',
          life: 2000,
        });
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
    }

    if(this.result.modelo_id === 2){
      const envioPulmon = this.obtenerValoresBotonesPulmon();
      console.log(envioPulmon);
      const labelSeleccionado = this.obtenerLabelSeleccionado() ?? this.textComment;
      console.log(labelSeleccionado);
      this.feedbackService.postFeedbackLungs(id, ...envioPulmon, this.textComment).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Feedback enviado: ' + '"' + labelSeleccionado + '"',
            life: 2000,
          });
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
    }

    if(this.result.modelo_id === 3){
      const envioCorazon = this.obtenerValoresBotonesCorazon();
      console.log(envioCorazon);
      const labelSeleccionado = this.obtenerLabelSeleccionado() ?? this.textComment;
      console.log(labelSeleccionado);
      this.feedbackService.postFeedbackHeart(id, ...envioCorazon, this.textComment).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Feedback enviado: ' + '"' + labelSeleccionado + '"',
            life: 2000,
          });
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
    }

    if(this.result.modelo_id === 4){
      const envioRinion = this.obtenerValoresBotonesRinion();
      console.log(envioRinion);
      const labelSeleccionado = this.obtenerLabelSeleccionado() ?? this.textComment;
      console.log(labelSeleccionado);
      this.feedbackService.postFeedbackKidney(id, ...envioRinion, this.textComment).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Feedback enviado: ' + '"' + labelSeleccionado + '"',
            life: 2000,
          });
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
    }

    if(this.result.modelo_id === 5){
      const envioRodilla = this.obtenerValoresBotonesRodilla();
      console.log(envioRodilla);
      const labelSeleccionado = this.obtenerLabelSeleccionado() ?? this.textComment;
      console.log(labelSeleccionado);
      this.feedbackService.postFeedbackKnee(id, ...envioRodilla, this.textComment).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Feedback enviado: ' + '"' + labelSeleccionado + '"',
            life: 2000,
          });
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
    }

    if(this.result.modelo_id === 6){
      const envioMunieca = this.obtenerValoresBotonesMunieca();
      console.log(envioMunieca);
      const labelSeleccionado = this.obtenerLabelSeleccionado() ?? this.textComment;
      console.log(labelSeleccionado);
      this.feedbackService.postFeedbackWrist(id, ...envioMunieca, this.textComment).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Feedback enviado: ' + '"' + labelSeleccionado + '"',
            life: 2000,
          });
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
    }
  } 

  private obtenerLabelSeleccionado(): string | null {
    let labelSeleccionado: string | null = null;
    for (let i = 0; i < this.buttonsModels.length; i++) {
      if (this.buttonsModels[i].idActivate === false) {
        labelSeleccionado = this.buttonsModels[i].label;
        break;
      }
    }
  
    return labelSeleccionado;
  }

  private obtenerValoresBotonesCerebro(): [boolean, boolean, boolean, boolean] {
    return [
      !this.buttonsModels[0].idActivate,
      !this.buttonsModels[1].idActivate,
      !this.buttonsModels[2].idActivate,
      !this.buttonsModels[3].idActivate,
    ];
  }

  private obtenerValoresBotonesCorazon(): [boolean, boolean, boolean, boolean, boolean, boolean] {
    return [
      !this.buttonsModels[0].idActivate,
      !this.buttonsModels[1].idActivate,
      !this.buttonsModels[2].idActivate,
      !this.buttonsModels[3].idActivate,
      !this.buttonsModels[4].idActivate,
      !this.buttonsModels[5].idActivate,
    ];
  }

  private obtenerValoresBotonesMunieca(): [boolean, boolean] {
    return [
      !this.buttonsModels[0].idActivate,
      !this.buttonsModels[1].idActivate,
    ];
  }

  private obtenerValoresBotonesPulmon(): [boolean, boolean] {
    return [
      !this.buttonsModels[0].idActivate,
      !this.buttonsModels[1].idActivate,
    ];
  }

  private obtenerValoresBotonesRinion(): [boolean, boolean, boolean, boolean] {
    return [
      !this.buttonsModels[0].idActivate,
      !this.buttonsModels[1].idActivate,
      !this.buttonsModels[2].idActivate,
      !this.buttonsModels[3].idActivate,
    ];
  }

  private obtenerValoresBotonesRodilla(): [boolean, boolean] {
    return [
      !this.buttonsModels[1].idActivate,
      !this.buttonsModels[0].idActivate,
    ];
  }

  dataTranslations: { [key: string]: string } = {
    perdida_visual: 'Pérdida visual',
    debilidad_focal: 'Debilidad focal',
    convulsiones : 'Convulsiones',
    palpitaciones: 'Palpitaciones',
    dolor_superior_izquierdo: 'Dolor miembros sup. izq.',
    disnea: 'Disnea',
    dolor_con_limitacion: 'Dolor con limitación func.', 
    edema : 'Edema',
    deformidad : 'Deformidad',
    puntada_lateral  : 'Puntada lateral',
    fiebre : 'Fiebre',
    dificultad_respiratoria: 'Dificultad respiratoria',
    hermaturia : 'Hematuria',
    dolor_lumbar : 'Dolor lumbar', 
    dolor_abdominal  : 'Dolor abdominal',
    perdida_peso  : 'Pérdida de peso',
    sensacion_de_inestabilidad: 'Sensación de inestabilidad',
    prueba_CA_positiva: 'Prueba cajón ant. pos.',
    impotencia_funcional: 'Impotencia funcional',
  };

  keyTranslations: { [key: string]: string } = {
    "LCA sano": 'LCA sano',
    "Rotura LCA": 'Rotura LCA',
    lcaSano: 'LCA sano',
    roturaLCA: 'Rotura LCA',
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
    contraccionVentricular: 'Contracción ventricular prematura',
    fusionVentricularNormal: 'Fusión de latido ventricular y normal',
    infarto: 'Infarto de miocardio',
    latido_normal: 'Latido normal',
    prematuroSupraventricular: 'Latido prematuro supraventricular',
    no_clasificable: 'Latido no clasificable',
  };

  private setValueResultDiagnostic(res: DiagnosticResp) {
    if (res !== undefined && !this.result) {
      this.loaderService.updateIsLoading(false);
    }

    this.result = res;

    if (this.result.nombre_medico === null) {
      this.result.nombre_medico = '';
    }
    if (this.result.apellido_medico === null) {
      this.result.apellido_medico = '';
    }

    this.datos_paciente = JSON.parse(this.result.datos_paciente);
    this.resultado = JSON.parse(this.result.resultado);
    this.datosComplementarios = JSON.parse(this.result.datos_complementarios);
    this.resultadoList = Object.entries(this.resultado).map(([key, value]) => ({   
      key: this.keyTranslations[key] || key,
      value,
    }));
    this.datosComplementariosList = Object.entries(this.datosComplementarios).map(([key, value]) => ({
      key: this.dataTranslations[key] || key,
      value,
    }));
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
    resultadopdf = 
    resultadopdf + 'DNI: ' + this.result.usuario_medico_dni + '\n' +
      'Nombre: ' + this.result.nombre_medico + '\n' +
      'Apellido: '+ this.result.apellido_medico + '\n\n' +
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

    doc.text(this.armarPDF(this.result), 10, 20);
    doc.addImage(this.imagePath, 'JPEG', 75, 150, 60, 60, 'FAST');

    const pdfResult = '\nResultado: ' + this.getHighestKeyValue().key + ' ' 
                      + this.getHighestKeyValue().value.toFixed(1) + "%\n";
    
    doc.text(pdfResult, 10, 230);
    doc.save('Diagnóstico '+ this.result.id +'.pdf')
  }

  descargarYArmarPDF() {
    const fecha = new Date().toLocaleDateString();
    const condicionesPrevias = this.datosComplementariosList
      .map((conPrev) => `- ${conPrev.key.replaceAll("_", " ")}: ${conPrev.value ? "Si" : "No"}`)
      .join("\n");

    const doc = new jsPDF();
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    doc.setFontSize(24).setFont('helvetica', 'bold');
    doc.text('Informe médico', pageWidth / 2, 10, {align: 'center'});
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Código de informe:', 10,30);
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(this.result.id.toString(), 57,30);
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Fecha', 160,30);
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(fecha, 177,30);
    doc.setFontSize(18).setFont('helvetica', 'bold');
    doc.text('Datos del médico', 10,48,);
    doc.text('_______________', 10,50);
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('DNI', 35,60,);
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(this.result.usuario_medico_dni, 28,70,);
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Nombre', pageWidth / 2,60,{align: 'center'});
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(this.result.nombre_medico, pageWidth / 2,70,{align: 'center'});
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Apellido', 156,60,);
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(this.result.apellido_medico, 155,70,);
    doc.setFontSize(18).setFont('helvetica', 'bold');
    doc.text('Datos del paciente', 10,88,);
    doc.text('________________', 10,90);
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Fecha de nacimiento', 10,100);
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(this.datos_paciente.fecha_nacimiento, 20,110);
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Peso', pageWidth / 2,100,{align: 'center'});
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(this.datos_paciente.peso + 'kg', pageWidth / 2,110,{align: 'center'});
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Altura', 160,100);
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(this.datos_paciente.altura + 'cm', 159,110);
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Sexo', 160,123);
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(this.datos_paciente.sexo, 155,133);
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Sección del cuerpo', pageWidth / 2,123,{align: 'center'});
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(this.result.modelo_nombre, pageWidth / 2,133,{align: 'center'});
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Condiciones previas', 10,123,);
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(condicionesPrevias, 10,133,);
    doc.addImage(this.imagePath, 'JPEG', 75, 170, 60, 60, 'FAST');
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Resultado', pageWidth / 2,250,{align: 'center'});
    doc.setFontSize(14).setFont('helvetica', 'normal');
    doc.text(this.getHighestKeyValue().key+ ' '+ this.getHighestKeyValue().value.toFixed(1)+"%\n",pageWidth/2,260,{align: 'center'});
    doc.save(`Diagnóstico ${this.result.id}.pdf`);
  }

  enableButtonSubmitFeedback() {
    this.buttonSubmitFeedback = false; //habilitar
  }

  selectButton(id: number) {
    console.log(this.buttonsModels);
    console.log(this.getHighestKeyValue().key);
    for (let i = 0; i < this.buttonsModels.length; i++) {
      if (this.buttonsModels[i].id === id) {
        this.buttonsModels[i].idActivate = false;
        console.log(this.buttonsModels[i].label)
      } 
      else {
        this.buttonsModels[i].idActivate = true;
      }
    }
    this.buttonNo = true;
    this.enableButtonSubmitFeedback();
    this.inputDisable = true;
  }

  selectYesButton(){
    console.log(this.resultado);
    console.log(this.resultadoList);
    console.log(this.buttonsModels);
    console.log(this.getHighestKeyValue().key);
    console.log(this.getHighestKeyValue().value);
    for (let i = 0; i < this.buttonsModels.length; i++) {
      for (let i = 0; i < this.resultadoList.length; i++) {
        if (this.resultadoList[i].key !== 'prediction'){
          if (this.buttonsModels[i].label === this.getHighestKeyValue().key) {
            console.log('no entro a rodilla')
            this.buttonsModels[i].idActivate = false;
          }
          else {
            this.buttonsModels[i].idActivate = true;
          }
        }
        if (this.resultadoList[i].key === 'prediction') {
          if (this.buttonsModels[i].label === this.getHighestKeyValue().key){
            console.log('entro a rodilla')
            this.buttonsModels[i].idActivate = false;
          }
          else{
            this.buttonsModels[i].idActivate = true;
          }
        }
      }
    }
    console.log(this.buttonsModels);
    this.enableButtonSubmitFeedback();
    this.inputDisable = true;
  }

  generateButtons(): void {
    const labels = this.labelModels[this.diagnostic.sectionBody] || [];
    for (let i = 0; i < labels.length; i++) {
      this.buttonsModels.push({ label: labels[i], id: i, idActivate: false });
    }
  }

  inputEnableButtonSubmitFeedback() {
      if(this.inputDisable === false && this.textComment.length >= 1){
        for (let i = 0; i < this.buttonsModels.length; i++) {
        this.buttonsModels[i].idActivate = true;
        }
        this.buttonNo = true;
        this.buttonSubmitFeedback = false;
      }
      else if(this.inputDisable === false && this.textComment.length <= 1){
        this.buttonsModels.find(button => button.idActivate = false);
        this.buttonNo = false;
        this.buttonSubmitFeedback = true;
      }
  }

  disableButtonYes() {
    this.buttonSubmitFeedback = false;
    this.containerMoreOptions = true; //deshabilitar
    this.buttonNo = true;
    this.selectYesButton();
  }

  disableButtonNo() {
    this.buttonSubmitFeedback = true;
    this.containerMoreOptions = false; //habilitar
    this.buttonYes = true;
  }

  getHighestKeyValue(): { key: string, value: any } {
    let highestValue: any = null;
    let highestKeyValue: { key: string, value: any } = { key: '', value: null };
    const prediction = this.resultado['prediction'];
    const resultEntries = prediction ? Object.entries(prediction) : Object.entries(this.resultado);

    for (const [key, value] of resultEntries) {
      if (typeof value === 'number' && (highestValue === null || value > highestValue)) {
        highestValue = value;
        const translatedKey = this.keyTranslations[key] || key;
        highestKeyValue = { key: translatedKey, value };
      }
    }

    if (highestKeyValue.value !== null && highestKeyValue.value >= 0 && highestKeyValue.value <= 1) {
      highestKeyValue.value *= 100;
    }
    return highestKeyValue;
  }
}