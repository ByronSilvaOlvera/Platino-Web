import { Component, OnInit } from '@angular/core';
import { GridTable, HeaderGridTable } from '../../models/grid-table';
import { ViewUxService } from '../../services/view-ux.service';
import { Subscription, Observable } from 'rxjs';
import { CitasService } from '../../services/citas.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import { Store } from '@ngrx/store';
import { decrement, reset } from 'src/app/store/page.actions';
import { AppState, Menu, Paginacion } from '../../models/menu';
import { completa, countpage } from '../../store/page.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
})
export class CitaComponent implements OnInit {
  seleccion: number = 0;

  citas: GridTable[] = [];
  header: HeaderGridTable[] = [];

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
    
    // CAbezera de TABla
    this.createHeader();
    // INICIO DE

    //CARGO los DATOS
    this.dataGrid(this.page | 1 );

  }

  dataGrid(page: number) {
    this.spinner.show();

    this._srventidad.getAllEntidad(page).subscribe(
      (data) => {
        if (data.ok && data.citas.length > 0) {
          this.citas = [];
          this.numpage = data.page.length;

          data.citas.forEach((x) => {
            this.citas.push({
              campo1: x.idcliente.nombres! + ' ' + x.idcliente.apellidos!,
              campo2: moment(x.fecha, 'YYYY/MM/DD').format('YYYY/MM/DD'),
              campo3: x.hora,
              uid: x._id,
            });
          });
          this.spinner.hide();
        } else {
          this.pagemov = false;
          --this.page;
          this.spinner.hide();
          this.snotifyService.info('Numero de Citas completas');
          
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


  createHeader() {
    this.header.push({ camponame: 'Cliente' });
    this.header.push({ camponame: 'Fecha' });
    this.header.push({ camponame: 'Hora' });
  }
}
