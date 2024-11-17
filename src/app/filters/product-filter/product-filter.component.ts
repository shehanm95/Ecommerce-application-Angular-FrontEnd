import { Component, EventEmitter, Output } from '@angular/core';
import { Category, CategoryService } from '../../service/category.service';
import { SubCategory, SubCategoryService } from '../../service/sub-category.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {

  @Output() onFilterObjCreated = new EventEmitter()
  selectedSubCategoryId: number = 0;
  categories$: Observable<Category[]>;
  subCategories$?: Observable<SubCategory[]>;
  selectedCategoryId: number = 0;
  searchText: string = "";
  filterObj: IProductFilterObj = {
    text: "",
    category: 0,
    subCategory: 0
  };

  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService) {
    this.categories$ = categoryService.findAllCategories();
  }

  onCategoryClicked(categoryId: number) {
    this.subCategories$ = this.subCategoryService.getSubCategoriesByCategory(categoryId);
    this.selectedCategoryId = categoryId;
    this.filterObj.category = categoryId;
    this.onFilterObjCreated.emit(this.filterObj);
  }

  onSubCategoryClicked(subCategoryId: number) {
    this.selectedSubCategoryId = subCategoryId;
    this.filterObj.subCategory = subCategoryId;
    this.onFilterObjCreated.emit(this.filterObj);
  }

  onSearchTextChange() {
    this.filterObj.text = this.searchText;
    this.onFilterObjCreated.emit(this.filterObj);
  }













}
export interface IProductFilterObj {
  text: string,
  category: number,
  subCategory: number,
}
