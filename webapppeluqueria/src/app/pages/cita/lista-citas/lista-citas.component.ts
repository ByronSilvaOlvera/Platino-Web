import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cita } from 'src/app/models/cita';
import { GridTable, HeaderGridTable } from 'src/app/models/grid-table';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.scss']
})
export class ListaCitasComponent implements OnInit {

  citasTb: GridTable[] = [];
  header: HeaderGridTable[] = [];

  @Input() citas:Cita[]=[];  

  page:number=1;
  pageEstado:boolean=true;

  constructor(private _srventidad: CitasService
    ,private spinner: NgxSpinnerService,
    private snotifyService: SnotifyService
    ) { }

  ngOnInit(): void {
    // CAbezera de TABla
    this.createHeader();

    this.convertirDataTable();

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

  

  dataGrid(page: number) {
    this.spinner.show();

    this._srventidad.getAllEntidad(page).subscribe(
      (data) => {
        if (data.ok && data.citas.length > 0) {

          //this.numpage = data.page.length;
          this.citas = data.citas;
          this.citasTb = [];
          this.convertirDataTable()
          this.spinner.hide();

        } else {
          this.pageEstado = false;
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

  convertirDataTable(){
    this.citas.forEach( x => {
      this.citasTb.push({
        campo1: x.idcliente.nombres! + ' ' + x.idcliente.apellidos!,
        campo2: moment(x.fecha, 'YYYY/MM/DD').format('YYYY/MM/DD'),
        campo3: x.hora,
        uid   : x._id,
      })
    })
    
  }

  createHeader() {
    this.header.push({ camponame: 'Cliente' });
    this.header.push({ camponame: 'Fecha' });
    this.header.push({ camponame: 'Hora' });
  }

  addItem(uid: string) {
    console.log(`ID cita ${uid}`);
    
  }

}
