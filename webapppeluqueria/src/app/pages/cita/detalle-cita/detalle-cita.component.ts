import { Component, Input, OnInit } from '@angular/core';
import { Cita } from '../../../models/cita';
import { Subscription } from 'rxjs';
import { ViewUxService } from '../../../services/view-ux.service';
import { CitasService } from '../../../services/citas.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.scss']
})
export class DetalleCitaComponent implements OnInit {

  subcripcion: Subscription;
  cita: Cita = {idcliente:{nombres:"", apellidos:""}};
  uid : string = "";
  @Input() estado : boolean = true;

  constructor(private _srvMenu: ViewUxService
    ,private _srventidad : CitasService
    ,private spinner: NgxSpinnerService
    ,private snotifyService: SnotifyService,
    ) { 

    //SUBCRIPCION UID
    this.subcripcion = this._srvMenu.getUId().subscribe( uid => {
      this.uid = uid.uid!;
      if(uid.uid?.length! > 0){
        this._srventidad.getEntidad(uid.uid!).subscribe( data => {
          if(data.ok){
            this.cita = data.cita;

            // Spinner se inicia el componente Grid-data
            //Opcion Editar metodo onEditar
            this.spinner.hide();
          }else{
            
            this.spinner.hide();
          }
        } , err => {
          console.error(err);
          
        })
      }
    });
  }

  // cambia el esta de la cita
  onChangeCita(cita:Cita, estado:string){
    cita.estado = estado; 
    this.spinner.show();
    this._srventidad.updateEntidad( cita , cita._id! ).subscribe(
      data => {
        if(data.ok){
          
          console.log('exitoso');
          this.spinner.hide();
          
        }else{
          
          this.spinner.hide();
        }
      }
    )
  }

  onDelete(cita:Cita){
    this._srventidad.deleteEntidad(cita._id!).subscribe( data => {
      if(data.ok){
        this.snotifyService.success('Cita eliminada')
      }
      else{
        this.snotifyService.warning('Cita no pudo ser eliminada. Tiene asignada una Atencion')
        
      }
    }, err => {
      this.snotifyService.error('Servicio web error ' + err)

    })
  }



  ngOnInit(): void {
  }

}
