import { Component } from '@angular/core';

@Component({
  selector: 'app-content-formulario',
  templateUrl: './content-formulario.component.html',
  styleUrls: ['./content-formulario.component.css']
})
export class ContentFormularioComponent {
// Variable para almacenar la imagen seleccionada
selectedImage: File | null = null;

// Función para manejar la selección de una imagen
onImageSelected(event: any) {
  this.selectedImage = event.target.files[0];
}

// Función para mostrar el resultado (puedes implementar la lógica deseada aquí)
diagnosticResult() {
  if (this.selectedImage) {
    // Aquí puedes realizar acciones con la imagen seleccionada
    alert('Imagen seleccionada: ' + this.selectedImage.name);
  } else {
    alert('No se ha seleccionado una imagen.');
  }
}
}
