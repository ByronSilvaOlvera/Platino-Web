import { Component, Input, OnInit } from '@angular/core';
import { GridTb, GridTable, HeaderGridTable } from '../../models/grid-table';
import { ViewUxService } from '../../services/view-ux.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { decrement, incompleta, increment } from 'src/app/store/page.actions';
import { AppState, Paginacion, Menu } from '../../models/menu';
import { reset, componente, uidComponente } from '../../store/page.actions';
import { Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'app-grid-data',
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.scss']
})
export class GridDataComponent implements OnInit {

  @Input() table:GridTable [] = [];
  @Input() header:HeaderGridTable [] = [];
  @Input() namePage:string=''
  @Input() numpage:number= 0;
  @Input() componente:string='';
  
  @Output() newItemEvent = new EventEmitter<string>();
  


  count: Paginacion = {page :0, completa:true, numberPage:0}; 
  @Input() menu:Menu={};

  constructor(private _srvMenu: ViewUxService
    ,private spinner: NgxSpinnerService
    ,private store: Store<AppState>
  
    ) {
      
      this.store.select("page").subscribe( x => {
        this.count = x!       
      });

    }
    
    ngOnInit(): void {
      //console.log(this.table.length);
      
    //En que componente se carga el Grid-table
    this.store.dispatch(reset( ));
    this.store.dispatch(componente({ componente : this.menu.title! } ));
    this.store.dispatch(incompleta( ));
  }
  
  onPagePositiva(){
    
    if( this.count.completa ){
      this.store.dispatch(increment());
    }
   
  }
  onPageNegativa(){
    
    if(this.count.page! > 1){
      this.store.dispatch(decrement());
    }
    
    if( this.count.completa == false){
      this.store.dispatch(incompleta());
    }
  }

  onDelete(uid:string){
    
    this._srvMenu.addOption(5);
    this.spinner.show();
    setTimeout( () => {
      this._srvMenu.addUId({uid:uid,tipo:'D'});
    }, 1000)

    // GUARDO EL UID ENSTORE
    this.store.dispatch(uidComponente({ uid : uid }));

    this.addNewItem(uid);
    
  }
  onDetalle(uid:string){
    //console.log(uid);
    // ir opcion detalle
    this._srvMenu.addOption(4);
    
    this.spinner.show();
    setTimeout( () => {
      this._srvMenu.addUId({uid:uid,tipo:'D'});
    }
    ,1000)

    // GUARDO EL UID ENSTORE
    this.store.dispatch(uidComponente({ uid : uid }));
    
    // subcripcion id
    this.addNewItem(uid)
  }
  onEditar(uid:string){
        
    this._srvMenu.addOption(3);
    this.spinner.show();
    setTimeout( () => {
      this._srvMenu.addUId({uid:uid,tipo:'U'});
    }, 1000)

    this.addNewItem(uid);
    
  }

  addNewItem(value: string) {
    console.log(`emite ${value}`);
    
    this.newItemEvent.emit(value);
  }

}
