import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { Doctor } from 'src/app/models/Doctor';
import { ResultService } from 'src/app/services/result/result.service';
import {MessageService} from 'primeng/api';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';
import { ResultcDTO } from 'src/app/models/Dtos/ResultDTO';
import * as JSZip from 'jszip';
import { LogoutService } from 'src/app/shared/logout/logout.service';

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
  selectedOptions: string[] = [];

  selectedOptionsCerebro: { [key: string]: boolean } = {
    'Pérdida visual': false,
    'Debilidad focal': false,
    'Convulsiones': false
  };

  selectedOptionsPulmon: { [key: string]: boolean } = {
    'Puntada lateral': false,
    'Fiebre': false,
    'Dificultad respiratoria': false
  };

  selectedOptionsRinion: { [key: string]: boolean } = {
    'Hermaturia': false,
    'Dolor lumbar': false,
    'Dolor abdominal': false,
    'Fiebre': false,
    'Perdida de peso' : false
  };

  selectedOptionsRodilla: { [key: string]: boolean } = {
    'Sensacion de inestabilidad': false,
    'CA positiva': false,
    'Impotencia funcional': false
  };

  selectedOptionsCorazon: { [key: string]: boolean } = {
    'Palpitaciones': false,
    'Dolor superior izquierdo': false,
    'Disnea': false
  };

  selectedOptionsMunieca: { [key: string]: boolean } = {
    'Dolor con limitacion': false,
    'Edema': false,
    'Deformidad': false
  };

  formattedDate: string = ''; // Variable para almacenar la fecha formateada
  esVisible: boolean = false;
  nroResultado !:any;

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  constructor(private resultService: ResultService,
    private resultDTO: ResultcDTO,private logoutService: LogoutService,private userAccountService: UserAccountService,private messageService: MessageService, private router: Router) {
    this.IdUser = parseInt(this.userAccountService.userId);
    this.logoutService.getLogoutVisible().subscribe(() => {
      this.esVisible = false;
    });

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
      { label: 'Rodilla', value: 5 },
      { label: 'Muñeca', value: 6 },
    ];

    this.diagnostic = new Diagnostic();
    this.doctor = new Doctor();

    const today = new Date();
    this.minValidDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    this.maxValidDate = today;
  }

