import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private api : string ='https://api-resultados.onrender.com/Diagnosticos/Feedback';
  private endpointBrain:string="/cerebro";
  private endpointHeart:string="/corazon";
  private endpointWrist:string="/muñeca";
  private endpointLungs:string="/pulmones";
  private endpointKidney:string="/riñones";
  private endpointKnee:string="/rodilla";

  constructor(private http: HttpClient) { }

  public postFeedbackBrain(data:FormData):Observable<any>{
    let url=this.api+this.endpointBrain;
    return this.http.post<any>(url,data).pipe(
      catchError(this.handleErrorPost));
  }
  public postFeedbackHeart(data: FormData): Observable<any> {
    let url = this.api + this.endpointHeart;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleErrorPost)
    );
  }

  public postFeedbackWrist(data: FormData): Observable<any> {
    let url = this.api + this.endpointWrist;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleErrorPost)
    );
  }

  public postFeedbackLungs(data: FormData): Observable<any> {
    let url = this.api + this.endpointLungs;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleErrorPost)
    );
  }

  public postFeedbackKidney(data: FormData): Observable<any> {
    let url = this.api + this.endpointKidney;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleErrorPost)
    );
  }

  public postFeedbackKnee(data: FormData): Observable<any> {
    let url = this.api + this.endpointKnee;
    return this.http.post<any>(url, data).pipe(
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

  //aca empiezan los metodos para crear request
  createRequestFeedbackBrain(imagen_id: number, glioma: boolean,meningioma : boolean, no_tumor: boolean, pituitary: boolean, comentario: string): FormData  {
    const formData = new FormData();
  formData.append('imagen_id', `${imagen_id}`);
  formData.append('glioma', `${glioma}`);
  formData.append('meningioma', `${meningioma}`);
  formData.append('no_tumor', `${no_tumor}`);
  formData.append('pituitary', `${pituitary}`);
  formData.append('comentario', comentario);

  return formData;
  }
  createRequestFeedbackHeart(imagen_id: number, contraccion_ventricular_prematura: boolean, fusion_de_latido_ventricular_y_normal: boolean, infarto_de_miocardio: boolean, latido_no_clasificable: boolean, latido_normal: boolean, latido_prematuro_supraventricular: boolean, comentario: string): FormData {
    const formData = new FormData();
    formData.append('imagen_id', `${imagen_id}`);
    formData.append('contraccion_ventricular_prematura', `${contraccion_ventricular_prematura}`);
    formData.append('fusion_de_latido_ventricular_y_normal', `${fusion_de_latido_ventricular_y_normal}`);
    formData.append('infarto_de_miocardio', `${infarto_de_miocardio}`);
    formData.append('latido_no_clasificable', `${latido_no_clasificable}`);
    formData.append('latido_normal', `${latido_normal}`);
    formData.append('latido_prematuro_supraventricular', `${latido_prematuro_supraventricular}`);
    formData.append('comentario', comentario);

    return formData;
  }

  createRequestFeedbackWrist(imagen_id: number, fractura: boolean, sin_fractura: boolean, comentario: string): FormData {
    const formData = new FormData();
    formData.append('imagen_id', `${imagen_id}`);
    formData.append('fractura', `${fractura}`);
    formData.append('sin_fractura', `${sin_fractura}`);
    formData.append('comentario', comentario);

    return formData;
  }

  createRequestFeedbackLungs(imagen_id: number,pneumonia: boolean, no_pneumonia: boolean, comentario: string): FormData {
    const formData = new FormData();
    formData.append('imagen_id', `${imagen_id}`);
    formData.append('pneumonia', `${pneumonia}`);
    formData.append('no_pneumonia', `${no_pneumonia}`);
    formData.append('comentario', comentario);

    return formData;
  }

  createRequestFeedbackKidney(imagen_id: number, quiste: boolean,piedra: boolean,tumor: boolean,normal: boolean, comentario: string): FormData {
    const formData = new FormData();
    formData.append('imagen_id', `${imagen_id}`);
    formData.append('quiste', `${quiste}`);
    formData.append('piedra', `${piedra}`);
    formData.append('tumor', `${tumor}`);
    formData.append('normal', `${normal}`);
    formData.append('comentario', comentario);

    return formData;
  }

  createRequestFeedbackKnee(imagen_id: number, rotura_lca: boolean, lca_sano: boolean, comentario: string): FormData {
    const formData = new FormData();
    formData.append('imagen_id', `${imagen_id}`);
    formData.append('rotura_lca', `${rotura_lca}`);
    formData.append('lca_sano', `${lca_sano}`);
    formData.append('comentario', comentario);

    return formData;
  }

}
