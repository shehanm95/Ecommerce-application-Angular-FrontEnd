import { EventEmitter, Injectable } from '@angular/core';
import { IProduct } from './product.service';
import { C } from '@angular/cdk/keycodes';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private toaster: ToastrService) { }
  cartChanged = new EventEmitter<CartItem[]>();

  cartItems: CartItem[] = [];

  addProduct(product: IProduct) {
    let i = 0;
    for (i = 0; i < this.cartItems.length; i++) {
      if (product.id == this.cartItems[i].product.id) {
        this.cartItems[i].quantity++;
        this.cartChanged.emit(this.cartItems);
        this.printCart();
        return;
      }
    }
    this.cartItems.push({ product: product, quantity: 1 })
    this.cartChanged.emit(this.cartItems);
    this.printCart();
    return;
  }

  reduceProduct(cartItem: CartItem) {
    if (this.cartItems.includes(cartItem)) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        let index = this.cartItems.indexOf(cartItem);
        this.cartItems.splice(index);
      }
      this.getItemCount();
      this.cartChanged.emit(this.cartItems);
    }
  }

  checkout() {
    this.toaster.success("You Placed a order successfully", "Success")
    this.cartItems = []
    this.getItemCount();
    this.cartChanged.emit(this.cartItems);
  }

  removeFromCart(cartItem: CartItem) {
    let index = this.cartItems.indexOf(cartItem);
    this.cartItems.splice(index);
    this.getItemCount();
    this.cartChanged.emit(this.cartItems);
  }

  total: number = 0

  getItemCount() {
    let cartItemCount = 0
    this.total = 0;
    this.cartItems.forEach(item => {
      cartItemCount += item.quantity
      this.total += (item.quantity * item.product.price)
    });
    return cartItemCount;
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }
  printCart() {
    console.log(this.cartItems)
  }

  getTotal() {
    return this.total;
  }
}

export interface CartItem {
  product: IProduct;
  quantity: number;
}
