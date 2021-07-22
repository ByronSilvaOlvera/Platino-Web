import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';

import * as moment from 'moment';

import { AppState, Menu, Paginacion } from '../../models/menu';
import { GridTable, HeaderGridTable } from '../../models/grid-table';
import { CitasService } from '../../services/citas.service';
import { ViewUxService } from '../../services/view-ux.service';
import { Store } from '@ngrx/store';
import { Cita } from 'src/app/models/cita';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
})
export class CitaComponent implements OnInit {
  
  citas:Cita[]=[];  
  seleccion: number = 0;

  subcripcion: Subscription;
  //subcripcionpg: Subscription;
  page:number=1;
  pagemov:boolean=true;

  numpage: number = 0;
  menu: Menu = {};

  constructor(
    private _srvMenu: ViewUxService,
    private _srventidad: CitasService,
    private spinner: NgxSpinnerService,
    private snotifyService: SnotifyService,
    private router: Router
    ,private store: Store<AppState>
  ) {
    // Click en el submenu
    this.subcripcion = this._srvMenu
      .getOption()
      .subscribe((s) => (this.seleccion = s));
  }

  ngOnInit(): void {
    //Obtiene el menu
    this._srvMenu.getMenu().subscribe((menu) => (this.menu = menu));
    
    /// Selecciona el menu con la ruta del navegador
    this._srvMenu.addRuta(this.router.url);
    
    // INICIO DE

    //CARGO los DATOS
    this.dataGrid(this.page);

  }

  dataGrid(page: number) {
    this.spinner.show();

    this._srventidad.getAllEntidad(page).subscribe(
      (data) => {
        if (data.ok && data.citas.length > 0) {
          this.numpage = data.page.length;
          
          this.citas = [];
          this.citas = data.citas;
          
          this.spinner.hide();
        } else {
          this.pagemov = false;
          --this.page;
          this.spinner.hide();
          //this.snotifyService.info('Numero de Citas completas');
          
        }
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.snotifyService.error(`Error en el Servicio web: ${err.message}`);
      }
    );
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

  
}
