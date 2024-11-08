import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  constructor(private userService: UserService, private toaster: ToastrService) { }

  submitRegistrationForm(form: NgForm) {
    console.log(form.value);
    this.userService.register(form.value);
    this.toaster.success("User Added Successfully", "Registered !")

  }

}
