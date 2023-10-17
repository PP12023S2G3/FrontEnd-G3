import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-form-diagnostic',
  templateUrl: './form-diagnostic.component.html',
  styleUrls: ['./form-diagnostic.component.css']
})
export class FormDiagnosticComponent {

  uploadedFiles: File [] = [] ;
  maxFileSize: number = 10485760;
  minImageWidth: number = 225;
  minImageHeight: number = 225;
  acceptedFileTypes: string = 'image/jpeg,image/png,application/dicom';
  isChooseButtonDisabled = false;
  isCancelButtonVisible = false;
  isResultButtonDisabled = true;
  imagenURL: string | ArrayBuffer | null = null;
  mostrarTextoInicial = true;
  isValid=true;

  constructor(private resultService:ResultService, private router: Router) {
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

  onFileSelect(event: any) {
    this.mostrarTextoInicial = false;
    const selectedFile = event.files && event.files[0];
    if (selectedFile) {
      const image = new Image();
      image.src = URL.createObjectURL(selectedFile);
      image.onload = () => {
        if (image.width >= this.minImageWidth && image.height >= this.minImageHeight) {
          this.isValid=true;
        } else {
          this.isValid=false;
        }
      };
    }
  }

  resetFileInput() {
    this.uploadedFiles = [];
    this.isChooseButtonDisabled = false;
    this.isCancelButtonVisible = false;
    this.isResultButtonDisabled = true;
    this.imagenURL = "";
    this.mostrarTextoInicial=this.uploadedFiles.length===0;
    console.log(this.mostrarTextoInicial,this.uploadedFiles.length)
  }

  controlMostrarTextoInicialCancel() {
    this.mostrarTextoInicial=this.uploadedFiles.length===0;
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

  onCancel() {
    this.resetFileInput();
  }

  onClearUpload(){
    this.controlMostrarTextoInicialCancel();
  }


  public postResult(file : File){
    const formData = new FormData();
    formData.append('img', file);

    this.resultService.postResultado(formData).subscribe({
      next: res => {
        console.log(res)
       // Almacena los datos en localStorage
       localStorage.setItem('responseData', JSON.stringify(res));

       // Redirige a la ruta '/result'
       this.router.navigate(['/result']);
       },
      error: error => {
    }
    });
  }
}


