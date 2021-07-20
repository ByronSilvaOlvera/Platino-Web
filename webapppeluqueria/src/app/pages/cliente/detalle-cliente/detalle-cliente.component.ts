import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewUxService } from '../../../services/view-ux.service';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss']
})
export class DetalleClienteComponent implements OnInit {

  subcripcion: Subscription;
  cliente: Cliente = {nombres:''};

  uid:string='';

  constructor(private _srvMenu: ViewUxService,
    private _srvcliente: ClienteService
    ,private spinner: NgxSpinnerService
    ,private snotifyService: SnotifyService) { 

    this.subcripcion = this._srvMenu.getUId().subscribe( d => {
      this.uid = d.uid!;
      
      if( d.uid?.length! > 0 ){

        this._srvcliente.getEntidad(d.uid!).subscribe( data => 
          {
            this.cliente = data.cliente; 
            //actulizar
            if(d.tipo != 'U'){
              this.spinner.hide();
            }  
            // mostrar
          })

        }else{
          this.spinner.hide();

        }
    });

  }

    buscarCliente(uid:string){
      this.spinner.show();
      this._srvcliente.getEntidad(uid).subscribe( data => 
        {
          this.cliente = data.cliente 
          this.spinner.hide()
        })
    
    }
  

  ngOnInit(): void {
  }



}
