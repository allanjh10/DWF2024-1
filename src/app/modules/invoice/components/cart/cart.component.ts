import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../_services/cart.service';
import { Cart } from '../../_models/cart';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'; // sweetalert
import { ProductService } from '../../../product/_services/product.service';
import { ProductImagesService } from '../../../product/_services/product-images.service';
import { Product } from '../../../product/_models/product';

declare var $: any; // jquery

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent {

  cart: any| Cart[] = []; // datos del producto consultado
  rfc: any | string = "";
  id: any | number = 0; // id del producto consultado
  cart_id: number = 0;
  gtin: string = "";
  total: number = 0;
  quantity: number = 0;



  submitted = false; // indica si se envió el formulario


  constructor(
    private productService: ProductService, // servicio customer de API
    private productImageService: ProductImagesService, // servicio product image de API
    private formBuilder: FormBuilder, // formulario 
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente
    private cartService: CartService // servicio cart de API
  ){}

  ngOnInit(){
    this.rfc = localStorage.getItem('user_rfc');
    if(this.rfc){
      this.getCart();
    }
  }

  getCart(){
    this.cartService.getCart(this.rfc).subscribe(
      (data: any) => {
        this.cart = data;
        console.log(this.cart);
        console.log(this.cart.length);
        console.log(this.cart[0]);
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

  deleteCart(){
    this.cartService.deleteCart(this.rfc).subscribe(
      (data: any) => {
        this.cart = data;
        Swal.fire({
          title: 'Carrito vaciado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err=>{
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

  removeFromCart(id: number){
    this.cartService.removeFromCart(id).subscribe(
      (res: any) => {
        this.cart = res;
        Swal.fire({
          title: 'Producto eliminado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
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


  onSubmit(){
    this.submitted = true;;
    // valida el formulario
  }




  
  updateQuantity(id: number, event: any) {
    const stockControl = event.target.value;
    const stockValue = parseInt(stockControl);
    if (!isNaN(stockValue)) {
      const product: Cart | undefined = this.cart.find((item: Cart) => item.cart_id === id)
      this.gtin = product?.gtin || '';
      console.log(this.gtin);
      this.quantity = isNaN(stockValue) ? 0 : stockValue;
      this.cart_id=id;
      // Actualizar el carrito después de manipular la cantidad
      this.addToCart();
    }
  }
  
  decrementStock(cart_id: number) {
    const product: Cart | undefined = this.cart.find((item: Cart) => item.cart_id === cart_id)
    if (product && product.quantity > 0) {
      product.quantity--;
      this.cart_id = cart_id;
      this.quantity = product.quantity;
      this.gtin = product.gtin;
      this.addToCart();
    }
  }
  
  incrementStock(cart_id: number) {
    const product: Cart | undefined = this.cart.find((item: Cart) => item.cart_id === cart_id);
    if (product) {
      product.quantity++;
      this.cart_id = cart_id;
      this.quantity = product.quantity;
      this.gtin = product.gtin;
      this.addToCart();
    }
  }
  
  
  
  
  addToCart() {
    let cart1: Cart = new Cart();
    cart1.cart_id = this.cart_id;
    cart1.rfc = this.rfc;
    cart1.gtin = this.gtin;
    cart1.quantity = this.quantity;
    cart1.status = 1;
    console.log(cart1);
    this.cartService.addToCart(cart1).subscribe(
      (res: any) => {
        this.cart = res;
        console.log("cantidad actualizada");
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
  
  

  




}







  
