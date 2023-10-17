import { Component, OnInit} from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'resetPasswordScreen',
    templateUrl: './resetPassword.component.html',
    styleUrls: ['./resetPassword.component.css']
  })

  export class ResetPasswordComponent implements OnInit {
    dniReset: string = '';
    visible: boolean = false;
    ngOnInit(): void {
    }

    onSubmit() {
        console.log (this.dniReset);
        if (this.dniReset == '') {
            alert ('No olvides ingresar tu dni')
        } else if (!this.validarDNIReset(this.dniReset)) {
            alert('El DNI no es válido');
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
}