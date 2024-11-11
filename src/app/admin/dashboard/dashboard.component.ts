import { Component, Input } from '@angular/core';
import { IUser, UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

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

