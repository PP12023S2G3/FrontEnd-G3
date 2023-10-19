import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-form-diagnostic',
  templateUrl: './form-diagnostic.component.html',
  styleUrls: ['./form-diagnostic.component.css']
})
export class FormDiagnosticComponent {

  uploadedFile: File | null = null;
  maxFileSize: number = 10485760;
  minImageWidth: number = 225;
  minImageHeight: number = 225;
  acceptedFileTypes: string = 'image/jpeg,image/png,application/dicom';
  isChooseButtonDisabled = false;
  isCancelButtonVisible = false;
  isResultButtonDisabled = true;
  imagenURL: string | ArrayBuffer | null = null;
  mostrarTextoInicial = true;
  isValid = true;

  constructor(private resultService: ResultService, private router: Router) { }

  onUpload(event: any) {
    const uploadedFile = event.files && event.files[0];
    if (uploadedFile) {
      this.uploadedFile = uploadedFile;
      this.isChooseButtonDisabled = true;
      this.isCancelButtonVisible = true;
      this.isResultButtonDisabled = false;
      this.getObjectURL(uploadedFile);
    } else {
      this.resetFileInput();
      console.log('No se ha seleccionado una imagen o ocurrió un error al subir el archivo.');
    }
  }

  diagnosticResult() {
    if (this.uploadedFile) {
      this.postResult(this.uploadedFile);
      alert('Imagen seleccionada: ' + this.uploadedFile.name);
    } else {
      alert('No se ha seleccionado una imagen.');
    }
  }


  onFileSelect(event: any) {
    const selectedFile = event.files && event.files[0];
    if (selectedFile) {
      this.uploadedFile = selectedFile;
      this.isChooseButtonDisabled = true;
      this.isCancelButtonVisible = true;
      this.isResultButtonDisabled = false;
      this.getObjectURL(selectedFile);
    } else {
      this.resetFileInput();
      console.log('No se ha seleccionado una imagen o ocurrió un error al subir el archivo.');
    }
  }


  resetFileInput() {
    this.uploadedFile = null;
    this.isChooseButtonDisabled = false;
    this.isCancelButtonVisible = false;
    this.isResultButtonDisabled = true;
    this.imagenURL = "";
    this.mostrarTextoInicial = true;
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
  onCancel() {
    this.resetFileInput();
  }

  onClearUpload() {
    this.mostrarTextoInicial = true;
  }

  postResult(file: File) {
    const formData = new FormData();
    formData.append('img', file);

    this.resultService.postResult(formData).subscribe({
      next: res => {
        console.log(res);
        localStorage.setItem('PredictedResult', JSON.stringify(res));
        this.router.navigate(['/result']);
      },
      error: error => {
        // Manejar errores aquí
      }
    });
  }
}
