import { Component, OnInit } from '@angular/core';
import { IUser, UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  user!: IUser | null;

  constructor(private userService: UserService, private router: Router) { }



  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    console.log(this.user)

  }

  toLogin() {

    this.router.navigate(['/login'])
  }

  goToProfile() {
    this.router.navigate(["/profile"])
  }


}
