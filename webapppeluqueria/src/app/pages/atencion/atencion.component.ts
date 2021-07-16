import { Component, OnInit } from '@angular/core';
import { GridTable, HeaderGridTable } from '../../models/grid-table';
import { ViewUxService } from '../../services/view-ux.service';
import { Subscription } from 'rxjs';
import { AtencionService } from '../../services/atencion.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.scss']
})
export class AtencionComponent implements OnInit {

  seleccion:number=0;
  
  atencion:GridTable [] = [];
  header:HeaderGridTable [] = [];

  subcripcion: Subscription;
  

  constructor( private _srvMenu: ViewUxService
    ,private _srventidad : AtencionService
    ,private spinner: NgxSpinnerService
    ,private router: Router  ) { 

     // SUB MENU
     this.subcripcion = this._srvMenu.getOption().subscribe( s => 
      {
        this.seleccion = s
        this.spinner.hide()
      });
      this.createHeader();
    }

  ngOnInit(): void {
    this.dataGrid(1);3

    console.log(this.router.url);
    
    
    // this._srvMenu.getMenu().subscribe( data => {
    //   console.log(data);
      
    //   if(data.link?.length === 0){
    //     console.log('sin titulo');
        
    //   }
    // })
    
  }

  dataGrid(p:number){
    this.spinner.show();
    this._srventidad.getAllEntidad(1).subscribe(data => {
      
      if(data.ok){

        data.atencion?.forEach( x => {
          this.atencion.push({
            campo1 : x.idcliente?.nombres! + " "+x.idcliente?.apellidos!,
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
