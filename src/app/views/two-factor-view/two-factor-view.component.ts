import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-two-factor-view',
  templateUrl: './two-factor-view.component.html',
  styleUrls: ['./two-factor-view.component.css'],
  providers: [MessageService],
})
export class TwofactorViewComponent {

  constructor(private messageService: MessageService) {
  }
  value: string = '';
  correctLength: boolean = false;

  isCorrectInput(): void {
    this.correctLength = this.value.length === 6;
  }

}
