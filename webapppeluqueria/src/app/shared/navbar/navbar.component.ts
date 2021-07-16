import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';
import { ViewUxService } from '../../services/view-ux.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menus:Menu[] =[ 
    {
      icon : 'fas fa-air-freshener',
      title : 'Peluq-Store',
      link : '/'
    },
    {
      icon : 'fas fa-user',
      title : 'Cliente',
      link : '/cliente',
    },
    {
      icon : 'fas fa-calendar-check',
      title : 'Cita',
      link : '/cita',
    },
    {
      icon : 'fas fa-hand-holding-heart',
      title : 'Atencion',
      link : '/atencion',
    },
    {
      icon : 'fas fa-donate',
      title : 'Servicio',
      link : '/servicio',
    }
  ]
  
  subcripcion: Subscription;

  constructor(private _srvMenu: ViewUxService) {
    this.subcripcion = this._srvMenu.getRuta().subscribe(
      data =>{
        this.completeMenu(data);
      }
    )
   }

  ngOnInit(): void {

  }

  completeMenu(link:string){
    let menu= {}; 
    let num = -1;
    this.menus.filter((x, i) => {
      if(x.link === link){ menu = x; num = i  }
    });

    this.chooseMenu(menu,num);
  }

  chooseMenu(menu: Menu, num : number){
    this._srvMenu.addMenuChoose(menu);
    var obj = document.querySelectorAll('.navbar-item li');  
    
    obj?.forEach( (b, i) => {

      let n = b.attributes.getNamedItem('id')?.nodeValue;

      if( i === num){
       // console.log( n, i , num);
        let ele = document.querySelector(`#${n}`);
        //console.log(ele);
        
        if( ele?.className) { 
          //console.log('ele');
          
          ele.className = 'active' }
        
      }else{
        
        let ele = document.querySelector(`#${n}`);
        if( ele?.className) { ele.className = 'a' }
      }
      
    });
  }


}
