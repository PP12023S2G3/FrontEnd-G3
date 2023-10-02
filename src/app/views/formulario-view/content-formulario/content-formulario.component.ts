import { Component } from '@angular/core';

@Component({
  selector: 'app-content-formulario',
  templateUrl: './content-formulario.component.html',
  styleUrls: ['./content-formulario.component.css']
})
export class ContentFormularioComponent {
// Variable para almacenar la imagen seleccionada
uploadedFiles: File [] = [] ;
maxFileSize: number = 10485760; // Tamaño máximo en bytes (en este caso, 10 MB)
acceptedFileTypes: string = 'image/jpeg,image/png'; // Tipos MIME permitidos
isChooseButtonDisabled = false; // Habilita el botón "Choose" inicialmente
isCancelButtonVisible = false; // Oculta el botón "Cancel" inicialmente
isResultButtonDisabled = true; // Inicialmente, el botón "Resultado" estará deshabilitado
imagenURL: string | ArrayBuffer | null = null; // Variable para la URL de la imagen
mostrarTextoInicial = true; // Variable para controlar la visibilidad del texto inicial

// Función para manejar la selección de una imagen
  onUpload(event: any) {
    const uploadedFile = event.files && event.files[0];

    if (uploadedFile) {
      // Aquí puedes realizar acciones con la imagen seleccionada
      this.uploadedFiles[0] = uploadedFile;
      this.isChooseButtonDisabled = true; // Deshabilita el botón "Choose"
      this.isCancelButtonVisible = true; // Muestra el botón "Cancel"
      this.isResultButtonDisabled = false; // Habilita el botón "Resultado"
      this.getObjectURL();
    } else {
      this.resetFileInput();
      console.log('No se ha seleccionado una imagen o ocurrió un error al subir el archivo.');
    }
  }
  // Función para mostrar el resultado (puedes implementar la lógica deseada aquí)
  diagnosticResult() {
    if (this.uploadedFiles) {
      // Aquí puedes realizar acciones con la imagen seleccionada
      alert('Imagen seleccionada: ' + this.uploadedFiles);
    } else {
      alert('No se ha seleccionado una imagen.');
    }
  }
  // Función para cancelar la selección del archivo
  onCancel() {
    this.resetFileInput();
  }
  // Función para manejar el evento onSelect
  onFileSelect(event: any) {
   // Puedes realizar acciones adicionales aquí si es necesario
    this.mostrarTextoInicial=false;
  }

  // Función para restaurar el estado inicial del botón y ocultar el archivo seleccionado
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
    console.log("hola2");
  }
}


