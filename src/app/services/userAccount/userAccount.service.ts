import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, pipe, throwError } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders,  HttpResponse,  HttpStatusCode } from '@angular/common/http';
import { DoctorResp } from 'src/app/models/DoctorResp';
import { SuccessfulRegistrationResp } from 'src/app/models/SuccessfulRegistrationResp';
import { SuccessfulLogInResp } from 'src/app/models/SuccessfulLogInResp';
import { LogInRequest } from 'src/app/models/LogInRequest';
import { UserWithToken } from 'src/app/models/UserWithToken';
import { Role } from 'src/app/models/roles';
import { CheckCodeResp } from 'src/app/models/CheckCodeResp';
import { ResetPasswordDniResp } from 'src/app/models/ResetPasswordDniResp';
import { Router } from '@angular/router';
import { ContactResp } from 'src/app/models/ContactResp';

const USER_LOCAL_STORAGE_KEY = 'userData';
const USERID_LOCAL_STORAGE_KEY = 'userId';
const ROLE_LOCAL_STORAGE_KEY = 'role';
const ROLEID_LOCAL_STORAGE_KEY = 'roleId';
const TOKEN_LOCAL_STORAGE_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private apiUsers : string ='https://api-resultados.onrender.com/Usuarios/';
  private endpointDoctors: string='medicos';
  private endpointSignIn: string='registro';
  private endpointLogIn: string='login';
  private endpointAuth: string='verificarUsuario';
  private endpointCheckCode: string='check_code';
  private endpointResetPasswordDni: string='reset_pass';
  private endpointResetPassword: string='reset_password';
  private endpointContact: string='contacto';

  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));
  userId:any;
  roleId:any;
  userData: any;
  userRole!: Role ;
  especialidadByRoleid4 = 'Medico';
  especialidadByRoleid3 = 'ProfDelaSalud';
  userWithToken!:any;

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromLocalStorage();
    this.roleId = localStorage.getItem(ROLEID_LOCAL_STORAGE_KEY);
    this.userId = localStorage.getItem(USERID_LOCAL_STORAGE_KEY);
    const userString = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (userString)
      this.userData = JSON.parse(userString);
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
  //para que usuario se pueda autenticar con token
  public postAuth(token:string):Observable<SuccessfulLogInResp>{
    let url=this.apiUsers+this.endpointAuth;
    return this.http.post<SuccessfulLogInResp>(url,{token:`${token}`}).pipe(
      catchError(this.handleErrorLogin));
  }

  // Servicio postCheckCode
  public postCheckCode(codigo: string): Observable<CheckCodeResp> {
    let url = this.apiUsers + this.endpointCheckCode + `?codigo=${codigo}`;
    const options = { withCredentials: true };
    return this.http.post<CheckCodeResp>(url, null,options);
  }

  // Servicio postResetPassword
  public postResetPassword(new_password: string, confirm_password: string): Observable<any> {
    let url = this.apiUsers + this.endpointResetPassword + `?new_password=${new_password}&confirm_password=${confirm_password}`;
    const options = { withCredentials: true };
    return this.http.post<any>(url, null,options);
  }

  //para que usuario cambie su contraseña
  public postResetPasswordDni(dni:String):Observable<ResetPasswordDniResp>{
    let url=this.apiUsers+this.endpointResetPasswordDni+`/${dni}`;
    return this.http.post<ResetPasswordDniResp>(url,null);
  }

   //para obtener una lista de medicos
   public getDoctors():Observable<DoctorResp[]>{
    let url=this.apiUsers+this.endpointDoctors;
    return this.http.get<DoctorResp[]>(url);
  }

   //para obtener una lista de medicos
   public postContacto(nombre_apellido:string,email:string,mensaje:string):Observable<ContactResp>{
    let url=this.apiUsers+this.endpointContact + `?nombre_apellido=${nombre_apellido}&email=${email}&mensaje=${mensaje}`;
    return this.http.post<ContactResp>(url,null);
  }

  saveDataInLocalStorage(response: any): void {
    const userToken = response.token;

    if(response.rol_id == 4) {
      response.especialidad = this.especialidadByRoleid4;
    }
    else if (response.rol_id == 3) {
      response.especialidad = this.especialidadByRoleid3;
    }

   const userWithToken: UserWithToken = {
        username: response.nombre,
        userlastname: response.apellido,
        dni: response.dni,
        role: response.especialidad,
        token: response.token,
    };


    this.userRole = response.especialidad;
    this.pushNewUser(userWithToken);
    this.userId = response.id;
    this.saveUserDataToLocalStore(response);
    this.saveRoleIdToLocalStore(response.rol_id);
    this.saveRoleToLocalStore(response.especialidad);
    this.saveIdUserToLocalStore(this.userId);
    this.saveTokenToLocalStore(response.token);
    }
    saveRoleIdToLocalStore(roleId: any) {
    localStorage.setItem(ROLEID_LOCAL_STORAGE_KEY, roleId);
    }
    saveUserDataToLocalStore(user: any): void {
      const userString = JSON.stringify(user);
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, userString);
    }

    saveTokenToLocalStore(token: any) {
      !localStorage.getItem('token')&&localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
    }

    saveRoleToLocalStore(role: any) {
      localStorage.setItem(ROLE_LOCAL_STORAGE_KEY, role);
    }

    saveIdUserToLocalStore(userId: string): void {
      localStorage.setItem(USERID_LOCAL_STORAGE_KEY, userId);
    }

  private pushNewUser(userWithToken: UserWithToken) {
    this.user.next(userWithToken);
  }

    getCurrentUser(): UserWithToken | null {
      return this.user.getValue();
    }

    public loadUserFromLocalStorage(): void {
      const userToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
      const rol = localStorage.getItem(ROLE_LOCAL_STORAGE_KEY);
      if (userToken) {
        const userWithToken: UserWithToken = {
          username: '',
          userlastname: '',
          dni: '',
          token: userToken,
          role: rol || ''
        };
        this.pushNewUser(userWithToken);
    }
  }

  clearLocalStorage() {
    localStorage.clear();
    this.user.next(null);
  }

  public redirectBasedOnUserRoleId() {
    const currentUrl = this.router.url;
    switch (parseInt(this.roleId)) {
      case 1:
      case 3:
        if (currentUrl !== '/diagnostico') {
          this.router.navigate(['/diagnostico']);
          console.log("case1,2");
        }
        break;
      case 4:
        if (currentUrl !== '/historial') {
          this.router.navigate(['/historial']);
          console.log("case4");
        }
        break;
      default:
        console.log("casenada");
        // No redirigir si no hay un rol correspondiente
        break;
    }
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
