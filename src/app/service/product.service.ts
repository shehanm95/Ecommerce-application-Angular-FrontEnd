import { Injectable } from '@angular/core';
import { MainUrl } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProductFilterObj } from '../filters/product-filter/product-filter.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = MainUrl + "/products";
  constructor(private http: HttpClient, private router: Router) { }

  getAllProducts(): Observable<IProductForCard[]> {
    return this.http.get<IProductForCard[]>(this.url + "/all")
  }
  addProduct(
    product: {
      productName: string;
      price: number;
      category: string;
      subCategory: string;
      sellerId: number;
      productCount: number
    },
    imageFile: File
  ): Observable<IProduct> {
    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('subCategory', product.subCategory);
    formData.append('sellerId', product.sellerId.toString());
    formData.append('productCount', product.productCount.toString());
    formData.append('imageFile', imageFile);

    return this.http.post<IProduct>(`${this.url}/add`, formData);
  }


  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/get/${id}`);
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/get/all/${category}`);
  }

  getProductsByName(name: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/get/${name}`);
  }

  editProduct(id: number, product: { productName: string; price: number; category: string }, imageFile: File): Observable<IProduct> {
    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('imageFile', imageFile);

    return this.http.put<IProduct>(`${this.url}/edit/${id}`, formData);
  }

  getProductsOnFilterObj(filterObj: IProductFilterObj): Observable<IProductForCard[]> {
    return this.http.post<IProductForCard[]>(`${this.url}/filter`, filterObj);
  }
  getSellerDetails(sellerId: number | undefined): Observable<SellerNameAndImg | undefined> {
    return this.http.get<SellerNameAndImg | undefined>(this.url + "/sellerDetails/" + sellerId);
  }
}

export interface IProduct {
  id: number;
  productName: string;
  price: number;
  category: number;
  subCategory: number;
  productImageLink: string;
  sellerId: number;
  rate?: number;
  rateCount?: number;
  productState?: ProductState;
  productCount?: number;
  productCode?: string;
  isNew?: boolean;
}

export interface IProductForCard {
  id: number;
  productName: string;
  price: number;
  category: number;
  subCategory: number;
  productImageLink: string;
  sellerId: number;
  rate?: number;
  rateCount?: number;
  productState?: ProductState;
  productCount?: number;
  productCode?: string;
  isNew?: boolean;
  sellerDetails: SellerNameAndImg
}

export interface SellerNameAndImg {
  sellerName: string;
  imageLink: string;
}

export enum ProductState {
  InStock = 'InStock',
  OutOfStock = 'OutOfStock',
  Removed = 'Removed'
}
