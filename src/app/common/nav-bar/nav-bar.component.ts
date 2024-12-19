import { Component, OnInit } from '@angular/core';
import { IUser, UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartItem, CartService } from '../../service/cart.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  isNavbarCollapsed: boolean = true;
  navBarCollapseToggle() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed
    console.log(this.isNavbarCollapsed)
  }
  user!: IUser | null;
  mobile = true;
  cartItemCount!: number;

  constructor(private userService: UserService, private router: Router, private cartService: CartService) {
    this.cartService.cartChanged.subscribe((data: CartItem[]) => {
      this.cartItemCount = this.cartService.getItemCount();
    })


  }

  goToCart() {
    this.navBarCollapseToggle();
    this.router.navigate(['/cart'])
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    console.log(this.user)

  }

  toLogin() {
    this.navBarCollapseToggle();
    this.router.navigate(['/login'])
  }

  goToProfile() {
    this.navBarCollapseToggle();
    this.router.navigate(["/profile"])
  }


}
