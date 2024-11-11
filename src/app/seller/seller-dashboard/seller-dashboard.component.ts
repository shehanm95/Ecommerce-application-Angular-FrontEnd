import { Component, Input, OnInit } from '@angular/core';
import { IUser, UserService } from '../../service/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit {

  @Input() user?: string;
  constructor(private userService: UserService, private router: Router) { }

  allUsers!: IUser[];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((appUsers: IUser[]) => {
      this.allUsers = appUsers;
    });
  }

  editUser(userId: number | undefined): void {
    this.router.navigate(['/edit-user', userId]); // Navigate to the EditUserComponent with userId as a parameter
  }

}

