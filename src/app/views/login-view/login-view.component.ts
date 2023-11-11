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

  }




}
