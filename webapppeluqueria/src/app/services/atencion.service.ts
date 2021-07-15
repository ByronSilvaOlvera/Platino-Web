import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AtencionResponse, Atencion } from '../models/atencion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  urlbase = 'http://localhost:8092/peluqueria/api';

  constructor(private http : HttpClient) {
  }
  
  addEntidad(data : Atencion): Observable<AtencionResponse>{
    let url = `${this.urlbase}/atencion/add/`
    return this.http.post<AtencionResponse>(url , data);
    
  }

}
