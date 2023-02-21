import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SharedService } from './services/shared.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.sharedService.show();

    return next.handle(request).pipe(finalize(() => this.sharedService.hide()));
  }
}
