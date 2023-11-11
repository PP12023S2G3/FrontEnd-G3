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
  messageOptions : {label : string; value: string;}[] | undefined;

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageOptions = [
      {label: 'tipo 1', value : 'valor tipo 1'},
      {label: 'tipo 2', value: 'valor tipo 2'}
    ];


    this.comments = new Comments();

  }

  OnSelectedMessage(event : any) {
  }

  onSubmit() {

  }


}
