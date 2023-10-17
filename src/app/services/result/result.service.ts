import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private apiDiagnostic : string ='https://api-resultados.onrender.com/Diagnosticos/';

  constructor(private http: HttpClient) { }

  //para traer el resultado ya guardado desde historial
  public getResultado(id:String):Observable<any>{
    let url=this.apiDiagnostic + 'historial' + '/' + id;
    return this.http.get<any>(url);
  }

  //para predecir en diagnostic enviando una imagen
  public postResultado(data:FormData):Observable<any>{
    let url=this.apiDiagnostic+'predecir/cerebro';
    return this.http.post<any>(url,data);
  }
}
