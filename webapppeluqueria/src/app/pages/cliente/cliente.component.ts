import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewUxService } from '../../services/view-ux.service';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { GridTb, GridTable, HeaderGridTable } from '../../models/grid-table';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  subcripcion: Subscription;
  subcripcion2: Subscription;
  seleccion:number=0;
  clientes:GridTable [] = [];
  header:HeaderGridTable [] = [];

  page:number=1;

  constructor(private _srvMenu: ViewUxService 
    , private _srventidad : ClienteService) { 
     
     // SUB MENU
    this.subcripcion = _srvMenu.getOption().subscribe( s => this.seleccion = s);
    // Paginacion 
    this.subcripcion2 = _srvMenu.getPage().subscribe( p => 
      {
        this.page = p
        this.dataGrid(p)
      });  
  
  }

  ngOnInit(): void {
    this.createHeader();
    this.dataGrid(this.page);
    
  }

  dataGrid(p:number){
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
        }else{
          console.log('No hay Data');
          //this.clientes = [];
          // resta xq pagima fue sumada en el grid-data
          this._srvMenu.addPage(p--);
        }
        
      }
    )
  }

  createHeader(){
    this.header.push({ camponame : 'Nombres' })
    this.header.push({ camponame : 'Apellidos' })
    this.header.push({ camponame : 'Direccion' })
  }


}
