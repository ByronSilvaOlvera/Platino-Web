import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { ClienteComponent } from './cliente/cliente.component';
import { CitaComponent } from './cita/cita.component';
import { AtencionComponent } from './atencion/atencion.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ComponentsModule } from '../components/components.module';
import { FormClienteComponent } from './cliente/form-cliente/form-cliente.component';
import { DetalleClienteComponent } from './cliente/detalle-cliente/detalle-cliente.component';
import { FormCitaComponent } from './cita/form-cita/form-cita.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { DetalleCitaComponent } from './cita/detalle-cita/detalle-cita.component';
import { FormAtencionComponent } from './atencion/form-atencion/form-atencion.component';
import { DetalleAtencionComponent } from './atencion/detalle-atencion/detalle-atencion.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ClienteComponent,
    CitaComponent,
    AtencionComponent,
    ServicioComponent,
    FormClienteComponent,
    DetalleClienteComponent,
    FormCitaComponent,
    DetalleCitaComponent,
    FormAtencionComponent,
    DetalleAtencionComponent,
  ],
  imports: [
    NgxSpinnerModule,
    BrowserAnimationsModule,
    CommonModule,
    ComponentsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports:[
    ClienteComponent
  ]
})
export class PagesModule { }
