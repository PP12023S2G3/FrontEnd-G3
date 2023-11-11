import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Comments } from 'src/app/models/Comment';



@Component({
  selector: 'app-contacto-view',
  templateUrl: './contacto-view.component.html',
  styleUrls: ['./contacto-view.component.css'],
  providers: [MessageService],
})
export class ContactoViewComponent implements OnInit {
  tituloDinamico = 'Contacto';
  cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }

  comments!: Comments;
  messageOptions: { label: string; value: string; }[] | undefined;

  constructor(private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.messageOptions = [
      { label: 'tipo 1', value: 'valor tipo 1' },
      { label: 'tipo 2', value: 'valor tipo 2' }
    ];


    this.comments = new Comments();

  }

  OnSelectedMessage(event: any) {
  }




  onSubmit() {
    this.validateName();
    this.validateEmail();
    this.validateMessage();

  }

  validateName() {
    if (!this.comments.name) {
      return alert('Por favor complete el nombre.');
    }
    if (this.comments.name.length >= 100 || this.comments.name.match(/\d/)) {

      return alert('Nombre y apellido deben tener menos de 100 caracteres y no deben contener números.');
    }
  }
  validateEmail() {
    if (!this.comments.email) {
      return alert('Por favor complete el email.');
    }
    if (!this.comments.email.includes('@') || !this.comments.email.includes('.com')) {

      return alert('El email debe contener el signo "@" y terminar con ".com"');
    }
    if (this.comments.email.length >= 100) {
      return alert('El email debe tener menos de 100 caracteres.');

    }
  }
  validateMessage() {
    if (!this.comments.message) {
      return alert('Por favor complete el mensaje.');
    }
    if (this.comments.message.length > 300) {

      return alert('El mensaje debe tener menos de 300 caracteres.');
    }
  }



}
