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
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { SharedModule } from '../shared/shared.module';


import { StoreModule } from '@ngrx/store';
import { pageReducer } from '../store/page.reducer';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ListaClientestComponent } from './cliente/lista-clientes/lista-clientes.component';
import { ListaCitasComponent } from './cita/lista-citas/lista-citas.component';
import { ListaAtencionesComponent } from './atencion/lista-atenciones/lista-atenciones.component';







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
    ListaClientestComponent,
    ListaCitasComponent,
    ListaAtencionesComponent,
  ],
  imports: [
    NgxSpinnerModule,
    BrowserAnimationsModule,
    CommonModule,
    ComponentsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SnotifyModule,
    SharedModule,
    StoreModule.forRoot({ page : pageReducer  }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    StoreRouterConnectingModule.forRoot(), 

    
    
  ],
  exports:[
    ClienteComponent
  ],
  providers : [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ]
})
export class PagesModule { }
