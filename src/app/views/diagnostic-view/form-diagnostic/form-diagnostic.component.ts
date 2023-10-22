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
  acceptedFileTypes: string = 'image/jpeg,image/png,application/dicom';
  isResultButtonDisabled = true;
  imagenURL: string | ArrayBuffer | null = null;
  showCancelButton = false;

  constructor(private resultService: ResultService, private router: Router) { }

  onFileSelect(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.uploadedFile = selectedFile;
      this.isResultButtonDisabled = false;
      this.getObjectURL(selectedFile);
      this.showCancelButton = true; // Muestra el botón de cancelar
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
    if (this.uploadedFile) {
      this.postResult(this.uploadedFile);
      alert('Imagen seleccionada: ' + this.uploadedFile.name);
    } else {
      alert('No se ha seleccionado una imagen.');
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

  private setRequest(formData: FormData, file: File) {
    formData.append('imagen', file);
    formData.append('perdida_visual', 'true');
    formData.append('debilidad_focal', 'true');
    formData.append('convulsiones', 'true');
    formData.append('id_usuario', '3');
    formData.append('id_medico', '3');
  }
 }
