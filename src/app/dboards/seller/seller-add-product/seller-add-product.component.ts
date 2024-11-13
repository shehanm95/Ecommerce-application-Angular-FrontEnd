import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IProduct, ProductService } from '../../../service/product.service';
import { Category, CategoryService } from '../../../service/category.service';
import { IUser, UserService } from '../../../service/user.service';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit {
  imagePreview: string | ArrayBuffer | null = null;
  productImage: File | null = null;
  categories: Category[] = [];
  errorMessage: string | null = null;
  userId: number | undefined = 0;

  constructor(private categoryService: CategoryService, private productService: ProductService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.fetchCategories();
    this.userId = this.userService.getCurrentUser()?.id;

    // Fetch categories when component is initialized
  }

  fetchCategories(): void {
    this.categoryService.findAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
        this.errorMessage = 'Failed to load categories. Please try again.';
      }
    });
  }


  onImageSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.productImage = fileInput.files[0];

      // Create an image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.productImage);
    }
  }

  onSubmit(form: NgForm): void {
    console.log(form.value);
    console.log(this.productImage?.name);





    if (form.valid && this.productImage) {
      const { productName, price, category, sellerId, rate, rateCount, productCount } = form.value;

      // Call service to add product
      this.productService.addProduct(
        {
          productName,
          price,
          category,
          sellerId,
          rate,
          rateCount,
          productCount
        },
        this.productImage
      ).subscribe({
        next: (response: IProduct) => {
          console.log('Product Added:', response);
          form.reset(); // Reset the form after successful submission
          this.imagePreview = null; // Clear image preview
          this.productImage = null; // Clear selected file
        },
        error: (error: any) => {
          console.error('Error adding product:', error);
        }
      });
    } else {
      console.warn('Form is invalid or image is not selected.');
    }
  }
}