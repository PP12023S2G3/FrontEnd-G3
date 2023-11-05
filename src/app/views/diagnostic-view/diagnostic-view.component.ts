import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { Doctor } from 'src/app/models/Doctor';
import { ResultService } from 'src/app/services/result/result.service';
import {MessageService} from 'primeng/api';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';
import { ResultcDTO } from 'src/app/models/Dtos/ResultDTO';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-diagnostic-view',
  templateUrl: './diagnostic-view.component.html',
  styleUrls: ['./diagnostic-view.component.css'],
  providers: [MessageService],
})
export class DiagnosticViewComponent implements OnInit {
  doctor!: Doctor;
  diagnostic!: Diagnostic;
  isValid=false;
  formFieldsCompleted = false;
  formFieldsError = false;
  uploadedFile: File | null = null;
  isResultButtonDisabled = true;
  imagenURL: string | ArrayBuffer | null = null;
  showCancelButton = false;
  maxFileSize: number = 10485760;
  minImageWidth: number = 225;
  minImageHeight: number = 225;
  acceptedFileTypes: string = 'image/jpeg,image/png,application/x-zip-compressed';
  sexOptions: { label: string; value: number; }[] | undefined;
  partsOptions: { label: string; value: number; }[] | undefined;
  calendarIcon = 'pi pi-calendar';
  dateUser: Date[] | undefined;
  minValidDate!: Date;
  maxValidDate!: Date;
  IdUser!:number;
  selectedpartOption!:string;
  selectedsexOption!:string;
  selectedOption!: string;
  checkboxState: { [key: string]: boolean } = {};

  checkboxes: { [key: string]: string[] } = {
    Cerebro: ['Pérdida visual', 'Debilidad focal', 'Convulsiones'],
    Pulmón: ['Puntada lateral', 'Fiebre', 'Dificultad respiratoria'],
    Riñón: ['Sangre en orina', 'Dolor en zona lumbar', 'Cansancio'],
  };

  constructor(private resultService: ResultService,
    private resultDTO: ResultcDTO,private userAccountService: UserAccountService,private messageService: MessageService, private router: Router) {
    this.IdUser = parseInt(this.userAccountService.userId);

  }

