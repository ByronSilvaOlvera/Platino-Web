import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AtencionResponse, Atencion, AtencionPage } from '../models/atencion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  urlbase = 'http://localhost:8092/peluqueria/api';

  constructor(private http : HttpClient) {
  }
  
  addEntidad(data : Atencion): Observable<AtencionResponse>{
    console.log(data);
    
    let url = `${this.urlbase}/atencion/add/`
    return this.http.post<AtencionResponse>(url , data);
    
  }

  getAllEntidad(page : number): Observable<AtencionPage>{
    let url = `${this.urlbase}/atencion/all/page/${page}/`;
    return this.http.get<AtencionPage>(url)
  }

  getEntidad(uid: string) : Observable<AtencionResponse> {
    let url = `${this.urlbase}/atencion/one/${uid}/`;
    return this.http.get<AtencionResponse>(url);
  }

}
