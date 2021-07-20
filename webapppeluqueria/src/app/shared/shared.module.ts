import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TitlePageComponent } from './title-page/title-page.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { EstadoIDComponent } from './estado-id/estado-id.component';



@NgModule({
  declarations: [
    NavbarComponent,
    TitlePageComponent,
    SubmenuComponent,
    EstadoIDComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
  ],
  exports : [
    NavbarComponent,
    TitlePageComponent,
    SubmenuComponent,
    EstadoIDComponent
  ]
})
export class SharedModule { }
