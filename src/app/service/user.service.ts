import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { U } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = mainUrl + "/users";
  constructor(private http: HttpClient,
    private storageService: LocalStorageService,
    private router: Router,
    private toaster: ToastrService

  ) { }

  register(form: any) {
    this.http.post<IUser>(this.url + "/register", form).subscribe({
      next: (loggedInUser) => {
        console.log(loggedInUser)
        loggedInUser = this.setImageUrl(loggedInUser);
        this.storageService.saveUser(loggedInUser);
        console.log(loggedInUser);
        this.toaster.success("you logged in successfully", "Logged In")
        window.location.href = "/products"
      },
      error: (err) => {
        this.toaster.error("Invalid user details", "Invalid")
      }
    });
  }
  registerAdmin(form: any) {
    this.http.post<IUser>(this.url + "/register/admin", form).subscribe({
      next: (loggedInUser) => {
        console.log(loggedInUser)
        loggedInUser = this.setImageUrl(loggedInUser);
        this.storageService.saveUser(loggedInUser);
        console.log(loggedInUser);
        this.toaster.success("you logged in successfully", "Logged In")
        window.location.href = "/products"
      },
      error: (err) => {
        this.toaster.error("Invalid user details", "Invalid")
      }
    });
  }

  login(form: any) {
    this.http.post<IUser>(this.url + "/login", form).subscribe({
      next: (loggedInUser) => {
        console.log(loggedInUser)
        loggedInUser = this.setImageUrl(loggedInUser);
        this.storageService.saveUser(loggedInUser);
        console.log(loggedInUser);
        this.toaster.success("you logged in successfully", "Logged In")
        window.location.href = "/products"
      },
      error: (err) => {
        this.toaster.error("Invalid username or password", "Invalid")
      }
    });
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url + "/all");
  }

  getCurrentUser(): IUser | null {
    return this.storageService.getUser()

  }
  logout() {
    this.storageService.logout();
  }

  imageMainUrl = mainUrl;
  private setImageUrl(user: IUser): IUser {

    if (user.imageLink?.startsWith(this.imageMainUrl)) {
      return user;
    }
    user.imageLink = this.imageMainUrl + user.imageLink
    return user;
  }

}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  userRole: string;
  userState?: string;
  password: string;
  phone?: string;
  birthdate?: Date;
  createdDate?: Date;
  modifiedDate?: Date;
  imageLink?: string;
}




export const mainUrl: string = "http://localhost:8080"
