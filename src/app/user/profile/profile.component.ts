import { Component, inject, OnInit } from '@angular/core';
import { IUser, mainUrl, UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { SellerDashboardComponent } from "../../seller/seller-dashboard/seller-dashboard.component";
import { BuyerDashboardComponent } from '../../buyer/buyer-dashboard/buyer-dashboard.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, DashboardComponent, SellerDashboardComponent, BuyerDashboardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  router = inject(Router)
  user!: IUser | null;
  deleteAccount() {
    throw new Error('Method not implemented.');
  }

  userService = inject(UserService);
  mainUrl = mainUrl;


  logout() {
    this.userService.logout();
    //this.router.navigate(['/products'])
    //window.location.replace(window.location.href);
    window.location.href = '/products';

  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
  }
}
