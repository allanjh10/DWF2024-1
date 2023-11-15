import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/components/category/category.component';
import { ProductComponent } from './modules/product/components/product/product.component';
import { ProductImageComponent } from './modules/product/components/product-image/product-image.component';
import { RegionComponent } from './modules/customer/components/region/region.component';
import { CustomerComponent } from './modules/customer/components/customer/customer.component';
import { CustomerImageComponent } from './modules/customer/components/customer-image/customer-image.component';
import {CartComponent} from './modules/invoice/components/cart/cart.component';
import { HomeComponent } from './modules/layout/home/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'category', component: CategoryComponent },
  { path: "product", component: ProductComponent },
  { path: "product/:gtin", component: ProductImageComponent },
  {path: 'region', component: RegionComponent},
  {path: 'customer', component: CustomerComponent},
  { path: "customer/:rfc", component: CustomerImageComponent },
  {path: "cart", component: CartComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
