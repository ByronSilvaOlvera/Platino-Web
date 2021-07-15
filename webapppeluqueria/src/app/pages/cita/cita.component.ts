import { Component, OnInit } from '@angular/core';
import { GridTable, HeaderGridTable } from '../../models/grid-table';
import { ViewUxService } from '../../services/view-ux.service';
import { Subscription } from 'rxjs';
import { CitasService } from '../../services/citas.service';
import * as moment from 'moment';


@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit {

  seleccion:number=0;

  citas:GridTable [] = [];
  header:HeaderGridTable [] = [];

  subcripcion: Subscription;

  constructor(private _srvMenu: ViewUxService
    , private _srventidad : CitasService) {
      // Click en el submenu
    this.subcripcion = _srvMenu.getOption().subscribe( s => this.seleccion = s);
      /// menu de opciones editar modificar eliminar
  
  }

  ngOnInit(): void {
    this.createHeader();
    this.dataGrid(1);
  }

  dataGrid(p:number){
    this._srventidad.getAllEntidad(1).subscribe(data => {
      console.log(data);
      
      data.citas.forEach( x => {
        this.citas.push({
          campo1 : x.idcliente.nombres! + " "+x.idcliente.apellidos!,
          campo2 : moment(x.fecha,"YYYY/MM/DD").format("YYYY/MM/DD"),
          campo3 : x.hora,
          uid : x._id
        })

      })
    })
  }


  createHeader(){
    this.header.push({ camponame : 'Cliente' })
    this.header.push({ camponame : 'Fecha' })
    this.header.push({ camponame : 'Hora' })
  }

}
