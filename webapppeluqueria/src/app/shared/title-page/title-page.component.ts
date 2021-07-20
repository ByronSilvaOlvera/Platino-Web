import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ViewUxService } from '../../services/view-ux.service';
import { Menu } from '../../models/menu';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent implements OnInit {

  @Input() id:number =0;

  menu:Menu = {};
  dia: string ;
  
  constructor(private _srvMenu: ViewUxService,
    private router: Router) { 

    this.dia = moment().format('MMMM Do YYYY, h:mm:ss a');

    this._srvMenu.getMenu().subscribe( m => this.menu = m )

  }

  ngOnInit(): void {
    //console.log(this.menu, this.router.url );
    
    if(Object.keys(this.menu).length === 0){
      //console.log('sin titulo y icons');
      //this._srvMenu.addRuta(this.router.url);
    }
  }

}
