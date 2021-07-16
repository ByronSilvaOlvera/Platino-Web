import { Component, OnInit } from '@angular/core';
import { CardData } from '../../models/menu';
import { ViewUxService } from '../../services/view-ux.service';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.scss']
})
export class InicioPageComponent implements OnInit {

  name:string ="";
  boxs:number[] = [1,2,3,4]; // [1,2,3,4,5,6,7,8,9,10];
  data:CardData[]=[];
  menus: CardData[] = [
    {
      icon: "fas fa-users",
      numero : 1258,
      title: "",
      subtitle: "Numeros de clientes",
      tipo: "cliente",
    },
    {
      icon: "fas fa-users-slash",
      numero : 1258 * 0.10,
      title: "",
      subtitle: "Numeros que no visitan",
      tipo: "cliente",
    },
    {
      icon: "fas fa-users-cog",
      numero : 1258 * 0.3,
      title: "",
      subtitle: " falta completar datos",
      tipo: "cliente",
    },
    {
      icon: "far fa-eye",
      numero : 1258 *0.6,
      title: "",
      subtitle: "visitan",
      tipo: "cliente",
    },

    {
      icon: "fas fa-calendar-week",
      numero : 3548,
      title: "",
      subtitle: "Numeros de clientes",
      tipo: "cita",

    },
    {
      icon: "far fa-calendar-alt",
      numero : 3548 * 0.10,
      title: "",
      subtitle: "Numeros que no visitan",
      tipo: "cita",

    },
    {
      icon: "fas fa-calendar-day",
      numero : 3548 * 0.3,
      title: "",
      subtitle: " falta completar datos",
      tipo: "cita",

    },
    {
      icon: "fas fa-calendar-plus",
      numero : 3548 *0.6,
      title: "",
      subtitle: "visitan",
      tipo: "cita",

    },

    {
      icon: "far fa-grin-tears",
      numero : 7586,
      title: "",
      subtitle: "Numeros de atenciones",
      tipo: "atencion",

    },
    {
      icon: "fas fa-dolly-flatbed",
      numero : 7586 * 0.3,
      title: "",
      subtitle: "Buenos comentarios",
      tipo: "atencion",

    },
    {
      icon: "far fa-tired",
      numero : 7586 * 0.1,
      title: "",
      subtitle: " Quejas ",
      tipo: "atencion",

    },
    {
      icon: "fas fa-cart-plus",
      numero : 7586 *0.6,
      title: "",
      subtitle: "Atenciones efectivas",
      tipo: "atencion",

    }
  ];

  

  constructor(private _srvMenu: ViewUxService) { }

  ngOnInit(): void {
    this._srvMenu.getMenu().subscribe(resp => {
      this.name = resp.title!;
      this.data = this.menus.filter( x => x.tipo == resp.title?.toLowerCase() )
      
      
    })
  }

}
