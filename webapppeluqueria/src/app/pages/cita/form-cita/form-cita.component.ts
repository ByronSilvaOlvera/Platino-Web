import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Cita } from '../../../models/cita';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { CitasService } from '../../../services/citas.service';


@Component({
  selector: 'app-form-cita',
  templateUrl: './form-cita.component.html',
  styleUrls: ['./form-cita.component.scss']
})
export class FormCitaComponent implements OnInit {

  entidadForm  : FormGroup  ;
  cita : Cita = {idcliente:{ nombres:"", apellidos: "" }};
  clientes : Cliente [] = [];
  titulo:string ="Crear cita";

  estado : any [] = [
    {
      id:"Pendiente",
      estado: "Pendiente"
    },
    {
      id:"No asistio",
      estado: "No asistio"
    },
    {
      id:"Atendida",
      estado: "Atentida"
    }
  ]

  constructor(private _srvcliente : ClienteService
    ,private _srventidad : CitasService) {
    this.entidadForm = this.initForm(false);
   }

  ngOnInit(): void {
    this.getClientes()
  }

  onSubmit(){
    //console.log(this.entidadForm.value);
    this.onSave();
    
  }

  onSave(){
    if(this.entidadForm.valid){
      this._srventidad.addEntidad(this.entidadForm.value).subscribe( d => {
        if(d.ok){
          console.log('Exitoso');

          this.entidadForm.reset
        }else{
          console.log('error al Guardar');
          
        }
      })
    }else{
      console.log('Error');
      
    }
  }


  getClientes(){
    this._srvcliente.getAllEntidadOK().subscribe(data => {
      this.clientes = data.clientes;
    })
  }

  initForm(status: boolean){
    if(status){
      let fecha = moment(this.cita.fecha,"YYYY/MM/DD").format('YYYY-MM-DD');
      
      return this.entidadForm = new FormGroup({
        fecha      : new FormControl(fecha, Validators.required),
        hora       : new FormControl(this.cita.hora, Validators.required),
        descripcion: new FormControl(this.cita.descripcion!, Validators.required),
        estado     : new FormControl(this.estado[0].id, Validators.required),
        idcliente  : new FormControl(this.cita.idcliente, Validators.required),
        
     });
    }else{
      
      return this.entidadForm = new FormGroup({
        fecha      : new FormControl("", Validators.required),
        hora       : new FormControl("", Validators.required),
        descripcion: new FormControl("", Validators.required),
        estado     : new FormControl("", Validators.required),
        idcliente  : new FormControl("", Validators.required),
     });
    }
  }

}
