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
  seleccion:number=0;
  clientes:GridTable [] = [];
  header:HeaderGridTable [] = [];
  b : boolean= false;

  constructor(private _srvMenu: ViewUxService 
    , private _srventidad : ClienteService) { 
     
    this.subcripcion = _srvMenu.getOption().subscribe( s => this.seleccion = s);
  }

  ngOnInit(): void {
    this.createHeader();
    this._srventidad.getAllEntidad(1).subscribe(
      data => {

        data.clientes.forEach( x => {
          this.clientes.push({
            campo1 : x.nombres,
            campo2 : x.apellidos,
            campo3 : x.direccion,
            uid    : x._id
          })
        })
        
      }
    )
    
  }

  createHeader(){
    this.header.push({ camponame : 'Nombres' })
    this.header.push({ camponame : 'Apellidos' })
    this.header.push({ camponame : 'Direccion' })
  }


}
