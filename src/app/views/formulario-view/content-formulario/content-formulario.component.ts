import { Component } from '@angular/core';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-content-formulario',
  templateUrl: './content-formulario.component.html',
  styleUrls: ['./content-formulario.component.css']
})
export class ContentFormularioComponent {

  uploadedFiles: File [] = [] ;
  maxFileSize: number = 10485760;
  acceptedFileTypes: string = 'image/jpeg,image/png';
  isChooseButtonDisabled = false;
  isCancelButtonVisible = false;
  isResultButtonDisabled = true;
  imagenURL: string | ArrayBuffer | null = null;
  mostrarTextoInicial = true;

  constructor(private resultService:ResultService) {
   }

  onUpload(event: any) {
    const uploadedFile = event.files && event.files[0];
    if (uploadedFile) {
      this.uploadedFiles[0] = uploadedFile;
      this.isChooseButtonDisabled = true;
      this.isCancelButtonVisible = true;
      this.isResultButtonDisabled = false;
      this.getObjectURL();
    } else {
      this.resetFileInput();
      console.log('No se ha seleccionado una imagen o ocurrió un error al subir el archivo.');
    }
  }

  diagnosticResult() {
    if (this.uploadedFiles[0]) {
      this.postResult(this.uploadedFiles[0])
      alert('Imagen seleccionada: ' + this.uploadedFiles[0]);
    } else {
      alert('No se ha seleccionado una imagen.');
    }
  }

  onCancel() {
    this.resetFileInput();
  }

  onFileSelect(event: any) {
    this.mostrarTextoInicial=false;
  }

  resetFileInput() {
    this.uploadedFiles = [];
    this.isChooseButtonDisabled = false;
    this.isCancelButtonVisible = false;
    this.isResultButtonDisabled = true;
    this.imagenURL = "";
    this.mostrarTextoInicial=true;
  }

  getObjectURL(){
    if (this.uploadedFiles.length > 0) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.uploadedFiles[0]);
      fileReader.onload = (event) => {
        this.imagenURL = event.target?.result as string;
      };
    }
  }

  public postResult(file : File){
    const formData = new FormData();
    formData.append('img', file);

    this.resultService.postResultado(formData).subscribe({
      next: res => {

      },
      error: error => {
    }
    });
  }
}


