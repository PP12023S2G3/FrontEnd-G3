import { Component } from '@angular/core';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css']
})
export class ResultViewComponent {
  responseData: any;

  constructor() {
  }

  ngOnInit() {
    const storedResponseData = localStorage.getItem('responseData');
    if (storedResponseData) {
      this.responseData = JSON.parse(storedResponseData);
      // Haz algo con los datos recibidos
      console.log(this.responseData);
    }
  }
}
