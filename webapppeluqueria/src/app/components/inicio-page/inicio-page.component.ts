import { Component, Input, OnInit } from '@angular/core';
import { CardData } from '../../models/menu';
import { ViewUxService } from '../../services/view-ux.service';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.scss']
})
export class InicioPageComponent implements OnInit {

  @Input() titulo:string ="";
  boxs:number[] = [1,2,3,4]; // [1,2,3,4,5,6,7,8,9,10];
  data:CardData[]=[];
  dataEstadistico : number = 0;

  @Input() menunum : number = 0

  menus: CardData[] = [
    {
      icon: "fas fa-users",
      numero : 1258,
      title: "",
      subtitle: "Numeros de clientes",
      tipo: "cliente",
      position: 1
    },
    {
      icon: "fas fa-users-slash",
      numero : 1258 * 0.10,
      title: "",
      subtitle: "Numeros que no visitan",
      tipo: "cliente",
      position: 1

    },
    {
      icon: "fas fa-users-cog",
      numero : 1258 * 0.3,
      title: "",
      subtitle: " falta completar datos",
      tipo: "cliente",
      position: 1

    },
    {
      icon: "far fa-eye",
      numero : 1258 *0.6,
      title: "",
      subtitle: "visitan",
      tipo: "cliente",
      position: 1

    },

    {
      icon: "fas fa-calendar-week",
      numero : 3548,
      title: "",
      subtitle: "Numeros de clientes",
      tipo: "cita",
      position: 2

    },
    {
      icon: "far fa-calendar-alt",
      numero : 3548 * 0.10,
      title: "",
      subtitle: "Numeros que no visitan",
      tipo: "cita",
      position: 2

    },
    {
      icon: "fas fa-calendar-day",
      numero : 3548 * 0.3,
      title: "",
      subtitle: " falta completar datos",
      tipo: "cita",
      position: 2
    },
    {
      icon: "fas fa-calendar-plus",
      numero : 3548 *0.6,
      title: "",
      subtitle: "visitan",
      tipo: "cita",
      position: 2

    },

    {
      icon: "far fa-grin-tears",
      numero : 7586,
      title: "",
      subtitle: "Numeros de atenciones",
      tipo: "atencion",
      position: 3

    },
    {
      icon: "fas fa-dolly-flatbed",
      numero : 7586 * 0.3,
      title: "",
      subtitle: "Buenos comentarios",
      tipo: "atencion",
      position: 3

    },
    {
      icon: "far fa-tired",
      numero : 7586 * 0.1,
      title: "",
      subtitle: " Quejas ",
      tipo: "atencion",
      position: 3

    },
    {
      icon: "fas fa-cart-plus",
      numero : 7586 *0.6,
      title: "",
      subtitle: "Atenciones efectivas",
      tipo: "atencion",
      position: 3

    }
  ];

  

  constructor(private _srvMenu: ViewUxService) { 
    this.dataEstadistico = 0;
  }
  
  ngOnInit(): void {
    //console.log(this.menunum);
    this.dataEstadistico = 0;
    this.dataEstadistico =  this.menus.filter( x => x.position === this.menunum! )[0].numero!;
    this.data = this.menus.filter( x => x.position === this.menunum! );
    //console.log(this.dataEstadistico);
    

    // this._srvMenu.getMenu().subscribe(resp => {
    //   this.name = resp.title!;
    //   this.data = this.menus.filter( x => x.position === this.menunum! );
    //   console.log(this.data);
      
    // })
    
  }

}
