import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {

  entidadForm  : FormGroup  ;
  constructor(private fb: FormBuilder ) {
    this.entidadForm = this.initForm(false)
   }

  ngOnInit(): void {
  }

  onSaveEntidad(){
  console.log(this.entidadForm.value);
  
  }

  initForm(status: boolean){
    if(status){
      return this.entidadForm = new FormGroup({
        nombres:       new FormControl('', Validators.required),
     });
    }else{
      
      return this.entidadForm = new FormGroup({
        nombres       : new FormControl('', Validators.required),
        apellidos     : new FormControl('', Validators.required),
        identificacion: new FormControl('', Validators.required),
        telefono      : new FormControl('', Validators.required),
        email         : new FormControl('', Validators.required),
        direccion     : new FormControl('', Validators.required),
        fechanacio    : new FormControl('', Validators.required),
     });
    }
  }

}
