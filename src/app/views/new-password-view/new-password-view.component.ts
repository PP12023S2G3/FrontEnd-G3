import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Comments } from 'src/app/models/Comment';

@Component({
  selector: 'app-new-password-view',
  templateUrl: './new-password-view.component.html',
  styleUrls: ['./new-password-view.component.css'],
  providers: [MessageService],
})
export class NewPasswordViewComponent {

  showPassword1: boolean = false;
  showPassword2: boolean = false;
  modalVisible: boolean = false;
  password = '';

  ngOnInit(): void {


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
 
}
