import { Component, Input } from '@angular/core';
import { IBuyerStatics, IUser, UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BuyerOrdersComponent } from "../buyer-orders/buyer-orders.component";

@Component({
  selector: 'app-buyer-statics',
  standalone: true,
  imports: [CommonModule, BuyerOrdersComponent],
  templateUrl: './buyer-statics.component.html',
  styleUrl: './buyer-statics.component.css'
})
export class BuyerStaticsComponent {
  @Input() user?: string;
  buyerStatics$?: Observable<IBuyerStatics>;

  constructor(private userService: UserService, private router: Router) {
    let userId = userService.getCurrentUser()?.id || 0;
    this.buyerStatics$ = userService.getBuyerStatics(userId);
  }
}

