import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  @Input() type:string="text";
  @Input() id:string="name"
  @Input() placeholder:string="Agrega un contenido"
  @Input() name:string="nombres";

  @Input() label:string="nombres"; 
  @Input() formulario:FormGroup ;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({});
   }

  ngOnInit(): void {
  }

}
