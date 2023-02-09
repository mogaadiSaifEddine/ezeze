import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('Authorization')}`
      }
    });

    return next.handle(req);
  }
}
