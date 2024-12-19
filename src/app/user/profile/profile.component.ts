import { Component, inject, OnInit } from '@angular/core';
import { IUser, MainBackendUrl, UserService } from '../../service/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  router = inject(Router)
  user!: IUser | null;

  fallbackImage = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

  onImageError(event: any): void {
    event.target.src = this.fallbackImage;
  }




  deleteAccount() {
    throw new Error('Method not implemented.');
  }

  userService = inject(UserService);
  mainUrl = MainBackendUrl;


  logout() {
    this.userService.logout();
    //this.router.navigate(['/products'])
    //window.location.replace(window.location.href);
    window.location.href = '/products';
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.user?.imageLink || this.fallbackImage;
  }


  loadDashboard() {
    switch (this.user?.userRole) {
      case "ADMIN":
        this.router.navigate(['/admin/dashboard'])
        break;
      case "SELLER":
        this.router.navigate(['/seller/dashboard'])
        break;
      case "BUYER":
        this.router.navigate(['/buyer/dashboard'])
        break;
    }
  }
}
