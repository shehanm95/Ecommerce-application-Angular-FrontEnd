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
  roleValue = "ADMIN";

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
      formData.append('adminPassword', form.value.adminPassword);

      // Append the image if it's selected
      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }


      console.log(formData);
      this.userService.registerAdmin(formData);
    } else {
      this.toaster.error("Form did not Filled Correctly", "Form Invalid");
    }
  }
}
