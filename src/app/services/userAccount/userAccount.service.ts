import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private apiUsers : string ='https://api-resultados.onrender.com/Usuarios/';
  private endpointDoctors: string='medicos';

  constructor(private http: HttpClient) { }

  //para que usuario se registre
    public postSignIn(data:FormData):Observable<any>{
    let url='predecir/cerebro';
    return this.http.post<any>(url,data);
  }

  //para que usuario se loguee
  public postLogin(data:FormData):Observable<any>{
    let url='predecir/cerebro';
    return this.http.post<any>(url,data);
  }

  //para que usuario resetee su contraseña
  public postResetPassword(data:FormData):Observable<any>{
    let url='predecir/cerebro';
   //mockUrl
    return this.http.post<any>(url,data);
  }

   //para obtener una lista de medicos
   public getDoctors():Observable<any>{
    let url=this.apiUsers+this.endpointDoctors;
    return this.http.get<any>(url);
  }

}
