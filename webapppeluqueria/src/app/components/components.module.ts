import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { GridDataComponent } from './grid-data/grid-data.component';
import { BrowserModule } from '@angular/platform-browser';
import { InicioPageComponent } from './inicio-page/inicio-page.component';
import { InputFormComponent } from './input-form/input-form.component';
import { DeleteMsgComponent } from './delete-msg/delete-msg.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsDataObjectComponent } from './charts-data-object/charts-data-object.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    HomeComponent,
    GridDataComponent,
    InicioPageComponent,
    InputFormComponent,
    DeleteMsgComponent,
    ChartsDataObjectComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports : [
    GridDataComponent,
    InicioPageComponent,
    InputFormComponent,
    DeleteMsgComponent,
    ChartsDataObjectComponent
    
  ]
})
export class ComponentsModule { }
