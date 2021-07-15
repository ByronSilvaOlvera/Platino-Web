import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GridDataComponent } from './grid-data/grid-data.component';
import { BrowserModule } from '@angular/platform-browser';
import { InicioPageComponent } from './inicio-page/inicio-page.component';



@NgModule({
  declarations: [
    HomeComponent,
    GridDataComponent,
    InicioPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  exports : [
    GridDataComponent,
    InicioPageComponent

  ]
})
export class ComponentsModule { }
