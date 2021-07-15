import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Atencion } from 'src/app/models/atencion';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ServicioProductoService } from '../../../services/servicio-producto.service';
import { Servicio } from 'src/app/models/servporduct';
import { Cita } from '../../../models/cita';
import { CitasService } from '../../../services/citas.service';
import { AtencionService } from '../../../services/atencion.service';

@Component({
  selector: 'app-form-atencion',
  templateUrl: './form-atencion.component.html',
  styleUrls: ['./form-atencion.component.scss']
})
export class FormAtencionComponent implements OnInit {

  titulo:string="Create Atencion";
  entidadForm  : FormGroup  ;
  atencion : Atencion = {};
  clientes : Cliente [] = [];
  servicioproducto : Servicio [] = [];
  cita:Cita={ idcliente:{nombres:'',apellidos:''}};
  uidcliente:string= '';
  uidcita:string='';
  
  constructor(private _srvcliente : ClienteService
    ,private _srvatencion : AtencionService
    ,private _srvcita : CitasService
    ,private _srvproducto : ServicioProductoService) {
    this.entidadForm = this.initForm(false);
   }

  ngOnInit(): void {
    this.getClientes();
    this.getServicioProducto();
  }

  onSubmit(){

    // Uid sea diferente de length cero
    //this.entidadForm.value.idcliente =this.uid;
    if(this.uidcliente.length > 0 && this.uidcita.length > 0){
      
      this.onSave()
    }
    
    
  }

  onSave(){
    this.entidadForm.value.idcliente =this.uidcliente;
    this.entidadForm.value.idcita = this.uidcita;
    let doc:any = [];
    this.entidadForm.value.idservicio.forEach( (x:number) => {
      doc.push({id:x})
    });
    this.entidadForm.value.idservicio = doc;
    let entidad = this.entidadForm.value; 
    //console.log(entidad, this.entidadForm.value, this.entidadForm.valid);
    
    if(this.entidadForm.valid){
      this._srvatencion.addEntidad(entidad).subscribe( data => {
        if(data.ok){

          console.log('Exitoso', data.atencion?._id);
          this.entidadForm.reset();
        }else{
          console.log('Error');
          
        }
      },err=> {
        console.log(err);
        
      })
    }else{
      console.log('no valid', entidad);
      
    }

  }


  getOneCliente(event:any){
    //console.log('cambio', event._id);
    this.uidcliente = event._id;
    this._srvcliente.getEntidad(event._id).subscribe(data => {
      if(data.ok){

        console.log('Exitoso');
        
      }else{
        console.log('Error');
        
      }
    })

    this._srvcita.getOneClienteId(event._id).subscribe( data => {
      if( data.ok){
        this.cita = data.cita;
        this.uidcita = data.cita._id!;       
        console.log('exitoso');
        
      }else{
        console.log('Error');
        
      }
    })
    

  }
  getClientes(){
    this._srvcliente.getAllEntidadOK().subscribe(data => {
      this.clientes = data.clientes;
    })
  }
  getServicioProducto(){
    this._srvproducto.getAllEntidad(1).subscribe(data => {
      if( data.ok ){
        this.servicioproducto = data.servicios;
      }
    })
  }


  initForm(status: boolean){
    let fecha = moment().format('YYYY-MM-DD');
    let hora = moment().format('HH:mm:ss');
    if(status){
      
      return this.entidadForm = new FormGroup({
        fecha     : new FormControl(fecha, Validators.required),
        hora      : new FormControl(hora, Validators.required),
        idcita    : new FormControl(hora, Validators.required),
        idservicio: new FormControl([], Validators.required),
        idcliente : new FormControl("", Validators.required),
        
      });
    }else{
      
      return this.entidadForm = new FormGroup({
        fecha     : new FormControl(fecha, Validators.required),
        hora      : new FormControl(hora, Validators.required),
        idcita    : new FormControl("2", Validators.required),
        idservicio: new FormControl([], Validators.required),        
        idcliente : new FormControl("2", Validators.required),
     });
    }

  }

}
