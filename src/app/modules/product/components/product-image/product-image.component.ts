import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'; // sweetalert
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../_services/category.service';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { ProductImagesService } from '../../_services/product-images.service';
import { ProductService } from '../../_services/product.service';
import { ProductImage } from '../../_models/product-image';
import { Product } from '../../_models/product';
import { Category } from '../../_models/category';

declare var $: any; // jquery

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent{


  product: any | Product = new Product(); // datos del producto consultado
  product_image: any | ProductImage = new ProductImage(); // datos de la imagen del producto consultado
  product_images: any | ProductImage[] = []; // lista de imagenes del producto consultado
  gtin: any | string = ""; // gtin del producto consultado

  categories: Category[] = []; // lista de regiones
  category: any | Category = new Category() // datos de categoria consultada


  // formulario de actualización


  form = this.formBuilder.group({
    product: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9À-ÿ][a-zA-Z0-9À-ÿ ]+$")]],
    gtin: ["", [Validators.required, Validators.pattern("^[0-9]*$|^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    product_id: ["", [Validators.required]] ,
    price: ["", [Validators.required]],
    category_id: ["", [Validators.required]],
    description: ["", [Validators.required]],
    stock: ["", [Validators.required]],
  });

  submitted = false; // indica si se envió el formulario

  constructor(
    private productService: ProductService, // servicio customer de API
    private productImageService: ProductImagesService, // servicio product image de API
    private formBuilder: FormBuilder, // formulario
    private categoryService: CategoryService, // servicio category de API
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente
    private service: NgxPhotoEditorService
  ){}

  ngOnInit(){
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    if(this.gtin){
      this.getProduct();
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        toast: true,
        showConfirmButton: false,
        text: 'GTIN de producto invalido',
        background: '#F8E8F8',
        timer: 2000
      });
    }
  }

  // CRUD customer

  getProduct(){
    this.productService.getProduct(this.gtin).subscribe(
      res => {
        this.product = res; // asigna la respuesta de la API a la variable de cliente
        this.getCategory(this.product.category_id);
        this.getImage(this.product.product_id);
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  } 

  getImage(id: number){
    this.productImageService.getProductImages(id).subscribe(
      res => {
        this.product_images = res; // asigna la respuesta de la API a la variable 
        console.log(res)
      },
      err => {
        // muestra mensaje de error
        console.log(err);
      }
    );
  }

  onSubmit(){
    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.productService.updateProduct(this.form.value, this.product.product_id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El producto ha sido actualizado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        if(this.form.controls['gtin'].value != this.gtin){
          this.gtin = this.form.controls['gtin'].value!; // actualizamos el gtin

          // sustituimos en la url el nuevo gtin
          let currentUrl = this.router.url.split("/");
          currentUrl.pop();
          currentUrl.push(this.gtin);
          
          // actualizamos la url con el nuevo gtin
          this.redirect(currentUrl);
        }

        this.getProduct(); // consulta el producto con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  updateProduct(){
    this.form.reset();
    this.submitted = false;
    this.getCategories();

    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['product_id'].setValue(this.product.product_id);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['category_id'].setValue(this.product.category_id);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['stock'].setValue(this.product.stock);

    $("#modalForm").modal("show");
  }

  // customer image

  updateProductImage(image: string){
    let productImage: ProductImage = new ProductImage(); // asigna la variable de cliente a la variable de imagen
    productImage.image = image; // asigna la imagen a la variable de imagen
    productImage.product_id = this.product.product_id; // asigna el id del cliente a la variable de imagen

    this.productImageService.updateProductImage(productImage).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La imagen ha sido actualizada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getProduct(); // consulta el producto con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  // catalogues

  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res; // asigna la respuesta de la API a la lista de categorias
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  // auxiliary functions

  getCategory(id: number){
    this.categoryService.getCategory(id).subscribe(
      res => {
        this.category = res; // asigna la respuesta de la API a la lista de regiones
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }



  decrementStock() {
    const stockControl = this.form.get('stock');
  
    if (stockControl && stockControl.value !== null) {
      const stockValue = parseInt(stockControl.value, 10);
  
      if (!isNaN(stockValue)) {
        const decrementedValue = stockValue > 0 ? stockValue - 1 : 0;
        stockControl.setValue(decrementedValue.toString());
      }
    }
  }
  
  incrementStock() {
    const stockControl = this.form.get('stock');
  
    if (stockControl && stockControl.value !== null) {
      const stockValue = parseInt(stockControl.value, 10);
  
      if (!isNaN(stockValue)) {
        const incrementedValue = stockValue + 1;
        stockControl.setValue(incrementedValue.toString());
      }
    }
  }
  

  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      console.log(data);
      this.updateProductImage(data.base64!);
    });
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }
}

