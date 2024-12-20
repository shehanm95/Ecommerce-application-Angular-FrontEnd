import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Adjust path if necessary
import { MainBackendUrl } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private url = MainBackendUrl
  private apiUrl = `${this.url}/subcategories`;

  constructor(private http: HttpClient) { }

  createSubCategory(subCategory: SubCategory): Observable<SubCategory> {
    console.log("in service")
    console.log(subCategory);
    return this.http.post<SubCategory>(this.apiUrl + "/add", subCategory);
  }

  getSubCategoriesByCategory(categoryId: number): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.apiUrl}/category/${categoryId}`);
  }
}


export interface SubCategory {
  id: number;
  subCategoryName: string;
  categoryId: number;
}
