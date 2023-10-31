import { Injectable } from '@angular/core';
import { Result } from '../Result';

@Injectable({
    providedIn: 'root'
  })

export class ResultcDTO {

  result!: Result;

  constructor() { }

  setCompanyInformation(diagnosticInformation: any){
    this.result= diagnosticInformation;  }

  getCompanyInformation(){
    return this.result;
  }

}
