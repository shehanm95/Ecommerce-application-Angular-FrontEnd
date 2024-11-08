import { Component, inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  router = inject(Router)
  deleteAccount() {
    throw new Error('Method not implemented.');
  }

  userService = inject(UserService);


  logout() {
    this.userService.logout();
    //this.router.navigate(['/products'])
    //window.location.replace(window.location.href);
    window.location.href = '/products';

  }

}
