import { Component, OnInit } from '@angular/core';
import { CardData } from '../../models/menu';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.scss']
})
export class InicioPageComponent implements OnInit {

  boxs:number[] = [1,2,3,4]; // [1,2,3,4,5,6,7,8,9,10];
  data: CardData[] = [
    {
      icon: "fas fa-users",
      numero : 1258,
      title: "",
      subtitle: "Numeros de clientes"
    },
    {
      icon: "fas fa-users-slash",
      numero : 1258 * 0.10,
      title: "",
      subtitle: "Numeros que no visitan"
    },
    {
      icon: "fas fa-users-cog",
      numero : 1258 * 0.3,
      title: "",
      subtitle: " falta completar datos"
    },
    {
      icon: "far fa-eye",
      numero : 1258 *0.6,
      title: "",
      subtitle: "visitan"
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
