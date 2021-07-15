import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ViewUxService } from '../../services/view-ux.service';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent implements OnInit {

  @Input() id:number =0;

  menu:Menu = {};
  dia: string ;
  
  constructor(private _srvMenu: ViewUxService) { 

    this.dia = moment().format('MMMM Do YYYY, h:mm:ss a');

    this._srvMenu.getMenuOption().subscribe( m => this.menu = m )

  }

  ngOnInit(): void {
  }

}