onCheckboxChange(section: string, option: string) {
  if (section === 'Cerebro') {
    if (this.selectedOptionsCerebro[option]) {
      console.log(option + ' en Cerebro fue marcado');
    } else {
      console.log(option + ' en Cerebro fue desmarcado');
    }
  } else if (section === 'Pulmón') {
    if (this.selectedOptionsPulmon[option]) {
      console.log(option + ' en Pulmón fue marcado');
    } else {
      console.log(option + ' en Pulmón fue desmarcado');
    }
  }
  console.log( this.selectedOptionsCerebro['Convulsiones']);

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
    console.log(this.selectedpartOption);
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
    if (this.doctor && this.diagnostic.weight && this.diagnostic.height && typeof this.doctor.dni === 'string' && this.selectedpartOption == 'Corazon') {

      const req=this.resultService.createRequestHeart(file,this.selectedOptionsCorazon['Palpitaciones'],
      this.selectedOptionsCorazon['Dolor superior izquierdo'],this.selectedOptionsCorazon['Disnea'],this.formattedDate,this.diagnostic.weight,
      this.diagnostic.height,this.selectedsexOption,this.IdUser,this.doctor.dni);

      console.log(req);

      this.resultService.postResultHeart(req).subscribe({
        next: (res) => {
          localStorage.setItem('idResult', JSON.stringify(res.id));
          this.nroResultado = res.id;
          this.redirectByRole();
          console.log('Contraccion ventricular prematura:', res.contraccionVentricular);
          console.log('Fusion de latido ventricular y normal:', res.fusionVentricularNormal);
          console.log('Infarto de miocardio:', res.infarto);
          console.log('Latido no clasificable:', res.no_clasificable);
          console.log('Latido normal:', res.normal);
          console.log('Latido prematuro supraventricular:', res.prematuroSupraventricular);
          console.log('imagen_id:', res.imagen_id);
          console.log('id:', res.id);
        },
        error: (error: { message: any }) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: error.message,
            life: 2000,
          });
        }
      });
    }
    else if (this.doctor && this.diagnostic.weight && this.diagnostic.height && typeof this.doctor.dni === 'string' && this.selectedpartOption == 'Cerebro') {

    const reqBrain=this.resultService.createRequestBrain(file,this.selectedOptionsCerebro['Pérdida visual'],this.selectedOptionsCerebro['Debilidad focal'],
    this.selectedOptionsCerebro['Convulsiones'],this.formattedDate,this.diagnostic.weight,
      this.diagnostic.height,this.selectedsexOption,this.IdUser,this.doctor.dni);

    this.resultService.postResultBrain(reqBrain).subscribe({
      next: (res) => {
        localStorage.setItem('idResult', JSON.stringify(res.id));
        this.nroResultado = res.id;
        this.redirectByRole();
        console.log(res);
        console.log(res.pituitary);
        console.log(res.no_tumor);
        console.log(res.meningioma);
        console.log(res.glioma);
        console.log(res.imagen_id);
        console.log(res.id);
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
   else if (this.doctor && this.diagnostic.weight && this.diagnostic.height && typeof this.doctor.dni === 'string' && this.selectedpartOption == 'Pulmón') {

    const reqLungs=this.resultService.createRequestLungs(file,this.selectedOptionsPulmon['Puntada lateral'],this.selectedOptionsPulmon['Fiebre']
    ,this.selectedOptionsPulmon['Dificultad respiratoria'],this.formattedDate,this.diagnostic.weight,
      this.diagnostic.height,this.selectedsexOption,this.IdUser,this.doctor.dni);

    this.resultService.postResultLungs(reqLungs).subscribe({
      next: (res) => {
        localStorage.setItem('idResult', JSON.stringify(res.id));
        this.nroResultado = res.id;
        this.redirectByRole();
        console.log(res);
        console.log(res.pneumonia);
        console.log(res.no_pneumonia);
        console.log(res.imagen_id);
        console.log(res.id);
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

  else if (this.doctor && this.diagnostic.weight && this.diagnostic.height && typeof this.doctor.dni === 'string' && this.selectedpartOption == 'Rodilla') {


    const reqKnee=this.resultService.createRequestKnee(file,this.selectedOptionsRodilla['Sensacion de inestabilidad'],
    this.selectedOptionsRodilla['CA positiva'],this.selectedOptionsRodilla['Impotencia funcional'],this.formattedDate,this.diagnostic.weight,
      this.diagnostic.height,this.selectedsexOption,this.IdUser,this.doctor.dni);

    this.resultService.postResultKnee(reqKnee).subscribe({
      next: (res) => {
        localStorage.setItem('idResult', JSON.stringify(res.id));
        this.nroResultado = res.id;
        this.redirectByRole();
        console.log(res);
        console.log('prediction:', res.prediction);
        console.log('LCA sano:', res.prediction.lcaSano);
        console.log('Rotura en el LCA:', res.prediction.roturaLCA);
        console.log('id:', res.id);
        console.log('imagen_id:', res.imagen_id);

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

  else if (this.doctor && this.diagnostic.weight && this.diagnostic.height && typeof this.doctor.dni === 'string' && this.selectedpartOption == 'Riñón') {

    const reqKidney=this.resultService.createRequestKidney(file,this.selectedOptionsRinion['Hermaturia'],this.selectedOptionsRinion['Dolor lumbar'],
    this.selectedOptionsRinion['Dolor abdominal'],this.selectedOptionsRinion['Fiebre'],this.selectedOptionsRinion['Perdida de peso'],this.formattedDate,this.diagnostic.weight,
      this.diagnostic.height,this.selectedsexOption,this.IdUser,this.doctor.dni);

    this.resultService.postResultKidney(reqKidney).subscribe({
      next: (res) => {
        localStorage.setItem('idResult', JSON.stringify(res.id));
        this.nroResultado = res.id;
        this.redirectByRole();
        console.log(res);
        console.log(res.tumor);
        console.log(res.quiste);
        console.log(res.piedra);
        console.log(res.normal);
        console.log(res.imagen_id);
        console.log(res.id);
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

    else if (this.doctor && this.diagnostic.weight && this.diagnostic.height && typeof this.doctor.dni === 'string' && this.selectedpartOption == 'Muñeca') {

    const reqWrist=this.resultService.createRequestWrist(file,this.selectedOptionsMunieca['Dolor con limitacion'],this.selectedOptionsMunieca['Edema'],
    this.selectedOptionsMunieca['Deformidad'],this.formattedDate,this.diagnostic.weight,
      this.diagnostic.height,this.selectedsexOption,this.IdUser,this.doctor.dni);

    this.resultService.postResultWrist(reqWrist).subscribe({
      next: (res) => {
        localStorage.setItem('idResult', JSON.stringify(res.id));
        this.nroResultado = res.id;
        this.redirectByRole();
        console.log('Fractura:', res.fractura);
        console.log('Sin fractura:', res.sano);
        console.log('imagen_id:', res.imagen_id);
        console.log('id:', res.id);
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

  formatDate() {
    if (this.diagnostic.dateOfBirth) {
      const date = this.diagnostic.dateOfBirth;
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Añade un 0 si es un solo dígito
      const day = String(date.getDate()).padStart(2, '0'); // Añade un 0 si es un solo dígito

      this.formattedDate = `${year}-${month}-${day}`;
    } else {
      this.formattedDate = ''; // Si la fecha es undefined, establece la variable como cadena vacía
    }
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
      this.selectedsexOption != undefined &&
      this.formattedDate != ''
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
      this.formFieldsError = false;
    }
  }

  tituloDinamico = 'Diagnostico';
    cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }

  redirectByRole(){
    if(this.userAccountService.roleId == 3){
      this.esVisible = true;
      this.router.navigate(['/diagnostico']);
    }
    else {
      this.router.navigate(['/result']);
    }
  }

  updateSharedValue() {
    location.reload();
    this.esVisible = false;
  }

}

