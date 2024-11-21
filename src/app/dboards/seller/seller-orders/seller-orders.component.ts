import { Component } from '@angular/core';
import { SellerOrderFilterComponent } from "../../../filters/seller/seller-order-filter/seller-order-filter.component";

@Component({
  selector: 'app-seller-orders',
  standalone: true,
  imports: [SellerOrderFilterComponent],
  templateUrl: './seller-orders.component.html',
  styleUrl: './seller-orders.component.css'
})
export class SellerOrdersComponent {

}
