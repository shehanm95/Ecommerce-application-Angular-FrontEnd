import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Category, CategoryService } from '../../../service/category.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SubCategory, SubCategoryService } from '../../../service/sub-category.service';
import { catchError, Observable, of, pipe, tap } from 'rxjs';

@Component({
  selector: 'app-seller-add-category',
  standalone: true,
  imports: [FormsModule, CommonModule, AsyncPipe],
  templateUrl: './seller-add-category.component.html',
  styleUrls: ['./seller-add-category.component.css']
})
export class SellerAddCategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  subCategories$?: Observable<SubCategory[]>;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService, private cdr: ChangeDetectorRef) {
    let categoryId = 0
    this.subCategories$ = this.subCategoryService.getSubCategoriesByCategory(categoryId);

  }



  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.findAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: () => this.errorMessage = 'Failed to load categories'
    });
  }

  addCategory(categoryInput: HTMLInputElement): void {
    const name = categoryInput.value.trim();
    console.log(name)
    if (name) {
      const newCategory: Category = { id: 0, name };
      this.categoryService.addCategory(newCategory).subscribe({
        next: (category) => {
          this.loadCategories();
          this.errorMessage = null;
          categoryInput.value = '';
        },
        error: () => this.errorMessage = 'Failed to add category.'
      });
    }
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    if (this.selectedCategory.id)
      this.loadSubCategoriesForSelectedCategory();
  }

  loadSubCategoriesForSelectedCategory(): void {
    if (!this.selectedCategory) return

    this.subCategories$ = undefined;

    this.subCategories$ = this.subCategoryService.getSubCategoriesByCategory(this.selectedCategory.id)

    // .pipe(
    //   tap(() => {
    //     this.loading = false;
    //     this.errorMessage = null;
    //   }),
    //   catchError(() => {
    //     this.loading = false;
    //     this.errorMessage = 'Failed to load subcategories for this category.';
    //     return of([]); // Return an empty array in case of error
    //   })
    // );
  }

  addSubCategory(subCategoryInput: HTMLInputElement): void {
    const subCategoryName = subCategoryInput.value.trim();
    console.log(subCategoryName);
    if (subCategoryName && this.selectedCategory) {
      if (this.selectedCategory.id) {
        const newSubCategory: SubCategory = {
          id: -1,
          subCategoryName: subCategoryName,
          categoryId: this.selectedCategory.id
        };
        console.log(newSubCategory)
        this.subCategoryService.createSubCategory(newSubCategory).subscribe({
          next: (subCategory) => {
            // After adding the subcategory to the database, update the UI
            //this.subCategories.push(subCategory);
            this.errorMessage = null;
            subCategoryInput.value = '';
            if (this.selectedCategory != null) {
              this.loadSubCategoriesForSelectedCategory()
              console.log("sub categories loaded");
            }

          },
          error: () => {
            this.errorMessage = 'Failed to add subcategory.';
          }
        });
      } else {
        this.errorMessage = 'Selected category is invalid or missing a category ID.';
      }



    } else {
      // Handle the case where subCategoryName or selectedCategory is missing
      this.errorMessage = 'Subcategory name is required, and a category must be selected.';
    }
  }

  removeCategory(category: Category): void {
    this.categoryService.removeCategory(category.id!).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c !== category);
        if (this.selectedCategory === category) this.selectedCategory = null;
        // this.subCategories = []; // Clear subcategories when category is removed
      },
      error: () => this.errorMessage = 'Failed to remove category.'
    });
  }

  removeSubCategory(subCategory: number): void {

    // this.loadSubCategoriesForSelectedCategory(this.selectedCategory);
  }



}
