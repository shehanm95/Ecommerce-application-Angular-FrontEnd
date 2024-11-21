import { EventEmitter, Injectable } from '@angular/core';
import { IProduct } from './product.service';
import { C } from '@angular/cdk/keycodes';
import { ToastrService } from 'ngx-toastr';
import { mainUrl, UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  mainUrl = mainUrl;
  url = mainUrl + "/orders";


  constructor(private toaster: ToastrService, private http: HttpClient, private userService: UserService) { }
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

    let order = this.createOrder();
    this.http.post(`${this.url}/checkout`, order).subscribe({
      next: () => {
        this.toaster.success("You Placed a order successfully", "Success !")
        this.cartItems = []
        this.getItemCount();
        this.cartChanged.emit(this.cartItems);
      },
      error: () => {
        this.toaster.error("Error in placing order..", "Something Wrong !")
      }
    }
    )
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

  createOrder(): IOrder | null {

    //getting user;
    let user = this.userService.getCurrentUser();
    let userId = 0;
    if (user) {
      userId = user.id;
    } else {
      this.toaster.error("You need to register before placing order", "Register Now !")
      return null;
    }

    // convert cart items to order details;
    const orderDetails: IOrderDetail[] = this.cartItems.map((cartItem => {
      return {
        productId: cartItem.product.id,
        sellerId:cartItem.product.sellerId,
        quantity: cartItem.quantity
      }
    }))

    let order: IOrder = {
      buyerId: userId,
      orderDetails: orderDetails
    };

    console.log(order);
    return order;
  }



}


export interface CartItem {
  product: IProduct;
  quantity: number;
}
export interface IOrderDetail {
  productId: number,
  sellerId: number,
  quantity: number
}

export interface IOrder {
  buyerId: number;
  orderDetails: IOrderDetail[];
}
