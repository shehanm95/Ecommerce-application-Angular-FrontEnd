import { Component } from '@angular/core';
import { OrderDetailResponseDto, OrderResponseDto, OrderService } from '../../../service/order.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BuyerOrderFilterComponent } from "../../../filters/buyer/buyer-order-filter/buyer-order-filter.component";
import { OrderIDPipe } from '../../../pips/order-id.pipe';
import { DisplaySellerDetailComponent } from "../../../user/display-seller-detail/display-seller-detail.component";
import { ProductService, SellerNameAndImg } from '../../../service/product.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-buyer-orders',
  standalone: true,
  imports: [CommonModule, BuyerOrderFilterComponent, OrderIDPipe, DisplaySellerDetailComponent],
  templateUrl: './buyer-orders.component.html',
  styleUrl: './buyer-orders.component.css'
})
export class BuyerOrdersComponent {



  orders$?: Observable<OrderResponseDto[]>;
  currentOrderId: number = 0;
  constructor(private orderService: OrderService, private userService: UserService, private productService: ProductService) {
    this.orders$ = orderService.getOrdersByBuyer();

  }


  onClickShowDetails(orderId: number) {
    if (this.currentOrderId == orderId) this.currentOrderId = 0;
    else this.currentOrderId = orderId
  }

}
