import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IUser, UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit {

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

