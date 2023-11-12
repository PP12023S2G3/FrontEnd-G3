import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

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

  constructor(private messageService: MessageService) {
  }

  onSubmit() {
    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(this.code)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El código debe contener sólo números' });
    } else {
      
      this.showModal(); 
    }
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
