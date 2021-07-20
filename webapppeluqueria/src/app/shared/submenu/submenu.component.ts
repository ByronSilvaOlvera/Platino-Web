import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewUxService } from '../../services/view-ux.service';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {

  subcripcion: Subscription;
  subcripcion2: Subscription;
  constructor(private _srvMenu: ViewUxService) {

    /// BORRA EL FOCO SUBMENU cick en el menu principal
    this.subcripcion = this._srvMenu.getMenu().subscribe(
      d =>{
        this.onSeleccionMenu(-1);
      });
      /// DA FOCO DE SELECCION click en el sub menu
      this.subcripcion2 = this._srvMenu.getOption().subscribe(
        d => {
          this.onSeleccionMenu(d -1 )
        });  


   }

  ngOnInit(): void {

  }

  // click List add Edit View Delete
  cmbClick(num:number){
    //muestra el color del menu seleccionado
    this.onSeleccionMenu(num);
    // Selecciona el numero del submenu
    this._srvMenu.addOption(num +1 );
    //console.log(num);
    
    /// SI VOY A CREAR UN OBJETO
    if(num === 1){
      setTimeout(() => {
        this._srvMenu.addUId({uid:'',tipo:'C'});
      },1000)
    }
    
  }


  // da foco a los menus 
  onSeleccionMenu(num:number){
    var obj = document.querySelectorAll('.body div');  

    obj?.forEach( (b, i) => {
      //console.log(b.attributes, b.id, num,  b.attributes.getNamedItem('id'), i);
      let n = b.attributes.getNamedItem('id')?.nodeValue;
      if( i === num){
        //console.log( n, i , num);
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
