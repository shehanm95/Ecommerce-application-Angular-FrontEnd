import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '../../../service/category.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-add-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-add-category.component.html',
  styleUrl: './seller-add-category.component.css'
})
export class SellerAddCategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private categoryService: CategoryService) { }

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
    if (name) {
      const newCategory: Category = { name, subCategories: ['Others'] };
      this.categoryService.addCategory(newCategory).subscribe({
        next: (category) => {
          this.categories.push(category);
          this.successMessage = `Category '${category.name}' added successfully!`;
          this.errorMessage = null;
          categoryInput.value = '';
        },
        error: () => this.errorMessage = 'Failed to add category.'
      });
    }
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
  }

  // addSubCategory(subCategoryInput: HTMLInputElement): void {
  //   const subCategory = subCategoryInput.value.trim();
  //   if (subCategory && this.selectedCategory && !this.selectedCategory.subCategories.includes(subCategory)) {
  //     this.selectedCategory.subCategories.push(subCategory);
  //     subCategoryInput.value = '';
  //   }
  // }

  addSubCategory(subCategoryInput: HTMLInputElement): void {
    const subCategory = subCategoryInput.value.trim();

    // Check if the selectedCategory is defined and has subCategories
    if (subCategory && this.selectedCategory && this.selectedCategory.subCategories) {
      // Check if the sub-category already exists in the list
      if (!this.selectedCategory.subCategories.includes(subCategory)) {
        this.selectedCategory.subCategories.push(subCategory);
        subCategoryInput.value = ''; // Clear the input after adding the sub-category
      } else {
        console.warn('Sub-category already exists.');
      }
    } else {
      console.error('Selected category is not defined or does not have subCategories.');
    }
  }


  removeCategory(category: Category): void {
    this.categoryService.removeCategory(category.id!).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c !== category);
        if (this.selectedCategory === category) this.selectedCategory = null;
      },
      error: () => this.errorMessage = 'Failed to remove category.'
    });
  }

  // removeSubCategory(subCategory: string): void {
  //   if (this.selectedCategory) {
  //     this.selectedCategory.subCategories = this.selectedCategory.subCategories.filter(s => s !== subCategory);
  //   }
  // }

  removeSubCategory(subCategory: string): void {
    // Check if selectedCategory is defined and has subCategories
    if (this.selectedCategory && Array.isArray(this.selectedCategory.subCategories)) {
      // Remove the sub-category from the list
      this.selectedCategory.subCategories = this.selectedCategory.subCategories.filter(s => s !== subCategory);
    } else {
      console.error('Selected category is not defined or does not have subCategories.');
    }
  }

}