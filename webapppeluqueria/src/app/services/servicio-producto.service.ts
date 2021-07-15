import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseSerProducto } from '../models/servporduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioProductoService {

  urlbase = 'http://localhost:8092/peluqueria/api';

  constructor(private http : HttpClient) { }


  getAllEntidad(page : number): Observable<ResponseSerProducto>{
    let url = `${this.urlbase}/servicio/all/page/${page}/`;
    return this.http.get<ResponseSerProducto>(url)
  }


}
