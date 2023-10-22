import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Diagnostic } from 'src/app/models/Diagnostic';
import { Doctor } from 'src/app/models/Doctor';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-diagnostic-view',
  templateUrl: './diagnostic-view.component.html',
  styleUrls: ['./diagnostic-view.component.css']
})
export class DiagnosticViewComponent implements OnInit {
  doctor!: Doctor;
  diagnostic!: Diagnostic;
  formFieldsCompleted = false;
  uploadedFile: File | null = null;
  isResultButtonDisabled = true;
  imagenURL: string | ArrayBuffer | null = null;
  showCancelButton = false;
  maxFileSize: number = 10485760;
  minImageWidth: number = 225;
  minImageHeight: number = 225;
  acceptedFileTypes: string = 'image/jpeg,image/png,application/dicom';
  sexOptions: { label: string; value: string; }[] | undefined;
  partsOptions: { label: string; value: string; }[] | undefined;

  constructor(private resultService: ResultService, private router: Router) { }
  
  ngOnInit(): void {
    this.sexOptions = [
      { label: 'Masculino', value: 'Masculino' },
      { label: 'Femenino', value: 'Femenino' },
      { label: 'Otro', value: 'Otro' },
    ];

    this.partsOptions = [
      { label: 'Cerebro', value: '1' },
      { label: 'Corazon', value: '2' },
    ];

    this.diagnostic = new Diagnostic();
    this.doctor = new Doctor();
  }

  onFileSelect(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
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
          alert('La imagen no cumple con los requisitos. Asegúrate de que sea una imagen válida con el tamaño adecuado.');
          this.resetFileInput();
        }
      };
    } else {
      this.resetFileInput();
      console.log('No se ha seleccionado una imagen o ocurrió un error al subir el archivo.');
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
    if (this.uploadedFile && this.formFieldsCompleted) {
      this.postResult(this.uploadedFile);
    } else {
      if (!this.uploadedFile) {
        alert('No se ha seleccionado una imagen.');
      }
      if (!this.formFieldsCompleted) {
        alert('Completa todos los campos del formulario antes de continuar.');
      }
    }
  }

  postResult(file: File) {
    const formData = new FormData();
    // Hardcodeo para usar API de cerebro
    this.setRequest(formData, file);

    this.resultService.postResult(formData).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('PredictedResult', JSON.stringify(res));
        this.router.navigate(['/result']);
      },
      error: (error) => {
        // Manejar errores aquí
      }
    });
  }

  OnSelectedSex(event : any) {

  }

  OnSelectedPart(event : any) {

  }

  private setRequest(formData: FormData, file: File) {
    formData.append('imagen', file);
    formData.append('perdida_visual', 'true');
    formData.append('debilidad_focal', 'true');
    formData.append('convulsiones', 'true');
    formData.append('id_usuario', '3');
    formData.append('id_medico', '3');
  }

  checkFormFields() {
    if (
      this.doctor.dni != undefined &&
      this.doctor.name != undefined&&
      this.doctor.lastname != undefined&&
      this.diagnostic.age != undefined&&
      this.diagnostic.weight != undefined&&
      this.diagnostic.height != undefined&&
      this.diagnostic.gender != undefined&&
      this.diagnostic.sectionBody != undefined&&
      this.diagnostic.preconditions != undefined
    ) {
      this.formFieldsCompleted = true;
      console.log(this.formFieldsCompleted);
    } else {
      this.formFieldsCompleted = false;
          console.log(this.formFieldsCompleted);
    }
    console.log(this.formFieldsCompleted);
  }

  tituloDinamico = 'Diagnostico';
    cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }
}

