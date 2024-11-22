import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ISellerStatic, UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SellerOrdersComponent } from "../seller-orders/seller-orders.component";

@Component({
  selector: 'app-seller-statics',
  standalone: true,
  imports: [AsyncPipe, CommonModule, SellerOrdersComponent],
  templateUrl: './seller-statics.component.html',
  styleUrl: './seller-statics.component.css'
})
export class SellerStaticsComponent {
  sellerStatics$?: Observable<ISellerStatic>;
  constructor(private userService: UserService, private router: Router) {
    let userId = userService.getCurrentUser()?.id || 0;
    this.sellerStatics$ = userService.getSellerStatics(userId);
  }
}

