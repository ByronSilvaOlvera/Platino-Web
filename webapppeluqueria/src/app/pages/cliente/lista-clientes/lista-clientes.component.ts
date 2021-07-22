import { state } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/models/cliente';
import { GridTable, HeaderGridTable } from 'src/app/models/grid-table';
import { ClienteService } from '../../../services/cliente.service';
import { ClientesStore } from '../cliente.store';
import { uidComponente } from '../../../store/page.actions';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientestComponent implements OnInit {

  clientesTb:GridTable [] = [];
  header:HeaderGridTable [] = [];
  @Input() clientes: Cliente[] = [];
  @Input() page: number = 0;
  @Input() pageEstado: boolean = true;

  

  constructor(private spinner: NgxSpinnerService
    , private _srventidad : ClienteService
    , private snotifyService: SnotifyService
    ,private readonly clienteStore: ClientesStore
    ) { }

  ngOnInit(): void {
    console.log(`list cliente`);
    this.createHeader();

    this.clienteStore.selectEstdoComponente().subscribe(
      data => {
        this.page = data.page!;
        this.pageEstado = data.pageEstado!;
      }
    )

    this.convertirDataTable();
  }

  onPageSiguiente(){
    if(this.pageEstado){
      ++this.page
      this.dataGrid(this.page)
    }
  }
  
  onPageAnterior(){
    if(this.page > 1 ){
      --this.page
      this.dataGrid(this.page)
    }
    if(this.pageEstado === false){ this.pageEstado = true }
  }

  dataGrid(p:number){
    this.spinner.show();

    this._srventidad.getAllEntidad(p).subscribe(
      
      data => {
        if(data.ok ){
          
          this.clientes = data.clientes;   
          this.clientesTb = [];

          this.convertirDataTable()      
          this.page = p
          this.spinner.hide();

        }else{      
          this.pageEstado = false;
          --this.page;
          this.spinner.hide();
          //this.snotifyService.info('Clientes completos')
        }
        
      }, err => {
        console.log(err);
        this.spinner.hide();
        this.snotifyService.error(`Error en el Servicio web: ${ err.message }`)
      })
  }

  convertirDataTable(){
    this.clientes.forEach( x => {
      this.clientesTb.push({
        campo1 : x.nombres,
        campo2 : x.apellidos,
        campo3 : x.direccion,
        uid    : x._id
      })
    })
  }

  onActualiza(){
    this.dataGrid(1);
    this.page = 1;
  }


  createHeader(){
    this.header.push({ camponame : 'Nombres' })
    this.header.push({ camponame : 'Apellidos' })
    this.header.push({ camponame : 'Direccion' })
  }

  addItem(uid: string) {
    
    this.clienteStore.setState( (state)=>  { 
      return{ ...state,  dataComponente : {uid : uid} }  
    })
  }

}
