import { Component, Input } from '@angular/core';
import { IProduct, ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: IProduct;

}
