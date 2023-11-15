import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../_services/cart.service';
import { Cart } from '../../_models/cart';

declare var $: any; // jquery

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent {

  cart: any | Cart = new Cart();
  id: any | number = 0;



}
