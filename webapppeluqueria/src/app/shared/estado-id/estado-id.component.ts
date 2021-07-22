import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estado-id',
  templateUrl: './estado-id.component.html',
  styleUrls: ['./estado-id.component.scss']
})
export class EstadoIDComponent implements OnInit {

  @Input() uid:string | null = '' ;
  @Input() contenido:string='';
  @Input() view:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

}
