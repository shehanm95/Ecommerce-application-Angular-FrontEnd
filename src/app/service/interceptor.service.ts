import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';


@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private storageService: LocalStorageService) { console.log("interceptor") }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = this.storageService.getToken();
    console.log("calling url is : " + req.url)

    let publicUrls: string[] = [
      "register",
      "login",
      "logout",
      "home",
      "products"
    ];

    if (publicUrls.some(publicUrl => req.url.includes(publicUrl))) {
      return next.handle(req);
    }

    if (token) {
      req = req.clone({
        url: req.url,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    console.log(req)
    return next.handle(req);
  }
}
