import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridTable, HeaderGridTable } from 'src/app/models/grid-table';
import { AtencionService } from 'src/app/services/atencion.service';
import { Atencion } from '../../../models/atencion';

@Component({
  selector: 'app-lista-atenciones',
  templateUrl: './lista-atenciones.component.html',
  styleUrls: ['./lista-atenciones.component.scss'],
})
export class ListaAtencionesComponent implements OnInit {

  atencionTb: GridTable[] = [];
  header: HeaderGridTable[] = [];

  @Input() atenciones: Atencion[] = [];

  page:number=1;
  pageEstado:boolean=true;

  constructor(private _srventidad: AtencionService
    ,private spinner: NgxSpinnerService
    ,private snotifyService: SnotifyService
    ) {}

  ngOnInit(): void {
    this.createHeader();
    this.convertirDataTable();
  }

  dataGrid(p: number) {
    this.spinner.show();

    this._srventidad.getAllEntidad(p).subscribe(
      (data) => {
        if (data.ok) {
          this.atenciones = [];
          this.atencionTb = [];
          this.convertirDataTable();
          this.spinner.hide();
        } else {
          this.pageEstado = false;
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
    if(this.pageEstado){
      this.dataGrid(++this.page);
    }
  }

  onPageAnterior(){
    if(this.page > 1 ){
      this.dataGrid(--this.page);
    }
    if(this.pageEstado === false){ this.pageEstado = true }
  }

  updateTable:boolean=false;
  onActualiza(){
    this.updateTable = true;
    this.dataGrid(1);
    this.page = 1;
    this.updateTable = false;
  }

  convertirDataTable(){
    this.atenciones.forEach((x) => {
      this.atencionTb.push({
        campo1: x.idcliente?.nombres! + ' ' + x.idcliente?.apellidos!,
        campo2: moment(x.fecha, 'YYYY/MM/DD').format('YYYY/MM/DD'),
        campo3: x.hora,
        uid: x._id,
      });
    });
  }
  createHeader() {
    this.header.push({ camponame: 'Cliente' });
    this.header.push({ camponame: 'Fecha' });
    this.header.push({ camponame: 'Hora' });
  }
}
