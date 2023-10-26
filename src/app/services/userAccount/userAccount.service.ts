import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DoctorResp } from 'src/app/models/DoctorResp';
import { SuccessfulRegistrationResp } from 'src/app/models/SuccessfulRegistrationResp';
import { SuccessfulLogInResp } from 'src/app/models/SuccessfulLogInResp';
import { LogInRequest } from 'src/app/models/LogInRequest';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private apiUsers : string ='https://api-resultados.onrender.com/Usuarios/';
  private endpointDoctors: string='medicos';
  private endpointSignIn: string='registro';
  private endpointLogIn: string='login';

  constructor(private http: HttpClient) { }

// ver tipos de datos de las respuestas, probar

  //para que usuario se registre
    public postSignIn(data:FormData):Observable<SuccessfulRegistrationResp>{
    let url=this.apiUsers+this.endpointSignIn;
    return this.http.post<SuccessfulRegistrationResp>(url,data);
  }

  //para que usuario se loguee
  public postLogIn(logInRequest:LogInRequest):Observable<SuccessfulLogInResp>{
    let url=this.apiUsers+this.endpointLogIn;
    return this.http.post<SuccessfulLogInResp>(url,logInRequest);
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

}
