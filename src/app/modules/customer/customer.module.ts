import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomerComponent } from './components/customer/customer.component';
import { RegionComponent } from './components/region/region.component';
import { CustomerImageComponent } from './components/customer-image/customer-image.component';



@NgModule({
  declarations: [
    CustomerComponent,
    RegionComponent,
    CustomerImageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ]
})
export class CustomerModule { }
