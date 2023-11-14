import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Comments } from 'src/app/models/Comment';
import { PasswordModule } from 'primeng/password';
import { User } from 'src/app/models/User';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';

@Component({
  selector: 'app-new-password-view',
  templateUrl: './new-password-view.component.html',
  styleUrls: ['./new-password-view.component.css'],
  providers: [MessageService],
})
export class NewPasswordViewComponent {

  constructor(private messageService: MessageService,private userAccountService: UserAccountService) {};


  showPassword1: boolean = false;
  showPassword2: boolean = false;
  modalVisible: boolean = false;
  password1: string = '';
  password2: string = '';


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
    if (this.password1 == '' || this.password2 == '') {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Ambos campos son obligatorios', life: 2000});
    } else {
      if(this.password1 == this.password2) {
        this.postResetPassword();
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden', life: 2000});
      }
    }
    console.log(this.password1 + ' y ' + this.password2);


  }

  togglePasswordVisibility(num: number) {
    if (num == 1) {
      this.showPassword1 = !this.showPassword1;
    } else {
      this.showPassword2 = !this.showPassword2;
    }
  }

  showModal() {
    this.modalVisible = true;
    this.desenfocarFondo();
  }
  desenfocarFondo() {
    var containerBlur = document.querySelector(".body-new-password");
      containerBlur != null ? containerBlur.classList.add("blur-div"): "";
  }

  postResetPassword(){
    this.userAccountService.postResetPassword(this.password1,this.password2,localStorage.getItem('tokenReset')||'').subscribe({
      next: (res) => {
        this.showModal();
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
