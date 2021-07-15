import { Component, Input, OnInit } from '@angular/core';
import { GridTb, GridTable, HeaderGridTable } from '../../models/grid-table';
import { ViewUxService } from '../../services/view-ux.service';

@Component({
  selector: 'app-grid-data',
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.scss']
})
export class GridDataComponent implements OnInit {

  @Input() table:GridTable [] = [];
  @Input() header:HeaderGridTable [] = [];
  

  @Input() title:string = "";
  numero : number [] = []; // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  //header : number [] = [1,2,3,4];

  constructor(private _srvMenu: ViewUxService) { }

  ngOnInit(): void {

    
  }

  onDelete(uid:string){
    console.log(uid);
    // ir opciion eliminar
    this._srvMenu.addOption(5);
    //this._srvMenu.addUId(uid);
    
    
  }
  onDetalle(uid:string){
    console.log(uid);
    // ir opcion detalle
    this._srvMenu.addOption(4);
    
    setTimeout( () => {
      this._srvMenu.addUId(uid);
    }
    ,1000)
    
    // subcripcion id
    
  }
  onEditar(uid:string){
    console.log(uid);
    // ir opciion editar
    this._srvMenu.addOption(3);
    setTimeout( () => {
      this._srvMenu.addUId(uid);
    }, 1000)
    
  }

}
