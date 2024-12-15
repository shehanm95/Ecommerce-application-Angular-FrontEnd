import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  selected = false;
  password = "";
  confirmPassword = "";
  confirmationFocused = false;
  roleValue = "BUYER";
  ACTIVE: string = 'ACTIVE';
  userName: string = "";
  isUserNameExist: boolean = false;
  checkingtext?: string;

  constructor(private userService: UserService, private toaster: ToastrService) { }

  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;  // Holds base64 string for preview

  // Method to handle image selection
  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];

      // Create a FileReader to read the image and convert it to base64
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;  // Store the base64 image for preview
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  submitRegistrationForm(form: NgForm) {

    if (form.valid) {
      console.log(this.password + " : " + this.confirmPassword);

      // Check if password and confirmPassword are the same
      if (this.password !== this.confirmPassword) {
        this.toaster.error("Password and Confirm Password not matching", "Form Invalid");
        return;
      }
      const formData = new FormData();
      formData.append('firstName', form.value.firstName);
      formData.append('lastName', form.value.lastName);
      formData.append('username', form.value.username);
      formData.append('email', form.value.email);
      formData.append('phone', form.value.phone);
      formData.append('birthdate', form.value.birthdate);
      formData.append('userRole', form.value.userRole);
      formData.append('userState', form.value.userState);
      formData.append('password', form.value.password);

      // Append the image if it's selected
      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }


      console.log(formData);
      this.userService.register(formData);
    } else {
      this.toaster.error("Please fill all the Required Fields", "Form Invalid");
    }
  }





  buyerSelected(buyer: boolean) {
    this.roleValue = buyer ? "BUYER" : "SELLER";
    this.selected = true;
  }


  checkUserName() {
    this.checkingtext = "Checking username....";
    console.log('called');

    // Prevent unnecessary service calls for empty username
    if (!this.userName) {
      this.isUserNameExist = false;
      this.checkingtext = "";
      return;
    }

    this.userService.checkUserNameExist(this.userName).subscribe({
      next: (res: boolean) => {
        this.isUserNameExist = res;
        this.checkingtext = res
          ? `${this.userName}... is already taken.`
          : `${this.userName}... is available.`;

        // Use Angular binding instead of direct DOM manipulation
        const checker = document.getElementById('checker') as HTMLElement;
        if (checker) {
          checker.className = res ? 'text-danger' : 'text-success';
        }

      },
      error: (err) => {
        console.error('Error checking username:', err);
        this.checkingtext = "An error occurred while checking username.";
        this.isUserNameExist = false;
      }
    });
  }


}
