import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewUxService } from '../../../services/view-ux.service';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss']
})
export class DetalleClienteComponent implements OnInit {

  subcripcion: Subscription;
  cliente: Cliente = {nombres:''};
  b:boolean=false;
  uid:string='';

  constructor(private _srvMenu: ViewUxService,
    private _srvcliente: ClienteService) { 

    this.subcripcion = this._srvMenu.getUId().subscribe( d => {
      this.uid = d;
      //console.log(d);
      if( d.length > 0 ){

        this._srvcliente.getEntidad(d).subscribe( data => 
          {
            this.cliente = data.cliente; 
            //console.log(data.cliente.nombres);
            
            this.b = true;
          })
          //this.buscarCliente(d);
        }
    });

  }





    buscarCliente(uid:string){
      this._srvcliente.getEntidad(uid).subscribe( data => 
        {
          this.cliente = data.cliente 
          console.log(data.cliente);
          
          this.b = true;
        })
    
    }
  

  ngOnInit(): void {
  }

}
