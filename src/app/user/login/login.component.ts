import { Component, inject } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userService = inject(UserService);

  submitLoginForm(form: NgForm) {
    this.userService.login(form.value);
  }

}
