import { Component, Input } from '@angular/core';
import { IUser, UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer-statics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buyer-statics.component.html',
  styleUrl: './buyer-statics.component.css'
})
export class BuyerStaticsComponent {
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
