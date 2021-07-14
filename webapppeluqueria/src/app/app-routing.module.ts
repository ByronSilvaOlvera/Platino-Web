import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AtencionComponent } from './pages/atencion/atencion.component';
import { CitaComponent } from './pages/cita/cita.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ServicioComponent } from './pages/servicio/servicio.component';

const routes: Routes = [
  {path : '' , component : HomeComponent, },
  {path : 'cliente' , component : ClienteComponent, },
  {path : 'cita' , component : CitaComponent, },
  {path : 'atencion' , component : AtencionComponent, },
  {path : 'servicio' , component : ServicioComponent, },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
