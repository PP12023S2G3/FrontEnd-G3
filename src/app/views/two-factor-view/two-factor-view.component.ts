import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-two-factor-view',
  templateUrl: './two-factor-view.component.html',
  styleUrls: ['./two-factor-view.component.css'],
  providers: [MessageService],
})
export class TwofactorViewComponent {
  code: string = '';
  correctLength: boolean = false;
  modalVisible: boolean = false;
  numeric = "^[0-9]+$";

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
    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(this.code)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El código debe contener sólo números' });
    } else {
      this.postCheckCode();
      this.loaderService.updateIsLoading(true);
    }
  }

  private postCheckCode() {
    this.userAccountService.postCheckCode(this.code).subscribe({
      next: (res) => {
        localStorage.setItem('tokenReset',res.token);
        this.showModal();
        this.loaderService.updateIsLoading(false);
      },
      error: (error: { message: any; }) => {
        this.messageService.add({
          severity: 'error',
          summary: 'El código es inválido',
          life: 2000,
        });
        this.loaderService.updateIsLoading(false);
      }
    });
  }

  isCorrectInput(): void {
    this.correctLength = this.code.length === 6;
  }

  showModal() {
    this.modalVisible = true;
    this.desenfocarFondo();
  }
  desenfocarFondo() {
    var containerBlur = document.querySelector(".body-two-factor");
      containerBlur != null ? containerBlur.classList.add("blur-div"): "";
  }

}
