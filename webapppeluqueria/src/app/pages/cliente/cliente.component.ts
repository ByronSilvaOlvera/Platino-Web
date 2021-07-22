import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ViewUxService } from '../../services/view-ux.service';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { GridTb, GridTable, HeaderGridTable } from '../../models/grid-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import { Store } from '@ngrx/store';
import { decrement, reset, componente } from '../../store/page.actions';
import { Router } from '@angular/router';
import { AppState } from 'src/app/models/menu';
import { ClientesStore } from './cliente.store';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [ClientesStore]
})
export class ClienteComponent implements OnInit {

  subcripcion: Subscription;

  seleccion:number=0;
  clientes:Cliente[]=[];

  page:number=1;
  pagemov:boolean=true;
  uid:string="";

  constructor(private _srvMenu: ViewUxService 
    , private _srventidad : ClienteService
    ,private spinner: NgxSpinnerService
    ,private snotifyService: SnotifyService
    ,private router: Router
    ,private store: Store<AppState>
    ,private readonly clienteStore: ClientesStore
  
    ) { 
     
     // SUB MENU
    this.subcripcion = _srvMenu.getOption().subscribe( s => {
      this.seleccion = s
      this.spinner.hide();
    });
   
  
  }

  ngOnInit(): void {

    this.dataGrid(this.page);
    
    this._srvMenu.addRuta(this.router.url);  

    this.clienteStore.setState((state) => {
      return {
        ...state, dataComponente : { page:1, uid:'', pageEstado:true,pageNumber:0,componente:'' }
      }
    })
    
    this.clienteStore.selectEstdoComponente().subscribe( data => this.uid = data.uid! );
    
  }

  dataGrid(p:number){
    this.spinner.show();

    this._srventidad.getAllEntidad(p).subscribe(
      
      data => {
        if(data.ok ){
          this.clientes = data.clientes;

          this.page = p
          this.spinner.hide();
        }else{      
          this.pagemov = false;
          --this.page;
          this.spinner.hide();
          //this.snotifyService.info('Clientes completos')
        }
        
      }, err => {
        console.log(err);
        this.spinner.hide();
        this.snotifyService.error(`Error en el Servicio web: ${ err.message }`)
      }
    )
  }

  onPageSiguiente(){
    if(this.pagemov){
      this.dataGrid(++this.page);
    }
  }

  onPageAnterior(){
    if(this.page > 1 ){
      this.dataGrid(--this.page);
    }
    if(this.pagemov === false){ this.pagemov = true }
  }

  updateTable:boolean=false;
  onActualiza(){
    this.updateTable = true;
    this.dataGrid(1);
    this.page = 1;
    this.updateTable = false;
  }

  

  


}
