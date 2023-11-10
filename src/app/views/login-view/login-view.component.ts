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
          this.router.navigate(['/diagnostico']);
      },
        error: (error: { message: any }) => {

        }

      });
    }
  }
}
