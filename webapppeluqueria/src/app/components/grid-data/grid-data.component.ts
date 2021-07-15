import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-data',
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.scss']
})
export class GridDataComponent implements OnInit {

  @Input() table:any [] = [];
  @Input() title:string = "Lista de Clientes";
  numero : number [] = []; // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  header : number [] = [1,2,3,4];

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){}

}
