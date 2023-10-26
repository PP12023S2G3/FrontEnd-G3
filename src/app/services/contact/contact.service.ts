import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private api : string ='https://api-resultados.onrender.com/Diagnosticos/';
  private endpointPredictResultCerebro : string ='predecir/cerebro';
  private endpointPredictResultPulmones : string ='predecir/pulmones';
  private endpointDiagnosticRecords : string ='historial';

  constructor(private http: HttpClient) { }

// ver tipos de datos de las respuestas, probar

  //para predecir en diagnostic enviando una imagen
  public postContact(data:FormData):Observable<any>{
    let url=this.api+this.endpointPredictResultCerebro;
    return this.http.post<any>(url,data);
  }
}