  ngOnInit(): void {
    this.sexOptions = [
      { label: 'Masculino', value: 1 },
      { label: 'Femenino', value: 2 }
    ];

    this.partsOptions = [
      { label: 'Cerebro', value: 1 },
      { label: 'Corazon', value: 2 },
      { label: 'Pulmón', value: 3 },
      { label: 'Riñón', value: 4 },
    ];

    this.diagnostic = new Diagnostic();
    this.doctor = new Doctor();

    const today = new Date();
    this.minValidDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    this.maxValidDate = today;
  }

// Función para registrar cambios en las opciones seleccionadas y obtener el estado de cada opción
onCheckboxChange( option: string) {
  const opcionesSeleccionadas = this.checkboxState;
    const opcionesPermitidas = this.checkboxes[this.selectedpartOption];
    const opcionesMostradas = opcionesPermitidas.map(
      (opcion) =>
        `${opcion}=${opcionesSeleccionadas[opcion] ? 'true' : 'false'}`
    );

    console.log(
      'Datos enviados con éxito. Opciones enviadas: ' +
        opcionesMostradas.join(', ')
    );
}

onFileSelect(event: any) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    if (selectedFile.type === 'application/x-zip-compressed') {
      console.log("hola")
      const jszip = new JSZip();
      jszip.loadAsync(selectedFile)
        .then((zip) => {
          if (
            selectedFile.size <= this.maxFileSize &&
            this.acceptedFileTypes.split(',').includes(selectedFile.type)
          ) {
            this.uploadedFile = selectedFile;
            this.isResultButtonDisabled = false;
            this.getObjectURL(selectedFile);
            this.showCancelButton = true; // Muestra el botón de cancelar
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'La imagen no cumple con los requisitos',
              life: 2000,
            });
            this.resetFileInput();
          }
        })
        .catch((error) => {
          console.error('Error al cargar el archivo ZIP:', error);
        });
    } else {
      // No es un archivo ZIP, maneja el caso de imágenes o tipos de archivo válidos
      // (código anterior para imágenes)
      const image = new Image();
      image.src = window.URL.createObjectURL(selectedFile);

      image.onload = () => {
        if (
          selectedFile.size <= this.maxFileSize &&
          this.acceptedFileTypes.split(',').includes(selectedFile.type) &&
          image.width >= this.minImageWidth &&
          image.height >= this.minImageHeight
        ) {
          this.uploadedFile = selectedFile;
          this.isResultButtonDisabled = false;
          this.getObjectURL(selectedFile);
          this.showCancelButton = true; // Muestra el botón de cancelar
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'La imagen no cumple con los requisitos',
            life: 2000,
          });
          this.resetFileInput();
        }
      };
    }
  } else {
    this.resetFileInput();
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se ha seleccionado una imagen o ocurrió un error al subir el archivo.',
      life: 3000,
    });
  }
}


  resetFileInput() {
    this.uploadedFile = null;
    this.isResultButtonDisabled = true;
    this.imagenURL = null;
  }
  cancelImageUpload() {
    this.resetFileInput();
    this.showCancelButton = false; // Oculta el botón de cancelar
  }

  getObjectURL(file: File) {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        this.imagenURL = event.target?.result as string;
      };
    }
  }

  diagnosticResult() {
    this.checkFormFields();
    this.checkFormErrorFields();
    this.diagnostic.sectionBody = this.selectedpartOption;
    this.diagnostic.gender = this.selectedsexOption;
    this.diagnostic.doctor = this.doctor;
    if(this.uploadedFile){
    this.diagnostic.image = this.uploadedFile; }

    if (this.uploadedFile && this.formFieldsCompleted && this.formFieldsError) {
      this.postResult(this.uploadedFile);
    } else {
      if (!this.uploadedFile) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se ha seleccionado una imagen.',
          life: 2000,
        });
      }

      if (!this.formFieldsCompleted) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Completa todos los campos del formulario antes de continuar',
          life: 2000,
        });
      }
      else if (!this.formFieldsError){
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Datos del formulario erroneos',
          life: 2000,
        });
      }
    }
  }

  postResult(file: File) {
    this.resultDTO.setCompanyInformation(this.diagnostic);
    console.log(this.diagnostic);
   /* if (this.doctor && typeof this.doctor.dni === 'string' && this.selectedpartOption == 'Corazon') {
    const req=this.createRequestHeart(file,true, this.doctor.dni,true,"nacimient",23,23,"sexo",2,"doc");

    this.resultService.postResultHeart(req).subscribe({
      next: (res) => {
        localStorage.setItem('PredictedResult', JSON.stringify(res));
        //this.router.navigate(['/result']);
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });
    } */
    const reqBrain=this.resultService.createRequestBrain(file,true,true,true,"fechadenacimiento",4,7,"sexo",3,"1");

    this.resultService.postResultBrain(reqBrain).subscribe({
      next: (res) => {

        localStorage.setItem('idResult', JSON.stringify(res.id));
        this.router.navigate(['/result']);
        console.log(res);
        console.log(res.pituitary);
        console.log(res.no_tumor);
        console.log(res.meningioma);
        console.log(res.glioma);
        console.log(res.imagen_id);
        console.log(res.id);
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });

    const req=this.resultService.createRequestHeart(file,true,true,true,"nacimient",23,23,"sexo",2,"doc");

    this.resultService.postResultHeart(req).subscribe({
      next: (res) => {
        console.log('Contraccion ventricular prematura:', res.contraccionVentricular);
        console.log('Fusion de latido ventricular y normal:', res.fusionVentricularNormal);
        console.log('Infarto de miocardio:', res.infarto);
        console.log('Latido no clasificable:', res.no_clasificable);
        console.log('Latido normal:', res.normal);
        console.log('Latido prematuro supraventricular:', res.prematuroSupraventricular);
        console.log('imagen_id:', res.imagen_id);
        console.log('id:', res.id);
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });


    const reqLungs=this.resultService.createRequestLungs(file,true,true,true,"nacimiento",23,123,"sexo",3,"1");

    this.resultService.postResultLungs(reqLungs).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.pneumonia);
        console.log(res.no_pneumonia);
        console.log(res.imagen_id);
        console.log(res.id);
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });

    const reqKnee=this.resultService.createRequestKnee(file,true,true,true,"nacimiento",23,123,"sexo",2,"doc");

    this.resultService.postResultKnee(reqKnee).subscribe({
      next: (res) => {
        console.log(res);
        console.log('prediction:', res.prediction);
        console.log('LCA sano:', res.prediction.lcaSano);
        console.log('Rotura en el LCA:', res.prediction.roturaLCA);
        console.log('id:', res.id);
        console.log('imagen_id:', res.imagen_id);

      },
      error: (error) => {
        // Manejar errores aquí
      }
    });

    const reqKidney=this.resultService.createRequestKidney(file,true,true,true,true,true,"nacimiento",23,123,"sexo",3,"1");

    this.resultService.postResultKidney(reqKidney).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.tumor);
        console.log(res.quiste);
        console.log(res.piedra);
        console.log(res.normal);
        console.log(res.imagen_id);
        console.log(res.id);
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });

    const reqWrist=this.resultService.createRequestWrist(file,true,true,true,"naciminto",3,23,"sexo",2,"doc");

    this.resultService.postResultWrist(reqWrist).subscribe({
      next: (res) => {
        localStorage.setItem('PredictedResult', JSON.stringify(res));
        console.log('Fractura:', res.fractura);
        console.log('Sin fractura:', res.sano);
        console.log('imagen_id:', res.imagen_id);
        console.log('id:', res.id);
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });

  }



  OnSelectedSex(event : any) {
    if (!event.value) {
      this.selectedsexOption = '';
    }
    else {
      this.selectedsexOption = event.value.label;
    }
  }

  OnSelectedPart(event : any) {
    if (!event.value) {
      this.selectedpartOption = '';
    }
    else {
    this.selectedpartOption = event.value.label;
    }
  }

  checkFormFields() {
    if (
      this.doctor.dni != undefined &&
      this.doctor.name != undefined&&
      this.doctor.lastname != undefined&&
      this.diagnostic.weight != undefined&&
      this.diagnostic.height != undefined&&
      this.diagnostic.gender != undefined&&
      this.selectedpartOption != undefined &&
      this.selectedsexOption != undefined
    ) {
      this.formFieldsCompleted = true;
    } else {
      this.formFieldsCompleted = false;
    }
  }
  checkFormErrorFields() {
    const dniPattern = /^[0-9]{7,8}$/;

    const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    const lastNamePattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    const validDNI = this.doctor?.dni && dniPattern.test(this.doctor.dni.toString()); // Validar el DNI

    const validName = this.doctor?.name && typeof this.doctor.name === 'string' && this.doctor.name.length >= 2 && namePattern.test(this.doctor.name);
    const validLastName = this.doctor?.lastname && typeof this.doctor.lastname === 'string' && this.doctor.lastname.length >= 2 && lastNamePattern.test(this.doctor.lastname);

    const validWeight = this.diagnostic?.weight && typeof this.diagnostic.weight === 'number' && this.diagnostic.weight >= 1 && this.diagnostic.weight <= 200;
    const validHeight = this.diagnostic?.height && typeof this.diagnostic.height === 'number' && this.diagnostic.height >= 25 && this.diagnostic.height <= 230;


    if (validDNI && validName && validLastName && validWeight && validHeight) {
      this.formFieldsError = true;
    } else {
      console.log(this.diagnostic);
      console.log(this.doctor);
      this.formFieldsError = false;
    }
  }

  tituloDinamico = 'Diagnostico';
    cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }
}

