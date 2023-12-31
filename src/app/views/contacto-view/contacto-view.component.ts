import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Comments } from 'src/app/models/Comment';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';




@Component({
  selector: 'app-contacto-view',
  templateUrl: './contacto-view.component.html',
  styleUrls: ['./contacto-view.component.css'],
  providers: [MessageService],
})
export class ContactoViewComponent implements OnInit {
  tituloDinamico = 'Contacto';
  form = false;
  cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }

  comments!: Comments;


  constructor(private messageService: MessageService, private contactService: UserAccountService, private loaderService: LoaderService) {
  }

  ngOnInit(): void {


    this.comments = new Comments();
    this.comments.issue = "Asunto: " + this.comments.name;

  }

  postContacto() {
    this.loaderService.updateIsLoading(true);
    if (this.comments.name != undefined && this.comments.email != undefined && this.comments.message != undefined) {
      this.isDataIndalid();

      if (!this.form) {

        this.contactService.postContacto(this.comments.name, this.comments.email, this.comments.message).subscribe({
          next: (res) => {
            console.log("enviado");
            console.log(res);
            this.messageService.add({
              severity: 'success',
              summary: 'Mensaje enviado con éxito',
              life: 2000,
            });
            this.loaderService.updateIsLoading(false);
          },
          error: (error: { message: any }) => {
            this.messageService.add({
              severity: 'error',
              summary: error.message,
              life: 2000,
            });
            this.loaderService.updateIsLoading(false);
          }
        });
      }
      else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Datos erroneos por favor corregir',
          life: 2000,
        });
        this.loaderService.updateIsLoading(false);
      }
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Completa todos los campos del formulario antes de continuar',
        life: 2000,
      });
      this.loaderService.updateIsLoading(false);
    }
  }


  isDataIndalid() {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    const messagePattern = /^(.*[A-Za-z]){4}.*$/;

    const isNameValid = this.comments.name && this.comments.name.length >= 2 && namePattern.test(this.comments.name);
    const isEmailValid = this.comments.email && this.comments.email.length >= 4 && emailPattern.test(this.comments.email);
    const isMessageValid = this.comments.message && this.comments.message.length >= 4 && messagePattern.test(this.comments.message);

    if (isNameValid && isEmailValid && isMessageValid) {
      this.form = false;
    } else {
      this.form = true;
    }

    console.log("this.form en isDataIndalid:", this.form);
  }




}
