import { Component, inject, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products!: Observable<IProduct[]>;

  constructor(private productService: ProductService) { }



  ngOnInit(): void {
    // this.products = this.productService.getAllProducts();
    this.products = this.productService.getAllProducts();

  }


}
