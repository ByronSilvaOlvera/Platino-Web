import { Injectable } from '@angular/core';
import { Menu, Paginacion, uidTipo } from '../models/menu';
import { Observable, pipe, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewUxService {

  menu: Menu={};
  private Menu$ = new Subject<Menu>();

  opcion: number=0;
  private opcion$ = new Subject<number>();
  
  private uid:uidTipo={uid:""};
  private clienteUid$ = new Subject<uidTipo>();

   pages:Paginacion={};
  private pagesUid$ = new Subject<Paginacion>();
  

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

  initPage(){
    this.pages = { page:1,completa:true }
    this.pagesUid$.next(this.pages);
  }

  addPage(n:Paginacion){
    this.pages = n;
    this.pagesUid$.next(this.pages);
  }

  getPage(): Observable<Paginacion>{
    return this.pagesUid$.asObservable();
  }

  // subPage(){
  //   --this.pages;
  //   this.pagesNull$.next(this.pages)
  // }

  // getPageNull() : Observable<number>{
  //   return this.pagesNull$.asObservable();
  // }

  /// UID

  addUId(uid:uidTipo){
    this.uid.uid = uid.uid;
    this.uid.tipo = uid.tipo;
    this.clienteUid$.next(this.uid);
  }
  
  getUId() : Observable<uidTipo> {
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
