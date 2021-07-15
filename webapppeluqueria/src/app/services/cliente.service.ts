import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente, ResponseCliente, PaginacionCliente } from '../models/cliente';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlbase = 'http://localhost:8092/peluqueria/api';
 

  constructor(private http : HttpClient) { }

  addEntidad(data : Cliente): Observable<ResponseCliente>{
    let url = `${this.urlbase}/cliente/add/`
    return this.http.post<ResponseCliente>(url , data);
    
  }
  
  getEntidad(uid: string) : Observable<ResponseCliente> {
    let url = `${this.urlbase}/cliente/one/${uid}/`;
    return this.http.get<ResponseCliente>(url);
  }

  getAllEntidad(page : number): Observable<PaginacionCliente>{
    let url = `${this.urlbase}/cliente/all/page/${page}/`;
    return this.http.get<PaginacionCliente>(url)
  }
  
  updateEntidad(data: Cliente){}

}
