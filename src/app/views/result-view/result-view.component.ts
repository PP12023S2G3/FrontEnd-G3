import { Component, OnInit } from '@angular/core';
import {Diagnostic}from './Diagnostic';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css']
})
export class ResultViewComponent implements OnInit {
  diagnostic: Diagnostic = new Diagnostic("","","","","","","","");
  responseData: any;

  constructor() {
  }
  

  ngOnInit(): void {
      this.diagnostic.doctor = "";
      this.diagnostic.age = "";
      this.diagnostic.weight="";
      this.diagnostic.height ="";
      this.diagnostic.gender ="";
      this.diagnostic.sectionBody = "";
      this.diagnostic.preconditions = "";
      this.diagnostic.resultDiagnostic = "";
  
    const storedResponseData = localStorage.getItem('responseData');
    if (storedResponseData) {
      this.responseData = JSON.parse(storedResponseData);
      // Haz algo con los datos recibidos
      console.log(this.responseData);
    }
  }
}
