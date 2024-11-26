import { Component, inject, Input, OnInit } from '@angular/core';
import { IProduct, IProductForCard, ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProductForCard;


  ngOnInit(): void {
    if (!this.product.sellerDetails) {
      this.product.sellerDetails = {
        sellerName: "seller missing",
        imageLink: "https://cdn3d.iconscout.com/3d/premium/thumb/farmer-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--man-profile-character-pack-avatars-icons-5187870.png?f=webp"
      }
    }
  }

  cartService = inject(CartService);

  get sellerImage(): string {
    return this.product.sellerDetails.imageLink || 'https://cdn3d.iconscout.com/3d/premium/thumb/farmer-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--man-profile-character-pack-avatars-icons-5187870.png?f=webp';

  }

  get sellerName(): string {
    return this.product.sellerDetails?.sellerName || 'Default Seller';
  }

  addToCart() {
    if (this.product.seller != null) {
      this.cartService.addProduct(this.product);
      console.log("added")
    }
  }
}
