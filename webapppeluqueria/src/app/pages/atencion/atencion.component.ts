import { Component, OnInit } from '@angular/core';
import { GridTable, HeaderGridTable } from '../../models/grid-table';
import { ViewUxService } from '../../services/view-ux.service';
import { Subscription } from 'rxjs';

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
  

  constructor( private _srvMenu: ViewUxService  ) { 
     // SUB MENU
     this.subcripcion = _srvMenu.getOption().subscribe( s => this.seleccion = s);
  }

  ngOnInit(): void {
  }

}
