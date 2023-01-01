import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('Authorization')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('Authorization')}`
        }
      });
    }

    return next.handle(req);
  }
}
