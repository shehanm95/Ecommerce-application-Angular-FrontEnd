import { Component, inject, Input, OnInit } from '@angular/core';
import { IProductForCard, IProductForCardCreator } from '../../../service/product.service';
import { CartService } from '../../../service/cart.service';
import { IUser, UserService } from '../../../service/user.service';
import { U } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-add-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-add-card.component.html',
  styleUrl: './product-add-card.component.css'
})
export class ProductAddCardComponent {
  @Input() product!: IProductForCardCreator;
  @Input() imageSrc: string | ArrayBuffer | null = null;


  user?: IUser | null;
  constructor(private userService: UserService) {
    this.user = userService.getCurrentUser();
  }


}
