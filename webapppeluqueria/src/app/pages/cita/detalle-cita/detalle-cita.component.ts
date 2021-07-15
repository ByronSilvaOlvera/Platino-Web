import { Component, OnInit } from '@angular/core';
import { Cita } from '../../../models/cita';
import { Subscription } from 'rxjs';
import { ViewUxService } from '../../../services/view-ux.service';
import { CitasService } from '../../../services/citas.service';


@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.scss']
})
export class DetalleCitaComponent implements OnInit {

  subcripcion: Subscription;
  cita: Cita = {idcliente:{nombres:"", apellidos:""}};
  uid : string = "";


  constructor(private _srvMenu: ViewUxService
    ,private _srventidad : CitasService) { 

    //SUBCRIPCION UID
    this.subcripcion = this._srvMenu.getUId().subscribe( uid => {
      this.uid = uid;
      this._srventidad.getEntidad(uid).subscribe( data => {
        if(data.ok){
          this.cita = data.cita;
        }
      })
    });

  }

  // cambia el esta de la cita
  onChangeCita(cita:Cita, estado:string){
    cita.estado = estado; 
    
    this._srventidad.updateEntidad( cita , cita._id! ).subscribe(
      data => {
        if(data.ok){
          
          console.log('exitoso');
          
        }else{

        }
      }
    )
  }



  ngOnInit(): void {
  }

}
