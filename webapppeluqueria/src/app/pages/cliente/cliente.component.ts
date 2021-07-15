import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewUxService } from '../../services/view-ux.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  subcripcion: Subscription;
  seleccion:number=5;

  constructor(private _srvMenu: ViewUxService ) { 
    this.subcripcion = _srvMenu.getOption().subscribe( s => this.seleccion = s);
  }

  ngOnInit(): void {
  }

}
