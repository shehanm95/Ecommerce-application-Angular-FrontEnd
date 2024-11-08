import { Injectable } from '@angular/core';
import { IUser } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    let token = localStorage.getItem("token");
    console.log("req token :" + token);
    return token;
  }
  logout() {
    localStorage.removeItem("token");
    this.removeUser();
    let user = this.getUser();
    console.log("user logged out : " + user);
  }
  saveUser(user: IUser) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  getUser(): IUser | null {
    const userJson = localStorage.getItem("currentUser");
    return userJson ? JSON.parse(userJson) as IUser : null;
  }

  removeUser() {
    localStorage.removeItem("currentUser");
  }
}

export interface Token {
  token: string;
}
