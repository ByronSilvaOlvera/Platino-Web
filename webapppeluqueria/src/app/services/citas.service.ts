import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita, CitaPaginacion, ResponseCita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  urlbase = 'http://localhost:8092/peluqueria/api';

  constructor(private http : HttpClient) { }

  addEntidad(data : Cita): Observable<ResponseCita>{
    let url = `${this.urlbase}/cita/add/`
    return this.http.post<ResponseCita>(url , data);
    
  }
  
  getEntidad(uid: string) : Observable<ResponseCita> {
    let url = `${this.urlbase}/cita/one/${uid}/`;
    return this.http.get<ResponseCita>(url);
  }

  getAllEntidad(page : number): Observable<CitaPaginacion>{
    let url = `${this.urlbase}/cita/all/page/${page}/`;
    return this.http.get<CitaPaginacion>(url)
  }
  
  updateEntidad(data: Cita, uid:string) : Observable<ResponseCita>  {
    let url = `${this.urlbase}/cita/edit/${uid}/`;
    return this.http.put<ResponseCita>(url, data)
  }

  /* */
  getOneClienteId(uid:string) : Observable<ResponseCita> {
    let url = `${this.urlbase}/cita/cliente/${uid}/`;
    return this.http.get<ResponseCita>(url)
  }
  
  deleteEntidad(uid:string) : Observable<ResponseCita>{
    let url = `${this.urlbase}/cita/delete/${uid}/`;
    return this.http.delete<ResponseCita>(url)
  }


}
