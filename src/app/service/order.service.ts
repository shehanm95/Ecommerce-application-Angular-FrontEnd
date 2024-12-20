import { Injectable } from '@angular/core';
import { IUser, MainBackendUrl, UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { IProduct, SellerNameAndImg as UserNameAndImg } from './product.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  currentUser?: IUser;
  url = MainBackendUrl + "/orders";
  constructor(private userService: UserService,
    private toaster: ToastrService,
    private Http: HttpClient
  ) {
    let user = userService.getCurrentUser();
    if (user)
      this.currentUser = user;
    else {
      toaster.error("You don not have any orders", "Registration needed.")
    }
  }

  public getOrdersByBuyer(): Observable<OrderResponseDto[]> | undefined {
    if (this.currentUser) {
      return this.Http.get<OrderResponseDto[]>(this.url + "/buyer/" + this.currentUser.id)
    }
    return undefined
  }

  public getOrdersBySeller(): Observable<SellerOrderResponseDto[]> | undefined {
    if (this.currentUser) {
      return this.Http.get<SellerOrderResponseDto[]>(this.url + "/seller/" + this.currentUser.id)
    }
    return undefined
  }



}

export interface OrderDetailResponseDto {
  product: IProduct;
  quantity: number;
  seller: IUser;
}

export interface OrderResponseDto {
  orderId: number;
  totalAmount: number;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED'; // Use a union type for the enum
  orderDate: string; // Use string to represent ISO date format
  endDate?: string; // Optional, as it might be null
  orderDetails: OrderDetailResponseDto[];
}

export interface SellerOrderDetailResponseDto {
  sellerOrderDetailId: number;
  product: IProduct;
  quantity: number;
}

export enum OrderStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  Canceled = "Canceled",
  Completed = "Completed",
}

export interface SellerOrderResponseDto {
  sellerOrderId: number;
  seller: IUser;
  buyer: IUser;
  orderAmount: number;
  totalProducts: number;
  receivedDate: string;
  finishedDate: string;
  orderStatus: OrderStatus;
  sellerOrderDetailsDto: SellerOrderDetailResponseDto[];
  buyerOrderId: number;
}

