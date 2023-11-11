import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-two-factor-view',
  templateUrl: './two-factor-view.component.html',
  styleUrls: ['./two-factor-view.component.css'],
  providers: [MessageService],
})
export class TwofactorViewComponent {
  value: string = '';
  correctLength: boolean = false;
  modalVisible: boolean = false;

  constructor(private messageService: MessageService) {
  }

  isCorrectInput(): void {
    this.correctLength = this.value.length === 6;
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
