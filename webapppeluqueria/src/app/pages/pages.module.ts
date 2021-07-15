import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente/cliente.component';
import { CitaComponent } from './cita/cita.component';
import { AtencionComponent } from './atencion/atencion.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ComponentsModule } from '../components/components.module';
import { FormClienteComponent } from './cliente/form-cliente/form-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ClienteComponent,
    CitaComponent,
    AtencionComponent,
    ServicioComponent,
    FormClienteComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    //FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ClienteComponent
  ]
})
export class PagesModule { }
