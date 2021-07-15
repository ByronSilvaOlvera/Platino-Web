import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente/cliente.component';
import { CitaComponent } from './cita/cita.component';
import { AtencionComponent } from './atencion/atencion.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ComponentsModule } from '../components/components.module';
import { FormClienteComponent } from './cliente/form-cliente/form-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleClienteComponent } from './cliente/detalle-cliente/detalle-cliente.component';
import { BrowserModule } from '@angular/platform-browser';




@NgModule({
  declarations: [
    ClienteComponent,
    CitaComponent,
    AtencionComponent,
    ServicioComponent,
    FormClienteComponent,
    DetalleClienteComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ClienteComponent
  ]
})
export class PagesModule { }
