import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent {
  constructor(private userAccountService: UserAccountService,private router: Router){}

  ngOnInit(): void {
    this.postAuth();
  }

  private postAuth() {
    const token= localStorage.getItem('token');

    if (token) {
    this.userAccountService.postAuth(token).subscribe({
      next: (res) => {
          this.userAccountService.saveDataInLocalStorage(res);
          this.redirectBasedOnUserRoleId(this.userAccountService.roleId);
      },
        error: (error: { message: any }) => {

        }

      });
    }
  }



  private redirectBasedOnUserRoleId(userRoleId: number) {
    switch (userRoleId) {
      case 1:
      case 3:
        this.router.navigate(['/diagnostico']);
        break;
      case 4:
        this.router.navigate(['/historial']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}



