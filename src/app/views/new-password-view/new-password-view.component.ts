import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-new-password-view',
  templateUrl: './new-password-view.component.html',
  styleUrls: ['./new-password-view.component.css'],
  providers: [MessageService],
})
export class NewPasswordViewComponent {

  constructor(private messageService: MessageService, private userAccountService: UserAccountService, private loaderService: LoaderService) { };

  showPassword1: boolean = false;
  showPassword2: boolean = false;
  modalVisible: boolean = false;
  password1: string = '';
  password2: string = '';
  form = false;

  ngOnInit(): void {
    this.postAuth();
  }

  private postAuth() {
    const token = localStorage.getItem('token');
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
    if (this.password1 == '' || this.password2 == '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ambos campos son obligatorios', life: 2000 });
    } else {
      if (this.password1 == this.password2) {
        this.loaderService.updateIsLoading(true);
        this.postResetPassword();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden', life: 2000 });
      }
    }
    console.log('pass1: '+this.password1 + ' pass2: ' + this.password2);
  }

  logPassword(fieldName: string, event: any) {
    const target = event?.target as HTMLInputElement;
    if (target) {
      console.log(`${fieldName}: ${target.value}`);
    }
  }

  togglePasswordVisibility(num: number) {
    if (num == 1) {
      this.showPassword1 = !this.showPassword1;
      console.log(this.password1)
      console.log(this.password2)
    } else {
      this.showPassword2 = !this.showPassword2;
      console.log(this.password1)
      console.log(this.password2)
    }
  }

  showModal() {
    this.modalVisible = true;
    this.desenfocarFondo();
  }

  desenfocarFondo() {
    var containerBlur = document.querySelector(".body-new-password");
    containerBlur != null ? containerBlur.classList.add("blur-div") : "";
  }

  postResetPassword() {
    if(this.password1 != undefined && this.password2 != undefined){
      this.isDataIndalid();
      if (!this.form) {
        this.userAccountService.postResetPassword(this.password1, this.password2, localStorage.getItem('tokenReset') || '').subscribe({
          next: (res) => {
            this.showModal();
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
      }else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Datos erroneos por favor corregir',
          life: 2000,
        });
        
      }
    }
  }

  isDataIndalid() {
    const patternPassword = /^(?=.*[a-zñÑ])(?=.*[A-ZÑñ])(?=.*\d)[a-zA-Z0-9ñÑ]*$/
    const isPassword1Valid = this.password1 && this.password1.length >= 8 && patternPassword.test(this.password1);
    const isPassword2Valid = this.password2 && this.password2.length >= 8 && patternPassword.test(this.password2);

    if (isPassword1Valid && isPassword2Valid) {
      this.form = false;
    } else {
      this.form = true;
    }
  }
}
