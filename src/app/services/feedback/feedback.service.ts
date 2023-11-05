import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private api : string ='https://api-resultados.onrender.com/Feedback';
  private endpointBrain:string="/cerebro";
  private endpointHeart:string="/corazon";
  private endpointWrist:string="/muñeca";
  private endpointLungs:string="/pulmones";
  private endpointKidney:string="/riñones";
  private endpointKnee:string="/rodilla";

  constructor(private http: HttpClient) { }

  public postFeedbackBrain(imagen_id: number, glioma: boolean, meningioma: boolean, pituitary: boolean, no_tumor: boolean, comentario: string): Observable<any> {
    let url = this.api + this.endpointBrain + `?imagen_id=${imagen_id}&glioma=${glioma}&meningioma=${meningioma}&pituitary=${pituitary}&no_tumor=${no_tumor}&comentario=${comentario}`;
    return this.http.post<any>(url, null).pipe(
      catchError(this.handleErrorPost)
    );
  }

  public postFeedbackHeart(imagen_id: number, contraccion_ventricular_prematura: boolean, fusion_de_latido_ventricular_y_normal: boolean, infarto_de_miocardio: boolean, latido_no_clasificable: boolean, latido_normal: boolean, latido_prematuro_supraventricular: boolean, comentario: string): Observable<any> {
    let url = this.api + this.endpointHeart + `?imagen_id=${imagen_id}&contraccion_ventricular_prematura=${contraccion_ventricular_prematura}&fusion_de_latido_ventricular_y_normal=${fusion_de_latido_ventricular_y_normal}&infarto_de_miocardio=${infarto_de_miocardio}&latido_no_clasificable=${latido_no_clasificable}&latido_normal=${latido_normal}&latido_prematuro_supraventricular=${latido_prematuro_supraventricular}&comentario=${comentario}`;
    return this.http.post<any>(url, null).pipe(
      catchError(this.handleErrorPost)
    );
  }

  public postFeedbackWrist(imagen_id: number, fractura: boolean, sano: boolean, comentario: string): Observable<any> {
    let url = this.api + this.endpointWrist + `?imagen_id=${imagen_id}&fractura=${fractura}&sano=${sano}&comentario=${comentario}`;
    return this.http.post<any>(url, null).pipe(
      catchError(this.handleErrorPost)
    );
  }

  public postFeedbackLungs(imagen_id: number, pneumonia: boolean, no_pneumonia: boolean, comentario: string): Observable<any> {
    let url = this.api + this.endpointLungs + `?imagen_id=${imagen_id}&pneumonia=${pneumonia}&no_pneumonia=${no_pneumonia}&comentario=${comentario}`;
    return this.http.post<any>(url, null).pipe(
      catchError(this.handleErrorPost)
    );
  }

  public postFeedbackKidney(imagen_id: number, quiste: boolean, piedra: boolean, tumor: boolean, normal: boolean, comentario: string): Observable<any> {
    let url = this.api + this.endpointKidney + `?imagen_id=${imagen_id}&quiste=${quiste}&piedra=${piedra}&tumor=${tumor}&normal=${normal}&comentario=${comentario}`;
    return this.http.post<any>(url, null).pipe(
      catchError(this.handleErrorPost)
    );
  }

  public postFeedbackKnee(imagen_id: number, rotura_lca: boolean, lca_sano: boolean, comentario: string): Observable<any> {
    let url = this.api + this.endpointKnee + `?imagen_id=${imagen_id}&rotura_lca=${rotura_lca}&lca_sano=${lca_sano}&comentario=${comentario}`;
    return this.http.post<any>(url, null).pipe(
      catchError(this.handleErrorPost)
    );
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
