import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { GridDataComponent } from './grid-data/grid-data.component';
import { BrowserModule } from '@angular/platform-browser';
import { InicioPageComponent } from './inicio-page/inicio-page.component';
import { InputFormComponent } from './input-form/input-form.component';
import { DeleteMsgComponent } from './delete-msg/delete-msg.component';



@NgModule({
  declarations: [
    HomeComponent,
    GridDataComponent,
    InicioPageComponent,
    InputFormComponent,
    DeleteMsgComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  exports : [
    GridDataComponent,
    InicioPageComponent,
    InputFormComponent,
    DeleteMsgComponent

  ]
})
export class ComponentsModule { }
