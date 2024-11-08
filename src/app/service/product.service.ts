import { Injectable } from '@angular/core';
import { mainUrl } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = mainUrl + "/product";
  constructor(private http: HttpClient, private router: Router) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + "/all")
  }
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
}
