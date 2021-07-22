import { Component, Input, OnInit } from '@angular/core';
import { Atencion } from 'src/app/models/atencion';
import { ViewUxService } from '../../../services/view-ux.service';
import { Subscription } from 'rxjs';
import { AtencionService } from '../../../services/atencion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Servicio } from '../../../models/servporduct';
import { ServicioProductoService } from '../../../services/servicio-producto.service';
import { Idservicio } from '../../../models/atencion';

@Component({
  selector: 'app-detalle-atencion',
  templateUrl: './detalle-atencion.component.html',
  styleUrls: ['./detalle-atencion.component.scss']
})
export class DetalleAtencionComponent implements OnInit {

  subcripcion: Subscription;
  atencion: Atencion = {idcliente:{nombres:"", apellidos:""}};
  uid : string = "";
  servicios : Servicio [] = [];
  @Input() estado:boolean=true;

  constructor(private _srvMenu: ViewUxService
    ,private _srventidad : AtencionService
    ,private _srvservicio : ServicioProductoService
    ,private spinner: NgxSpinnerService) { 

    //SUBCRIPCION UID
    this.subcripcion = this._srvMenu.getUId().subscribe( uid => {
      this.uid = uid.uid!
      if( uid.uid?.length! > 0 ){

        this._srventidad.getEntidad(uid.uid!).subscribe( data => {
          if(data.ok && data.atencion?._id?.length! > 0){
            
            this.atencion = data.atencion!;            
            
            this.obtenerServicio(data.atencion?.idservicio!);
            this.spinner.hide();
          }else{
            this.spinner.hide();
            
          }
        }, err => {
          console.log(err);
          this.spinner.hide();
          
        })
      }else{
        this.spinner.hide();
      }
    });
  }

  ngOnInit(): void {
  }

  onDelete(){
    
  }

  obtenerServicio(ser: Idservicio[]){
   
    
    this._srvservicio.getAllEntidad(1).subscribe( data => {
      if(data.ok){
     
        this.servicios = [];
        ser.forEach( x => {
          data.servicios.filter( y => {
            if(y._id === x.uidService){
              this.servicios.push( y );
            }
          }) 
        })

      }
      else{}
    }, err => ( console.log('error')
    ))
  }

}
