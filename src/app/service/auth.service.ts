import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export const AuthGard: CanActivateFn = (route, state) => {

  const storageService = inject(LocalStorageService);
  const toastr = inject(ToastrService)

  if (storageService.getUser() != null) {
    return true;
  } else {
    toastr.error("This page is exclusive to registered users.", "Please Sign in")
    return false;
  }
}


export const AdminGard: CanActivateFn = (route, state) => {

  const storageService = inject(LocalStorageService);
  const router = inject(Router);
  const user = storageService.getUser();
  if (user != null) {
    if (user.role == "ADMIN") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const SellerGuard: CanActivateFn = (route, state) => {

  const storageService = inject(LocalStorageService);
  const router = inject(Router);
  const user = storageService.getUser();
  if (user != null) {
    if (user.role == "ADMIN" || user.role == "SELLER") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const BuyerGuard: CanActivateFn = (route, state) => {

  const storageService = inject(LocalStorageService);
  const router = inject(Router);
  const user = storageService.getUser();
  if (user != null) {
    if (user.role == "ADMIN" || user.role == "BUYER") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
