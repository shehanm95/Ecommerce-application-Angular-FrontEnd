import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NothingToShowComponent } from "../../common/nothing-to-show/nothing-to-show.component";
import { RouterLink, RouterModule } from '@angular/router';
import { IUser, MainBackendUrl, UserService } from '../../service/user.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, NothingToShowComponent, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {


  itemCount: number = 0;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  userImg?: string;


  constructor(private cartService: CartService, private toaster: ToastrService, private userService: UserService) {
    this.itemCount = this.cartService.getItemCount();
    this.totalPrice = this.cartService.getTotal();
    this.cartService.cartChanged.subscribe(
      (data) => {
        this.itemCount = this.cartService.getItemCount();
        this.totalPrice = this.cartService.getTotal();
        this.cartItems = this.cartService.getCartItems()
      }
    )
    let u = userService.getCurrentUser();
    console.log(u?.imageLink)
    if (u) {
      this.userImg = u.imageLink;
    }
  }


  continueShopping() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems()
  }

  checkout() {
    if (this.itemCount < 1) {
      this.toaster.error("Please add items first", "No Items To Buy")
      return
    }
    this.cartService.checkout();

  }
  // =============
  removeItem(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
  }

  increaseQuantity(cartItem: CartItem): void {
    this.cartService.addProduct(cartItem.product);
  }

  decreaseQuantity(cartItem: CartItem): void {
    this.cartService.reduceProduct(cartItem);

  }
}
