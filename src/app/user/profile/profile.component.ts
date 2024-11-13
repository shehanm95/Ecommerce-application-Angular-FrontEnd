import { Component, inject, OnInit } from '@angular/core';
import { IUser, mainUrl, UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  router = inject(Router)
  user!: IUser | null;

  fallbackImage = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';





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
    this.user?.imageLink || this.fallbackImage;
  }

  onImageError(event: any): void {
    event.target.src = this.fallbackImage;
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
