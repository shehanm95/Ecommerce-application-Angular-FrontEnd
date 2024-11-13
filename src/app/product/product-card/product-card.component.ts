import { Component, inject, Input } from '@angular/core';
import { IProduct, ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  cartService = inject(CartService);

  addToCart() {
    this.cartService.addProduct(this.product);
    console.log("added")
  }
}
