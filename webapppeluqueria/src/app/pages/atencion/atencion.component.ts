import { Component, OnInit } from '@angular/core';
import { GridTable, HeaderGridTable } from '../../models/grid-table';
import { ViewUxService } from '../../services/view-ux.service';
import { Subscription } from 'rxjs';
import { AtencionService } from '../../services/atencion.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Menu } from 'src/app/models/menu';
import { Atencion } from '../../models/atencion';




@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.scss'],
})
export class AtencionComponent implements OnInit {
  seleccion: number = 0;

  atencion:Atencion[]= [];

  subcripcion: Subscription;
  page:number=1;
  pagemov:boolean=true;
  menu: Menu = {};

  constructor(
    private _srvMenu: ViewUxService,
    private _srventidad: AtencionService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private snotifyService: SnotifyService,
    
  ) {
    
    // SUB MENU
    this.subcripcion = this._srvMenu.getOption().subscribe((s) => {
      this.seleccion = s;
      this.spinner.hide();
    });

  }

  ngOnInit(): void {
    this.subcripcion = this._srvMenu
      .getOption()
      .subscribe((s) => (this.seleccion = s));
    this._srvMenu.getMenu().subscribe((menu) => (this.menu = menu));

    //DATA DEL DATAGRID
    this.dataGrid(1);
    //console.log(this.router.url);
    // carga los datos de la ruta inicial de cada
    //menu de opciones
    this._srvMenu.addRuta(this.router.url);
  }

  dataGrid(p: number) {
   
      this.spinner.show();

      this._srventidad.getAllEntidad(p).subscribe(
        (data) => {
          if (data.ok) {
            this.atencion = [];
            this.atencion = data.atencion!;
            
            this.spinner.hide();
          } else {
            this.pagemov = false;
            --this.page;
            this.spinner.hide();
            //this.snotifyService.info(`las atenciones estan completas`);
            
          }
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
          this.snotifyService.error(`Error en el Servicio web: ${err.message}`);
        }
      );
    
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
