import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';

@Component({
  selector: 'app-inicio-view',
  templateUrl: './inicio-view.component.html',
  styleUrls: ['./inicio-view.component.css']
})
export class InicioViewComponent {

  constructor(private userAccountService: UserAccountService,private messageService: MessageService,private router: Router){}

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

}
