import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PredictedResult } from 'src/app/models/PredictedResult';
import { DiagnosticResp } from 'src/app/models/DiagnosticResp';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private api : string ='https://api-resultados.onrender.com/Diagnosticos/';
  private endpointPredictResult : string ='predecir/cerebro';
  private endpointDiagnosticRecords : string ='historial';

  constructor(private http: HttpClient) { }

  //para traer el resultado ya guardado desde historial
  public getResult(id:String):Observable<DiagnosticResp>{
    let url=this.api + id;
    return this.http.get<DiagnosticResp>(url);
  }

  //para predecir en diagnostic enviando una imagen
  public postResult(data:FormData):Observable<PredictedResult>{
    let url=this.api+this.endpointPredictResult;
    return this.http.post<PredictedResult>(url,data);
  }

   //recuperar el historial de un medico en particular o de todos
   public getRecords(data:FormData):Observable<any>{
    let url=this.api+this.endpointDiagnosticRecords;
    return this.http.get<any>(url);
  }
}
