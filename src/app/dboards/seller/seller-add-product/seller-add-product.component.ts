import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IProduct, IProductForCard, ProductService } from '../../../service/product.service';
import { Category, CategoryService } from '../../../service/category.service';
import { IUser, UserService } from '../../../service/user.service';
import { SubCategory, SubCategoryService } from '../../../service/sub-category.service';
import { Observable } from 'rxjs';
import { ProductAddCardComponent } from "../product-add-card/product-add-card.component";

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, ProductAddCardComponent],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit {
  imagePreview: string | ArrayBuffer | null = null;
  productImage: File | null = null;
  categories: Category[] = [];
  subCategories$?: Observable<SubCategory[]>;
  errorMessage: string | null = null;
  userId: number | undefined = 0;
  selectedCategory?: number;
  user?: IUser | null;

  constructor(private categoryService: CategoryService, private productService: ProductService, private userService: UserService, private subCategoryService: SubCategoryService) { }

  ngOnInit(): void {
    this.fetchCategories();
    this.user = this.userService.getCurrentUser();
    this.userId = this.userService.getCurrentUser()?.id;
  }

  pendingProduct: IProductForCard = {
    id: 0,
    productName: "",
    price: 0,
    category: 0,
    subCategory: 0,
    productImageLink: "",
    sellerId: 0,
    rate: 0,
    rateCount: 0,
    productState: undefined,
    productCount: undefined,
    productCode: "",
    isNew: true,
    sellerDetails: {
      sellerName: this.user ? (this.user?.firstName + this.user?.lastName) : "",
      imageLink: this.user ? (this.user?.imageLink ? this.user?.imageLink : "") : ""
    }

  };

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

  LoadSubCategories() {
    console.log('Selected Category ID:', this.selectedCategory);
    if (this.selectedCategory) {
      this.subCategories$ = this.subCategoryService.getSubCategoriesByCategory(this.selectedCategory);
    }


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
      const { productName, price, category, subCategory, sellerId, productCount } = form.value;


      this.productService.addProduct(
        {
          productName,
          price,
          category,
          subCategory,
          sellerId,
          productCount
        },
        this.productImage
      ).subscribe({
        next: (response: IProduct) => {
          console.log('Product Added:', response);
          form.reset();
          this.imagePreview = null;
          this.productImage = null;
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