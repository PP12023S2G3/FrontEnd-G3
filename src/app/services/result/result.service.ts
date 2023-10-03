import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private endpoint : string ='/imagen';
  private api : string ='https://api-resultados.onrender.com/Pruebas';

  constructor(private http: HttpClient) { }


  public postResultado(data:FormData):Observable<any>{
    let url=this.api+this.endpoint;
    return this.http.post<any>(url,data);
  }
}
