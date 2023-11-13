import { Component, OnInit} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { Comments } from 'src/app/models/Comment';

@Component({
    selector: 'resetPasswordScreen',
    templateUrl: './resetPassword.component.html',
    styleUrls: ['./resetPassword.component.css'],
    providers: [MessageService],
  })

  export class ResetPasswordComponent implements OnInit {
    dniReset: string = '';
    visible: boolean = false;
    comments!: Comments;
    messageOptions: { label: string; value: string; }[] | undefined;
  
    constructor(private messageService: MessageService) {
  
    }
    ngOnInit(): void {
    }

    onSubmit() {
        console.log (this.dniReset);
        if (this.dniReset == '') {
            this.showErrorEmpty();
        } else if (!this.validarDNIReset(this.dniReset)) {
            this.showErrorNotValid();
          } else {
            this.visible = true;
            this.desenfocarFondo();
          }
    }

    validarDNIReset(dni: string): boolean {
        return /^\d{7,8}$/.test(dni); //expresion regular 
      }

    desenfocarFondo() {
      var containerBlur = document.querySelector(".container-reset");
        containerBlur != null ? containerBlur.classList.add("blur-div"): ""; 
    }    
    
    showErrorEmpty() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No olvides agregar tu DNI' });
    }

    showErrorNotValid() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El DNI no es válido' });
    }


}