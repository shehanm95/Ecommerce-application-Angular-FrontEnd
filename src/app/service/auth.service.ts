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
  const toastr = inject(ToastrService)
  const router = inject(Router);
  const user = storageService.getUser();
  if (user != null) {
    if (user.userRole == "ADMIN") {
      return true;
    } else {
      toastr.error("That Area only allowed to admins.", "Restricted Page")
      return false;
    }
  } else {
    toastr.error("This page is exclusive to registered users.", "Please Sign in")
    return false;
  }
}

export const SellerGuard: CanActivateFn = (route, state) => {

  const storageService = inject(LocalStorageService);
  const toastr = inject(ToastrService)
  const router = inject(Router);
  const user = storageService.getUser();
  if (user != null) {
    if (user.userRole == "SELLER") {
      return true;
    } else {
      toastr.error("That Area only allowed to sellers.", "Restricted Page")
      return false;
    }
  } else {
    toastr.error("This page is exclusive to registered users.", "Please Sign in")
    return false;
  }
}

export const BuyerGuard: CanActivateFn = (route, state) => {

  const storageService = inject(LocalStorageService);
  const router = inject(Router);
  const user = storageService.getUser();
  const toastr = inject(ToastrService)
  if (user != null) {
    if (user.userRole == "BUYER") {
      return true;
    } else {
      toastr.error("That Area only allowed to buyers.", "Restricted Page")
      return false;
    }
  } else {
    toastr.error("This page is exclusive to registered users.", "Please Sign in")
    return false;
  }
}
