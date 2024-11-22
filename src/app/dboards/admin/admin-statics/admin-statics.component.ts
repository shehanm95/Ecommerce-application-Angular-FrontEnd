import { Component, Input } from '@angular/core';
import { IAdminStatics, IUser, UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-statics',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './admin-statics.component.html',
  styleUrl: './admin-statics.component.css'
})
export class AdminStaticsComponent {
  adminStatics$: Observable<IAdminStatics>;
  @Input() user?: string;
  constructor(private userService: UserService, private router: Router) {
    this.adminStatics$ = userService.getAdminStatics();
  }

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
