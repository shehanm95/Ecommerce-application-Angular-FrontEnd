import { Component, Input, OnInit } from '@angular/core';
import { SellerNameAndImg } from '../../service/product.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-display-seller-detail',
  standalone: true,
  imports: [],
  templateUrl: './display-seller-detail.component.html',
  styleUrl: './display-seller-detail.component.css'
})
export class DisplaySellerDetailComponent {
  @Input() sellerDetail?: SellerNameAndImg;
}
