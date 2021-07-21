import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ViewUxService } from '../../services/view-ux.service';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { GridTb, GridTable, HeaderGridTable } from '../../models/grid-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import { Store } from '@ngrx/store';
import { decrement, reset } from '../../store/page.actions';
import { Router } from '@angular/router';
import { AppState } from 'src/app/models/menu';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  subcripcion: Subscription;
  //subcripcion2: Subscription;
  seleccion:number=0;
  clientes:GridTable [] = [];
  header:HeaderGridTable [] = [];

  page:number=1;
  pagemov:boolean=true;
  //pages$: Observable<number>;

  constructor(private _srvMenu: ViewUxService 
    , private _srventidad : ClienteService
    ,private spinner: NgxSpinnerService
    ,private snotifyService: SnotifyService
    ,private router: Router
    ,private store: Store<AppState>
  
    ) { 
     
     // SUB MENU
    this.subcripcion = _srvMenu.getOption().subscribe( s => {
      this.seleccion = s
      this.spinner.hide();
    });
   
  
  }

  ngOnInit(): void {
    this.createHeader();
    this.dataGrid(this.page);
    this._srvMenu.addRuta(this.router.url);  
    
  }

  dataGrid(p:number){
    this.spinner.show();

    this._srventidad.getAllEntidad(p).subscribe(
      
      data => {
        if(data.ok ){
          this.clientes = [];
          data.clientes.forEach( x => {
            this.clientes.push({
              campo1 : x.nombres,
              campo2 : x.apellidos,
              campo3 : x.direccion,
              uid    : x._id
            })
          })
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

  onDelete(){
    
    let id='';
    this.store.select('page').subscribe( x => id = x?.uid!)
                  
    this._srventidad.deleteEntidad(id).subscribe( data => {
      if(data.ok){
        this.snotifyService.success('Cliente eliminado');
    
      }
      else{
        this.snotifyService.warning('No se puede eliminar el Cliente '+ data.msg);
     
      }
    }, err => {
      this.snotifyService.error('Web Service no responde '+ err );
      
    })

  }

  createHeader(){
    this.header.push({ camponame : 'Nombres' })
    this.header.push({ camponame : 'Apellidos' })
    this.header.push({ camponame : 'Direccion' })
  }


}
