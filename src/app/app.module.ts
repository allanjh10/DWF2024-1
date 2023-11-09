import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './modules/product/product.module';
import { LayoutModule } from './modules/layout/layout.module';
import { CategoryComponent } from './modules/product/components/category/category.component';
import { ConsumeApiModule } from './modules/consume-api/consume-api.module';
import {NgxPhotoEditorModule} from "ngx-photo-editor";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    LayoutModule,
    ConsumeApiModule,
    NgxPhotoEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
