import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { Observable, pipe, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewUxService {

  menu: Menu={};
  private subMenu$ = new Subject<Menu>();
  opcion: number=0;
  private opcion$ = new Subject<number>();
  
  constructor() { 
    
  }

  addOption(n:number){
    this.opcion = n;
    this.opcion$.next(this.opcion);
  }
  getOption(){
    return this.opcion$.asObservable();
  }

  getMenuOption(){
    return this.subMenu$.asObservable();
  }

  addMenuChoose(menu:Menu){
    this.menu = menu;
    this.subMenu$.next(this.menu);
  }



}
