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

// Función para manejar la selección de una imagen
onUpload(event: any) {
  this.uploadedFiles = event.target.files[0];
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
}
