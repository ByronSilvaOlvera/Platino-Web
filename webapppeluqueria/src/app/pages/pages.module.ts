import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente/cliente.component';
import { CitaComponent } from './cita/cita.component';
import { AtencionComponent } from './atencion/atencion.component';
import { ServicioComponent } from './servicio/servicio.component';




@NgModule({
  declarations: [
    ClienteComponent,
    CitaComponent,
    AtencionComponent,
    ServicioComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ClienteComponent
  ]
})
export class PagesModule { }
