import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewUxService } from '../../../services/view-ux.service';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/menu';
import { uidComponente } from '../../../store/page.actions';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss']
})
export class DetalleClienteComponent implements OnInit {

  subcripcion: Subscription;
  cliente: Cliente = {nombres:''};
  @Input() titulo:string='Detalle del Cliente';
  @Input() estado:boolean=true;
  @Input() uid:string="";

  constructor(private _srvMenu: ViewUxService,
    private _srvcliente: ClienteService
    ,private spinner: NgxSpinnerService
    ,private snotifyService: SnotifyService
    ,private store: Store<AppState>
    ,private _srventidad : ClienteService
    ) { 

    this.subcripcion = this._srvMenu.getUId().subscribe( d => {
      this.uid = d.uid!;
      console.log(this.uid);  
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
      
      //this.store.select('page').subscribe( x => this.uid = x?.uid!)  
      
  }
  
  ngOnInit(): void {
    console.log(`Det cliente`);
    
  }

  onDelete(){
  
    let id='';
    this.store.select('page').subscribe( x => id = x?.uid!)
                  
    this._srventidad.deleteEntidad(id).subscribe( data => {
      if(data.ok){
        this.snotifyService.success('Cliente eliminado');
        this.store.dispatch(uidComponente({uid : "" }))
    
      }
      else{
        this.snotifyService.warning('No se puede eliminar el Cliente '+ data.msg);
      
      }
    }, err => {
      this.snotifyService.error('Web Service no responde '+ err );
      
    })
  }

  



}
