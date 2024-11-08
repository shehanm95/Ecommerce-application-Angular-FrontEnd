import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = mainUrl;
  constructor(private http: HttpClient, private storageService: LocalStorageService, private router: Router) { }

  register(form: any) {
    this.http.post<ILoginResponse>(mainUrl + "/register", form).subscribe({
      next: (loginRes) => {
        this.storageService.saveToken(loginRes.token);
        this.storageService.saveUser(loginRes.user);
        console.log(loginRes.token);
      }
    });
  }
  login(form: any) {
    this.http.post<ILoginResponse>(mainUrl + "/login", form).subscribe({
      next: (loginRes) => {
        console.log(loginRes)
        this.storageService.saveToken(loginRes.token);
        this.storageService.saveUser(loginRes.user);
        console.log(loginRes.token);
      }
    });
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(mainUrl + "/home");
  }

  getCurrentUser(): IUser | null {
    return this.storageService.getUser()

  }
  logout() {
    this.storageService.logout();
  }

}

export interface IUser {
  id: number,
  username: string,
  password: string,
  role: string,
}

export interface ILoginResponse {
  token: string,
  user: IUser
}

export const mainUrl: String = "http://localhost:8080"
