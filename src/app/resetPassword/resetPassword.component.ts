import { Component, OnInit} from '@angular/core';
import { KeyFilterModule } from 'primeng/keyfilter';
@Component({
    selector: 'resetPasswordScreen',
    templateUrl: './resetPassword.component.html',
    styleUrls: ['./resetPassword.component.css']
  })

  export class ResetPasswordComponent implements OnInit {
    dniReset: string = '';
    ngOnInit(): void {
    }

    onSubmit() {
        console.log (this.dniReset);
        if (this.dniReset == '') {
            alert ('No olvides ingresar tu dni')
        } else if (!this.validarDNIReset(this.dniReset)) {
            alert('El DNI no es válido');
          } else {
            alert ('El DNI es válido');
          }
    }

    validarDNIReset(dni: string): boolean {
        return /^\d{7,8}$/.test(dni); //expresion regular 
      }
}