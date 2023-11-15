import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home/home.component';


@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    // CommonModule,
    SidebarComponent,
    NavbarComponent
  ]
})
export class LayoutModule { }


