import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  cmbClick(num:number){
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
