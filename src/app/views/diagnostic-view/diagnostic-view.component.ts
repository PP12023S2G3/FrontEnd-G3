import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { Doctor } from 'src/app/models/Doctor';
import { ResultService } from 'src/app/services/result/result.service';
import {MessageService} from 'primeng/api';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';
import { ResultcDTO } from 'src/app/models/Dtos/ResultDTO';
import * as JSZip from 'jszip';
import { LogoutService } from 'src/app/shared/logout/logout.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';

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
  minImageWidth: number = 224;
  minImageHeight: number = 224;
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
    'Hematuria': false,
    'Dolor lumbar': false,
    'Dolor abdominal': false,
    'Fiebre': false,
    'Pérdida de peso' : false
  };

  selectedOptionsRodilla: { [key: string]: boolean } = {
    'Sensación de inestabilidad': false,
    'Prueba cajón ant. pos.': false,
    'Impotencia funcional': false
  };

  selectedOptionsCorazon: { [key: string]: boolean } = {
    'Palpitaciones': false,
    'Dolor miembros sup. izq.': false,
    'Disnea': false
  };

  selectedOptionsMunieca: { [key: string]: boolean } = {
    'Dolor con limitación func.': false,
    'Edema': false,
    'Deformidad': false
  };

  formattedDate: string = '';
  esVisible: boolean = false;
  nroResultado !:any;
  roleId: any;

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  constructor(private resultService: ResultService,
    private resultDTO: ResultcDTO,private logoutService: LogoutService, private loaderService: LoaderService,
    private userAccountService: UserAccountService,private messageService: MessageService, private router: Router) {
    this.IdUser = parseInt(this.userAccountService.userId);
    this.roleId = localStorage.getItem('roleId');
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
    } else {
    }
  } else if (section === 'Pulmón') {
    if (this.selectedOptionsPulmon[option]) {
    } else {
    }
  }
}

onFileSelect(event: any) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    if (selectedFile.type === 'application/x-zip-compressed' && this.selectedpartOption == 'Rodilla') {
      const jszip = new JSZip();
      jszip.loadAsync(selectedFile)
        .then((zip) => {
          if (selectedFile.size <= this.maxFileSize && this.acceptedFileTypes.split(',').includes(selectedFile.type)) {
            this.uploadedFile = selectedFile;
            this.isResultButtonDisabled = false;
            this.getObjectURL(selectedFile);
            this.showCancelButton = true;
          } 
          else {
            this.handleInvalidImage();
          }
        })
        .catch((error) => {
          console.error('Error al cargar el archivo ZIP:', error);
        });
    }
    else if ((selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png') 
    && ['Cerebro', 'Corazon', 'Riñón', 'Muñeca', 'Pulmón'].includes(this.selectedpartOption)) {
      const image = new Image();
      image.src = window.URL.createObjectURL(selectedFile);
      image.onload = () => {
        if (selectedFile.size <= this.maxFileSize && this.acceptedFileTypes.split(',').includes(selectedFile.type)
        && image.width >= this.minImageWidth && image.height >= this.minImageHeight) {
          this.uploadedFile = selectedFile;
          this.isResultButtonDisabled = false;
          this.getObjectURL(selectedFile);
          this.showCancelButton = true;
        }
        else if (this.acceptedFileTypes.split(',').includes(selectedFile.type) 
        && (image.width < this.minImageWidth || image.height < this.minImageHeight)) {
          this.handleInvalidImage();
        }
        else {
          this.handleInvalidFileNotKnee()
        }
      };
    }
    else if ((selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png') 
    && ['Rodilla'].includes(this.selectedpartOption)) {
      this.handleInvalidFileKnee();
    }
    else if ((selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png' || selectedFile.type === 'application/x-zip-compressed') 
    && !['Cerebro', 'Corazon', 'Riñón', 'Muñeca', 'Pulmón, Rodilla'].includes(this.selectedpartOption)) {
      this.handleInvalidCompletedSectionBody()
    }
    else if (selectedFile.type === 'application/x-zip-compressed' && this.selectedpartOption != 'Rodilla') {
      this.handleInvalidFileNotKnee()
    }
    else{
      this.handleInvalidCompletedSectionBody()
    }
  } 
  else {
    this.resetFileInput();
  }
}

private handleInvalidImage() {
  this.messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: 'La imagen no cumple con el mínimo de 224x224 px',
    life: 2000,
  });
  this.resetFileInput();
}

private handleInvalidFileKnee() {
  this.messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Solo se permite ZIP',
    life: 2000,
  });
  this.resetFileInput();
}

private handleInvalidFileNotKnee() {
  this.messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Solo se permite JPEG o PNG',
    life: 2000,
  });
  this.resetFileInput();
}

private handleInvalidCompletedSectionBody() {
  this.messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Por favor completar primero la seccion del cuerpo',
    life: 2000,
  });
  this.resetFileInput();
}


private handleNoImageSelected() {
  this.messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: 'No se ha seleccionado una imagen o ocurrió un error al subir el archivo.',
    life: 3000,
  });
}

