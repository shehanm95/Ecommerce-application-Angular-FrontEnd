import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { IUser, UserService } from '../../../service/user.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit {

  lastClickedLink: string = 'Statics'; // Default active link

  setButtonAppearance(event: Event): void {
    const target = event.target as HTMLElement;
    // Capture the clicked link's text content, trimming any extra whitespace
    this.lastClickedLink = target.innerText.trim();
  }

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

