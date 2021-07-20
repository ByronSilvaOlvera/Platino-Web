import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewUxService } from '../../../services/view-ux.service';
import { Subscription } from 'rxjs';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';



@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {

  entidadForm  : FormGroup  ;
  @Input() titulo:string = "";
  subcripcion: Subscription;
  cliente : Cliente = {};
  uid:string='';
  namecontenido:string='Actualizar cliente';

  constructor(private fb: FormBuilder 
    ,private _srvMenu: ViewUxService
    ,private _srvcliente: ClienteService
    ,private spinner : NgxSpinnerService 
    ,private snotifyService: SnotifyService
    ) {
      this.entidadForm = this.initForm(false)
      this.subcripcion = this._srvMenu.getUId().subscribe(d => {
        this.uid = d.uid!;
        this.spinner.show();
        if( d.uid?.length! > 0 ){
          this._srvcliente.getEntidad(d.uid!).subscribe( data => {
            this.cliente = data.cliente;
            this.initForm(true);
            this.spinner.hide();
            this.namecontenido = "Actualizar cliente"
          })
        }
        else{
          this.namecontenido = "Crear cliente"
          this.spinner.hide();
          this.initForm(false);
        }
      })

   }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.uid.length > 0){
      // actulizar
      this.onUpdateEntidad()
      
    
    }else{
      // crear
      this.onSaveEntidad();
    }
  }

  onSaveEntidad(){
    console.log(this.entidadForm.value) ;
    if(this.entidadForm.valid){
      this._srvcliente.addEntidad(this.entidadForm.value).subscribe(
        data => {
          if(data.ok){
            //console.log('Exitoso');
            this.snotifyService.success('Guardo con exito')
            this.entidadForm.reset();
            // IR A DETALLE
            this._srvMenu.addOption(4);
            
            setTimeout( () => {
              this._srvMenu.addUId(
                {uid:data.cliente._id!,tipo:'C'});
            }
            ,1000)
            
            
          }else{
            
            this.snotifyService.error('Error al Guardar.!')
            console.log('error');
          }
          
        }
        , erro => {
          this.snotifyService.error('Problema con el servicio Web');
      });
    }else{

      this.snotifyService.error('Complete toda la informacion!')
      //console.log('Falta completar datos');
      
    }
  }

  onUpdateEntidad(){
    if(this.entidadForm.valid && this.uid.length > 0 ){
      this.spinner.show();
      this._srvcliente.updateEntidad(this.entidadForm.value, this.uid).subscribe(
        data => {
          if(data.ok){
            
            this.entidadForm.reset();            
            //IR A Detalle
            
            this._srvMenu.addOption(4);
            setTimeout( () => {              
              this._srvMenu.addUId({uid:data.cliente._id!,tipo:'U'});              
            }
            ,800)
            setTimeout(()=>{
              this.spinner.hide();

            },1000)
            
            this.snotifyService.success('Actulizacion Exitosa!')
            
          }else{

            this.spinner.hide();
            this.snotifyService.error('Error al Actulizar.!')            
          }
          
        }, err => {

          this.spinner.hide();
          this.snotifyService.error('Problema con el servicio Web');
        });
    }else{      
      this.snotifyService.warning('Falta completar datos')
    }
  }

  initForm(status: boolean){
    let fechaactual = moment().format('YYYY-MM-DD');
    if(status){
      let fecha = moment(this.cliente.fechanacio,"YYYY/MM/DD").format('YYYY-MM-DD');

      return this.entidadForm = new FormGroup({
      nombres       : new FormControl(this.cliente.nombres, Validators.required),
      apellidos     : new FormControl(this.cliente.apellidos!, Validators.required),
      identificacion: new FormControl(this.cliente.identificacion, Validators.required),
      telefono      : new FormControl(this.cliente.telefono, Validators.required),
      email         : new FormControl(this.cliente.email, Validators.required),
      direccion     : new FormControl(this.cliente.direccion, Validators.required),
      fechanacio    : new FormControl(fecha, Validators.required),
     });
    }else{
      
      return this.entidadForm = new FormGroup({
        nombres       : new FormControl('', Validators.required),
        apellidos     : new FormControl('', Validators.required),
        identificacion: new FormControl('', Validators.required),
        telefono      : new FormControl('', Validators.required),
        email         : new FormControl('', Validators.required),
        direccion     : new FormControl('', Validators.required),
        fechanacio    : new FormControl(fechaactual, Validators.required),
     });
    }
  }

}