resetFileInput() {
  this.imagenURL = null;
  this.uploadedFile = null;
  this.isResultButtonDisabled = true;
  const fileInput = document.getElementById('chooseFileInput') as HTMLInputElement;
  fileInput.value = '';
  fileInput.removeEventListener('change', this.onFileSelect.bind(this));
  fileInput.addEventListener('change', this.onFileSelect.bind(this));
}

  cancelImageUpload() {
    this.resetFileInput();
    this.showCancelButton = false;
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
    if (this.doctor && this.diagnostic.weight && this.diagnostic.height && typeof this.doctor.dni === 'string' && this.selectedpartOption == 'Corazon') {
      const req=this.resultService.createRequestHeart(file,this.selectedOptionsCorazon['Palpitaciones'],
      this.selectedOptionsCorazon['Dolor miembros sup. izq.'],this.selectedOptionsCorazon['Disnea'],this.formattedDate,this.diagnostic.weight,
      this.diagnostic.height,this.selectedsexOption,this.IdUser,this.doctor.dni);
      this.loaderService.updateIsLoading(true);
      this.resultService.postResultHeart(req).subscribe({
        next: (res) => {
          localStorage.setItem('idResult', JSON.stringify(res.id));
          this.nroResultado = res.id;
          this.redirectByRole();
          this.loaderService.updateIsLoading(false);
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
    else if (this.doctor && this.diagnostic.weight && this.diagnostic.height && typeof this.doctor.dni === 'string' && this.selectedpartOption == 'Cerebro') {

    const reqBrain=this.resultService.createRequestBrain(file,this.selectedOptionsCerebro['Pérdida visual'],this.selectedOptionsCerebro['Debilidad focal'],
    this.selectedOptionsCerebro['Convulsiones'],this.formattedDate,this.diagnostic.weight,
      this.diagnostic.height,this.selectedsexOption,this.IdUser,this.doctor.dni);
    this.loaderService.updateIsLoading(true);
    this.resultService.postResultBrain(reqBrain).subscribe({
      next: (res) => {
        localStorage.setItem('idResult', JSON.stringify(res.id));
        this.nroResultado = res.id;
        this.redirectByRole();
        this.loaderService.updateIsLoading(false);
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
      this.loaderService.updateIsLoading(true);
    this.resultService.postResultLungs(reqLungs).subscribe({
      next: (res) => {
        localStorage.setItem('idResult', JSON.stringify(res.id));
        this.nroResultado = res.id;
        this.redirectByRole();
        this.loaderService.updateIsLoading(false);
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
    const reqKnee=this.resultService.createRequestKnee(file,this.selectedOptionsRodilla['Sensación de inestabilidad'],
    this.selectedOptionsRodilla['Prueba cajón ant. pos.'],this.selectedOptionsRodilla['Impotencia funcional'],this.formattedDate,this.diagnostic.weight,
      this.diagnostic.height,this.selectedsexOption,this.IdUser,this.doctor.dni);
      this.loaderService.updateIsLoading(true);
    this.resultService.postResultKnee(reqKnee).subscribe({
      next: (res) => {
        localStorage.setItem('idResult', JSON.stringify(res.id));
        this.nroResultado = res.id;
        this.redirectByRole();
        this.loaderService.updateIsLoading(false);
      },
      error: (error: { message: any }) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
          life: 2000,
        });
        this.loaderService.updateIsLoading(false);
      }
    });
  }

  else if (this.doctor && this.diagnostic.weight && this.diagnostic.height && typeof this.doctor.dni === 'string' && this.selectedpartOption == 'Riñón') {
    const reqKidney=this.resultService.createRequestKidney(file,this.selectedOptionsRinion['Hematuria'],this.selectedOptionsRinion['Dolor lumbar'],
    this.selectedOptionsRinion['Dolor abdominal'],this.selectedOptionsRinion['Fiebre'],this.selectedOptionsRinion['Pérdida de peso'],this.formattedDate,this.diagnostic.weight,
      this.diagnostic.height,this.selectedsexOption,this.IdUser,this.doctor.dni);
      this.loaderService.updateIsLoading(true);
    this.resultService.postResultKidney(reqKidney).subscribe({
      next: (res) => {
        localStorage.setItem('idResult', JSON.stringify(res.id));
        this.nroResultado = res.id;
        this.redirectByRole();
        this.loaderService.updateIsLoading(false);
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
      const reqWrist=this.resultService.createRequestWrist(file,this.selectedOptionsMunieca['Dolor con limitación func.'],this.selectedOptionsMunieca['Edema'],    this.selectedOptionsMunieca['Deformidad'],this.formattedDate,this.diagnostic.weight,
      this.diagnostic.height,this.selectedsexOption,this.IdUser,this.doctor.dni);
      this.loaderService.updateIsLoading(true);
    this.resultService.postResultWrist(reqWrist).subscribe({
      next: (res) => {
        localStorage.setItem('idResult', JSON.stringify(res.id));
        this.nroResultado = res.id;
        this.redirectByRole();
        this.loaderService.updateIsLoading(false);
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
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      this.formattedDate = `${year}-${month}-${day}`;
    } else {
      this.formattedDate = '';
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

    const validDNI = this.doctor?.dni && dniPattern.test(this.doctor.dni.toString());

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

  tituloDinamico = 'Informe médico';
    cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }

  redirectByRole(){
    if(this.roleId == 3){
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

