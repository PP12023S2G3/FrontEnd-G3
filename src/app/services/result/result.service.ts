import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { DiagnosticResp } from 'src/app/models/DiagnosticResp';
import { DiagnosticsResp } from 'src/app/models/DiagnosticsResp';
import { PredictedResultHeart } from 'src/app/models/PredictedResultHeart';
import { PredictedResultBrain } from 'src/app/models/PredictedResultBrain';
import { PredictedResultLungs } from 'src/app/models/PredictedResultLungs';
import { PredictedResultKnee } from 'src/app/models/PredictedResultKnee';
import { PredictedResultKidney } from 'src/app/models/PredictedResultKidney';
import { PredictedResultWrist } from 'src/app/models/PredictedResultWrist';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private api : string ='https://api-resultados.onrender.com/Diagnosticos/';
  private endpointPredictResultBrain : string ='predecir/cerebro';
  private endpointPredictResultLungs : string ='predecir/pulmones';
  private endpointPredictResultWrist : string ='predecir/muñeca';
  private endpointPredictResultHeart : string ='predecir/corazon';
  private endpointPredictResultKnee : string ='predecir/rodilla';
  private endpointPredictResultKidney : string ='predecir/riñones';
  private endpointDiagnosticRecords : string ='historial';

  constructor(private http: HttpClient) { }

// ver tipos de datos de las respuestas, probar

  //para predecir en diagnostic enviando una imagen
  public postResultBrain(data:FormData):Observable<PredictedResultBrain>{
    let url=this.api+this.endpointPredictResultBrain;
    return this.http.post<PredictedResultBrain>(url,data).pipe(
      catchError(this.handleErrorPost));
  }
  public postResultHeart(data:FormData):Observable<PredictedResultHeart>{
    let url=this.api+this.endpointPredictResultHeart;
    return this.http.post<PredictedResultHeart>(url,data).pipe(
      catchError(this.handleErrorPost));
  }
  public postResultWrist(data:FormData):Observable<PredictedResultWrist>{
    let url=this.api+this.endpointPredictResultWrist;
    return this.http.post<PredictedResultWrist>(url,data).pipe(
      catchError(this.handleErrorPost));
  }
  public postResultLungs(data:FormData):Observable<PredictedResultLungs>{
    let url=this.api+this.endpointPredictResultLungs;
    return this.http.post<PredictedResultLungs>(url,data).pipe(
      catchError(this.handleErrorPost));
  }
  public postResultKidney(data:FormData):Observable<PredictedResultKidney>{
    let url=this.api+this.endpointPredictResultKidney;
    return this.http.post<PredictedResultKidney>(url,data).pipe(
      catchError(this.handleErrorPost));
  }
  public postResultKnee(data:FormData):Observable<PredictedResultKnee>{
    let url=this.api+this.endpointPredictResultKnee;
    return this.http.post<PredictedResultKnee>(url,data).pipe(
      catchError(this.handleErrorPost));
  }

   //para traer el resultado ya guardado desde historial
   public getRecord(id_diagnostico:number,rol_id:string):Observable<DiagnosticResp>{
    let url=this.api+`${id_diagnostico}`+`?rol_id=${rol_id}`;
    return this.http.get<DiagnosticResp>(url).pipe(
      catchError(this.handleErrorGet));
  }

   //recuperar el historial de un medico en particular o de todos
   public getRecordAll(id_usuario:string,rol_id:string):Observable<DiagnosticsResp>{
    let url=this.api+this.endpointDiagnosticRecords+`?id_usuario=${id_usuario}&rol_id=${rol_id}`;
    return this.http.get<DiagnosticsResp>(url).pipe(
      catchError(this.handleErrorGet));
  }

  private handleErrorPost(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.BadRequest) {
      // Verifica si la respuesta contiene un mensaje de error personalizado del backend
      if (error.error && error.error.Error) {
        return throwError(() => new Error(error.error.Error));
      } else {
        return throwError(() => new Error("Hay un problema con la solicitud"));
      }
    } else if (error.status === HttpStatusCode.NotFound) {
      return throwError(() => new Error("No se encuentra el contenido solicitado"));
    } else if (error.status === HttpStatusCode.BadRequest) {
      return throwError(() => new Error("Solicitud inválida"));
    }
    else if (error.status === HttpStatusCode.InternalServerError) {
      return throwError(() => new Error("Error al obtener la predicción del modelo"));
    }
    return throwError(() => new Error("Ups, algo salió mal"));
  }


  private handleErrorGet(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.BadRequest) {
      // Verifica si la respuesta contiene un mensaje de error personalizado del backend
      if (error.error && error.error.Error) {
        return throwError(() => new Error(error.error.Error));
      } else {
        return throwError(() => new Error("Hay un problema con la solicitud"));
      }
    } else if (error.status === HttpStatusCode.NotFound) {
      return throwError(() => new Error("No se encuentra el contenido solicitado"));
    } else if (error.status === HttpStatusCode.BadRequest) {
      return throwError(() => new Error("Solicitud inválida"));
    }
    else if (error.status === HttpStatusCode.InternalServerError) {
      return throwError(() => new Error("	Error interno del servidor"));
    }
    return throwError(() => new Error("Ups, algo salió mal"));
  }


}
