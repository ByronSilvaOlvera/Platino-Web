import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { Observable, pipe, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewUxService {

  menu: Menu={};
  private Menu$ = new Subject<Menu>();

  opcion: number=0;
  private opcion$ = new Subject<number>();
  
  private uid:string='';
  private clienteUid$ = new Subject<string>();

  private pages:number=1;
  private pagesUid$ = new Subject<number>();

  private ruta:string="";
  private rutaLink$ = new Subject<string>();

  constructor() { 
    
  }

  // Ruta

  addRuta(n:string){
    this.ruta = n;
    this.rutaLink$.next(this.ruta);
  }
  getRuta(): Observable<string>{
    return this.rutaLink$.asObservable();
  }



  // PAGES

  addPage(n:number){
    this.pages = n;
    this.pagesUid$.next(this.pages);
  }
  getPage(): Observable<number>{
    return this.pagesUid$.asObservable();
  }


  /// UID

  addUId(uid:string){
    this.uid = uid;
    this.clienteUid$.next(this.uid);
  }
  
  getUId() : Observable<string> {
    return this.clienteUid$.asObservable();
  }


  // SUBMENU
  addOption(n:number){
    this.opcion = n;
    this.opcion$.next(this.opcion);
  }
  getOption() : Observable<number>{
    return this.opcion$.asObservable();
  }

  /// MENU PRINCIPAL
  getMenu() : Observable<Menu> {
    return this.Menu$.asObservable();
  }

  addMenuChoose(menu:Menu){
    this.menu = menu;
    this.Menu$.next(this.menu);
  }



}
