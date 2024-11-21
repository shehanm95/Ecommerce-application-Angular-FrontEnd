import { Component, inject, OnInit } from '@angular/core';
import { IProduct, IProductForCard, ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from "../product-card/product-card.component";
import { IProductFilterObj, ProductFilterComponent } from "../../filters/product-filter/product-filter.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, ProductCardComponent, ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  // this.products = this.productService.getAllProducts();


  products!: Observable<IProductForCard[]>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // this.products = this.productService.getAllProducts();
    this.products = this.productService.getAllProducts();

  }

  onFilterObjectCreated(searchObj: IProductFilterObj) {
    this.products = this.productService.getProductsOnFilterObj(searchObj);
    console.log(searchObj);
  }

}
