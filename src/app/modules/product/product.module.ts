import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';



@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CategoryComponent,
    // CommonModule,
  ]
})
export class ProductModule { }
