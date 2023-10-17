import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private apiDiagnostic : string ='https://api-resultados.onrender.com/Diagnosticos/';

  constructor(private http: HttpClient) { }


  public postLogin(data:FormData):Observable<any>{
    let url=this.apiDiagnostic+'predecir/cerebro';
    return this.http.post<any>(url,data);
  }

  public postResetPassword(data:FormData):Observable<any>{
    let url=this.apiDiagnostic+'predecir/cerebro';
    return this.http.post<any>(url,data);
  }
}
