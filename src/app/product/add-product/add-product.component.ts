import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IProduct, ProductService } from '../../service/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  imagePreview: string | ArrayBuffer | null = null;
  productImage: File | null = null;

  constructor(private productService: ProductService) { }

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
    console.log(this.productImage?.name)
    if (form.valid && this.productImage) {
      const { productName, price, category } = form.value;

      // Call service to add product
      this.productService.addProduct(
        { productName, price, category },
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


  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

