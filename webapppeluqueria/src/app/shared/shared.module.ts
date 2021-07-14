import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TitlePageComponent } from './title-page/title-page.component';
import { SubmenuComponent } from './submenu/submenu.component';



@NgModule({
  declarations: [
    NavbarComponent,
    TitlePageComponent,
    SubmenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
  ],
  exports : [
    NavbarComponent,
    TitlePageComponent,
    SubmenuComponent
  ]
})
export class SharedModule { }
