import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DiagnosticResp } from 'src/app/models/DiagnosticResp';
import { DiagnosticsResp } from 'src/app/models/DiagnosticsResp';
import { PredictedResultHeart } from 'src/app/models/PredictedResultHeart';
import { PredictedResultBrain } from 'src/app/models/PredictedResultBrain';
import { PredictedResultLungs } from 'src/app/models/PredictedResultLungs';
import { PredictedResultKnee } from 'src/app/models/PredictedResultKnee';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private api : string ='https://api-resultados.onrender.com/Diagnosticos/';
  private endpointPredictResultBrain : string ='predecir/cerebro';
  private endpointPredictResultLungs : string ='predecir/pulmones';
  private endpointPredictResultHeart : string ='predecir/corazon';
  private endpointPredictResultKnee : string ='predecir/rodilla';
  private endpointDiagnosticRecords : string ='historial';

  constructor(private http: HttpClient) { }

// ver tipos de datos de las respuestas, probar

  //para predecir en diagnostic enviando una imagen
  public postResultBrain(data:FormData):Observable<PredictedResultBrain>{
    let url=this.api+this.endpointPredictResultBrain;
    return this.http.post<PredictedResultBrain>(url,data);
  }
  public postResultLungs(data:FormData):Observable<PredictedResultLungs>{
    let url=this.api+this.endpointPredictResultLungs;
    return this.http.post<PredictedResultLungs>(url,data);
  }
  public postResultHeart(data:FormData):Observable<PredictedResultHeart>{
    let url=this.api+this.endpointPredictResultHeart;
    return this.http.post<PredictedResultHeart>(url,data);
  }
  public postResultKnee(data:FormData):Observable<PredictedResultKnee>{
    let url=this.api+this.endpointPredictResultKnee;
    return this.http.post<PredictedResultKnee>(url,data);
  }

   //para traer el resultado ya guardado desde historial
   public getRecord(id_diagnostico:number,rol_id:string):Observable<DiagnosticResp>{
    let url=this.api+`${id_diagnostico}`+`?rol_id=${rol_id}`;
    return this.http.get<DiagnosticResp>(url);
  }

   //recuperar el historial de un medico en particular o de todos
   public getRecordAll(id_usuario:string,rol_id:string):Observable<DiagnosticsResp>{
    let url=this.api+this.endpointDiagnosticRecords+`?id_usuario=${id_usuario}&rol_id=${rol_id}`;
    return this.http.get<DiagnosticsResp>(url);
  }
}
