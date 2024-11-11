import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent {

  selected = false;
  password = "";
  confirmPassword = "";
  confirmationFocused = false;
  roleValue = "BUYER";

  constructor(private userService: UserService, private toaster: ToastrService) { }

  submitRegistrationForm(form: NgForm) {
    console.log(form.value);
    this.userService.registerAdmin(form.value);

  }




}

