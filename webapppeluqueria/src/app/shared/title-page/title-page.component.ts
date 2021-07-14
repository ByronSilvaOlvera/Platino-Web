import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent implements OnInit {

  @Input() namepage:string ='';
  @Input() id:number =0;
  @Input() iconheader : string='fas fa-archive';
  dia: string ;
  
  constructor() { 
    this.dia = moment().format('MMMM Do YYYY, h:mm:ss a');
  }

  ngOnInit(): void {
  }

}
