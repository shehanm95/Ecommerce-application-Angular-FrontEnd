import { Component, Input, OnInit } from '@angular/core';
import { SellerNameAndImg } from '../../service/product.service';
import { IUser, MainBackendUrl, UserService } from '../../service/user.service';

@Component({
  selector: 'app-display-seller-detail',
  standalone: true,
  imports: [],
  templateUrl: './display-seller-detail.component.html',
  styleUrl: './display-seller-detail.component.css'
})
export class DisplaySellerDetailComponent implements OnInit {
  @Input() seller?: IUser;

  mainUrl = MainBackendUrl;

  ngOnInit(): void {
    if (this.seller && !this.seller.imageLink?.includes("http")) {
      this.seller.imageLink = this.mainUrl + this.seller.imageLink;
    }
  }
}
