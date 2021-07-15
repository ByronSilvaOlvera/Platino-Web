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
      numero : "",
      title: "",
      subtitle: ""
    },
    {
      icon: "fas fa-users-slash",
      numero : "",
      title: "",
      subtitle: ""
    },
    {
      icon: "fas fa-users-cog",
      numero : "",
      title: "",
      subtitle: ""
    },
    {
      icon: "far fa-eye",
      numero : "",
      title: "",
      subtitle: ""
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
