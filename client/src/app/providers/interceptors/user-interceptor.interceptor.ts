import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable()
export class UserInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    let token = localStorage.getItem('token');
    let adminToken = localStorage.getItem('adminToken');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    if (adminToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${adminToken}`),
      });
    }
    return next.handle(request);
  }
}
