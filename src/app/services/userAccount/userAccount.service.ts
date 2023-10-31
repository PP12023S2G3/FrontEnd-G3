import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { DoctorResp } from 'src/app/models/DoctorResp';
import { SuccessfulRegistrationResp } from 'src/app/models/SuccessfulRegistrationResp';
import { SuccessfulLogInResp } from 'src/app/models/SuccessfulLogInResp';
import { LogInRequest } from 'src/app/models/LogInRequest';

const USER_LOCAL_STORAGE_KEY = 'userData';
const USERID_LOCAL_STORAGE_KEY = 'userId';
const ROLE_LOCAL_STORAGE_KEY = 'role';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private apiUsers : string ='https://api-resultados.onrender.com/Usuarios/';
  private endpointDoctors: string='medicos';
  private endpointSignIn: string='registro';
  private endpointLogIn: string='login';
  private user = new BehaviorSubject<SuccessfulLogInResp | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));
  userId:any;

  constructor(private http: HttpClient) {
    this.loadUserFromLocalStorage();
    this.userId = localStorage.getItem(USERID_LOCAL_STORAGE_KEY);
  }

// ver tipos de datos de las respuestas, probar

  //para que usuario se registre
    public postSignIn(data:FormData):Observable<SuccessfulRegistrationResp>{
    let url=this.apiUsers+this.endpointSignIn;
    return this.http.post<SuccessfulRegistrationResp>(url,data).pipe(
      catchError(this.handleError));
  }

  //para que usuario se loguee
  public postLogIn(logInRequest:LogInRequest):Observable<SuccessfulLogInResp>{
    let url=this.apiUsers+this.endpointLogIn;
    return this.http.post<SuccessfulLogInResp>(url,logInRequest).pipe(
      catchError(this.handleErrorLogin));
  }

  //para que usuario resetee su contraseña
  public postResetPassword(data:FormData):Observable<any>{
    let url='http://localhost:5001/usuariosResetPW';
   //mockUrl
    return this.http.post<any>(url,data);
  }

  //para que usuario cambie su contraseña
  public postNewPassword(data:FormData):Observable<any>{
    let url='http://localhost:5001/usuariosResetPW';
   //mockUrl
    return this.http.post<any>(url,data);
  }

   //para obtener una lista de medicos
   public getDoctors():Observable<DoctorResp[]>{
    let url=this.apiUsers+this.endpointDoctors;
    return this.http.get<DoctorResp[]>(url);
  }

  saveDataInLocalStorage(response: any): void {
    const userToken = response.access_token;
    const user: SuccessfulLogInResp = {
      id: response.id,
      nombre: response.nombre,
      rol_id: response.rol_id,
      dni: response.dni,
      email: response.email,
      especialidad: response.especialidad,
      establecimiento_id: response.establecimiento_id,
      token: response.token
    };
    this.userId = response.id;
    this.saveRoleToLocalStore(response.rol_id);
    this.saveIdUserToLocalStore(this.userId);
  }

  saveRoleToLocalStore(role: any) {
    localStorage.setItem(ROLE_LOCAL_STORAGE_KEY, role);
  }

  saveIdUserToLocalStore(userId: string): void {
    localStorage.setItem(USERID_LOCAL_STORAGE_KEY, userId);
  }

  private loadUserFromLocalStorage(): void {
    localStorage.getItem(USERID_LOCAL_STORAGE_KEY);
    localStorage.getItem(ROLE_LOCAL_STORAGE_KEY);
  }

//TODO: cuando se tengan los errores del back sacar un handleError.

  private handleError(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.BadRequest) {
      // Verifica si la respuesta contiene un mensaje de error personalizado del backend
      if (error.error && error.error.Error) {
        return throwError(() => new Error(error.error.Error));
      } else {
        return throwError(() => new Error("Hay un problema con la solicitud"));
      }
    } else if (error.status === HttpStatusCode.NotFound) {
      return throwError(() => new Error("No se encuentra el contenido solicitado"));
    } else if (error.status === HttpStatusCode.Conflict) {
      return throwError(() => new Error("El usuario ya está registrado"));
    }
    else if (error.status === HttpStatusCode.InternalServerError) {
      return throwError(() => new Error("Error interno del servidor"));
    }
    else if (error.status === HttpStatusCode.BadRequest) {
      return throwError(() => new Error("Solicitud inválida"));
    }
    return throwError(() => new Error("Ups, algo salió mal"));
  }

  private handleErrorLogin(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.BadRequest) {
      // Verifica si la respuesta contiene un mensaje de error personalizado del backend
      if (error.error && error.error.Error) {
        return throwError(() => new Error(error.error.Error));
      } else {
        return throwError(() => new Error("Hay un problema con la solicitud"));
      }
    } else if (error.status === HttpStatusCode.NotFound) {
      return throwError(() => new Error("El usuario ingresado no existe"));
    } else if (error.status === HttpStatusCode.Unauthorized) {
      return throwError(() => new Error("Credenciales invalidas"));
    }
    else if (error.status === HttpStatusCode.InternalServerError) {
      return throwError(() => new Error("	Error interno del servidor"));
    }
    return throwError(() => new Error("Ups, algo salió mal"));
  }

}
