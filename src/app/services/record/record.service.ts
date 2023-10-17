import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private apiDiagnostic : string ='https://api-resultados.onrender.com/Diagnosticos/';

  constructor(private http: HttpClient) { }

  //recuperar el historial de todos los medicos
  public getAllRecords():Observable<any>{
    let url=this.apiDiagnostic
    return this.http.get<any>(url);
  }

  //recuperar el historial de un medico en particular
  public getRecords(id:String):Observable<any>{
    let url=this.apiDiagnostic+'predecir/cerebro';
    return this.http.get<any>(url);
  }
}
