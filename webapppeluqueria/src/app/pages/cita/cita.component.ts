import { Component, OnInit } from '@angular/core';
import { GridTable, HeaderGridTable } from '../../models/grid-table';
import { ViewUxService } from '../../services/view-ux.service';
import { Subscription } from 'rxjs';
import { CitasService } from '../../services/citas.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';


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
  subcripcionpg: Subscription;

  constructor(private _srvMenu: ViewUxService
    , private _srventidad : CitasService
    ,private spinner: NgxSpinnerService) {
      // Click en el submenu
    this.subcripcion = this._srvMenu.getOption().subscribe( s => this.seleccion = s);
      /// menu de opciones editar modificar eliminar
    this.subcripcionpg = this._srvMenu.getPage().subscribe( s => {
      this.dataGrid(1);
    });   
  
    

  }

  ngOnInit(): void {
    this.createHeader();
    this.dataGrid(1);
    
    //console.log(this.router.url);
  }

  dataGrid(p:number){
    this.spinner.show();
    this._srventidad.getAllEntidad(1).subscribe(data => {
      
      if(data.ok){         
        data.citas.forEach( x => {
          this.citas.push({
            campo1 : x.idcliente.nombres! + " "+x.idcliente.apellidos!,
            campo2 : moment(x.fecha,"YYYY/MM/DD").format("YYYY/MM/DD"),
            campo3 : x.hora,
            uid : x._id
          })
          
        })
        this.spinner.hide();
      }else{
        
        this.spinner.hide();
      }


    }, err => {
      console.log(err);
      
    })
  }


  createHeader(){
    this.header.push({ camponame : 'Cliente' })
    this.header.push({ camponame : 'Fecha' })
    this.header.push({ camponame : 'Hora' })
  }

}
