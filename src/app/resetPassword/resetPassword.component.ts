import { Component, OnInit} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { Comments } from 'src/app/models/Comment';
import { UserAccountService } from '../services/userAccount/userAccount.service';
import { LoaderService } from '../shared/loader/loader.service';

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

    constructor(private messageService: MessageService,private userAccountService: UserAccountService, private loaderService: LoaderService) {

    }
    ngOnInit(): void {
      this.postAuth();
    }

    private postAuth() {
      const token= localStorage.getItem('token');

      if (token) {
      this.userAccountService.postAuth(token).subscribe({
        next: (res) => {
            this.userAccountService.saveDataInLocalStorage(res);
            this.userAccountService.redirectBasedOnUserRoleId();
        },
        error: (error: { message: any }) => {
          this.messageService.add({
            severity: 'error',
            summary: error.message,
            life: 2000,
          });
        }
      });
      }
    }
    onSubmit() {
        console.log (this.dniReset);
        if (this.dniReset == '') {
            this.showErrorEmpty();
        } else if (!this.validarDNIReset(this.dniReset)) {
            this.showErrorNotValid();
          } else {
            this.loaderService.updateIsLoading(true);
            this.postResetPasswordDni();
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

    postResetPasswordDni(){
      this.userAccountService.postResetPasswordDni(this.dniReset).subscribe({
        next: (res) => {
          this.visible = true;
          this.desenfocarFondo();
          this.loaderService.updateIsLoading(false);
        },
        error:  (error: { message: any }) => {
          this.messageService.add({
            severity: 'error',
            summary: error.message,
            life: 2000,
          });
          this.loaderService.updateIsLoading(false);
        }
      });
    }
}
