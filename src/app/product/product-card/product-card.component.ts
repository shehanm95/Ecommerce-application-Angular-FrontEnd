import { Component, inject, Input, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { MainBackendUrl } from '../../service/user.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProduct;
  mainUrl = MainBackendUrl;


  ngOnInit(): void {
    if (this.product.sellerDto == null) {
      this.product.sellerDto = {
        username: "seller missing",
        imageLink: "https://cdn3d.iconscout.com/3d/premium/thumb/farmer-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--man-profile-character-pack-avatars-icons-5187870.png?f=webp",
        id: 0,
        firstName: "",
        lastName: "",
        userRole: "",
      }
    }
    else {
      this.product.sellerDto.imageLink = this.mainUrl + this.product.sellerDto.imageLink;
    }


  }

  cartService = inject(CartService);

  get sellerImage(): string {
    return this.product.sellerDto.imageLink || 'https://cdn3d.iconscout.com/3d/premium/thumb/farmer-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--man-profile-character-pack-avatars-icons-5187870.png?f=webp';

  }

  get sellerName(): string {
    return this.product.sellerDto.imageLink || 'Default Seller';
  }

  addToCart() {
    if (this.product.sellerDto != null) {
      this.cartService.addProduct(this.product);
      console.log("added")
    }
  }
}
