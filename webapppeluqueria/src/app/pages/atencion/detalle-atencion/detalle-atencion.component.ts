import { Component, OnInit } from '@angular/core';
import { Atencion } from 'src/app/models/atencion';
import { ViewUxService } from '../../../services/view-ux.service';
import { Subscription } from 'rxjs';
import { AtencionService } from '../../../services/atencion.service';

@Component({
  selector: 'app-detalle-atencion',
  templateUrl: './detalle-atencion.component.html',
  styleUrls: ['./detalle-atencion.component.scss']
})
export class DetalleAtencionComponent implements OnInit {

  subcripcion: Subscription;
  atencion: Atencion = {idcliente:{nombres:"", apellidos:""}};
  uid : string = "";

  constructor(private _srvMenu: ViewUxService
    ,private _srventidad : AtencionService) { 

    //SUBCRIPCION UID
    this.subcripcion = this._srvMenu.getUId().subscribe( uid => {
      this.uid = uid;
      this._srventidad.getEntidad(uid).subscribe( data => {
        if(data.ok){
          console.log(data);
          
          this.atencion = data.atencion!;
        }
      }, err => {
        console.log(err);
        
      })
    });
  }

  ngOnInit(): void {
  }

}