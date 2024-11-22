import { Component } from '@angular/core';
import { SellerOrderFilterComponent } from "../../../filters/seller/seller-order-filter/seller-order-filter.component";
import { CommonModule } from '@angular/common';
import { OrderService, SellerOrderResponseDto } from '../../../service/order.service';
import { Observable } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { ProductService } from '../../../service/product.service';
import { OrderIDPipe } from '../../../pips/order-id.pipe';
import { DisplaySellerDetailComponent } from '../../../user/display-seller-detail/display-seller-detail.component';

@Component({
  selector: 'app-seller-orders',
  standalone: true,
  imports: [SellerOrderFilterComponent, CommonModule, OrderIDPipe, DisplaySellerDetailComponent],
  templateUrl: './seller-orders.component.html',
  styleUrl: './seller-orders.component.css'
})
export class SellerOrdersComponent {

  orders$?: Observable<SellerOrderResponseDto[]>;
  currentOrderId: number = 0;
  constructor(private orderService: OrderService, private userService: UserService, private productService: ProductService) {
    this.orders$ = orderService.getOrdersBySeller();

  }


  onClickShowDetails(orderId: number) {
    if (this.currentOrderId == orderId) this.currentOrderId = 0;
    else this.currentOrderId = orderId
  }
}
