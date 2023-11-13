import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Comments } from 'src/app/models/Comment';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';



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
  formFieldsCompleted =false;
  comments!: Comments;
  messageOptions: { label: string; value: string; }[] | undefined;

  constructor(private messageService: MessageService, private contactService: UserAccountService) {

  }

  ngOnInit(): void {
    this.messageOptions = [
      { label: 'tipo 1', value: 'valor tipo 1' },
      { label: 'tipo 2', value: 'valor tipo 2' }
    ];


    this.comments = new Comments();

  }

  postContacto(){
    if(this.comments.name && this.comments.email && this.comments.message)
    this.contactService.postContacto(this.comments.name, this.comments.email, this.comments.message).subscribe({
      next: (res) => {
        console.log("enviado");
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Mensaje enviado con éxito',
          life: 2000,
        });
      },
      error:  (error: { message: any }) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
          life: 2000,
        });
      }
    });
  }

  OnSelectedMessage(event: any) {
  }

  onSubmit() {
    this.checkFormFields();
    console.log(this.formFieldsCompleted);
    if(!this.formFieldsCompleted){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Completa todos los campos del formulario antes de continuar',
        life: 2000,
      });
      console.log("ALGUN CAMPO FALTA");
    }
    else {
      this.postContacto();
    }
  }
  checkFormFields() {
    if (this.comments.name != undefined && this.comments.email != undefined && this.comments.message != undefined && this.comments.name != '' && this.comments.email != '' && this.comments.message != '') {
      this.formFieldsCompleted = true;
    } else {
      this.formFieldsCompleted = false;
    }
  }




}
