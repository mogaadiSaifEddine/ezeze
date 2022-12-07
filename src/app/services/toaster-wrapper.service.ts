import { Injectable } from '@angular/core';
import { Colors, ToasterPlacement } from '@coreui/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterWrapperService {
  toastSubject: Subject<ToasterMessageOptions> = new Subject();
  constructor(private readonly translate: TranslateService) {}

  success(message: string, options?: ToasterMessageOptions) {
    this.toastSubject.next({ ...options, color: 'success', title: this.translate.instant('common.success'), body: message });
  }
  error(message: string, options?: ToasterMessageOptions) {
    this.toastSubject.next({ ...options, color: 'error', title: this.translate.instant('common.error'), body: message });
  }
  info(message: string, options?: ToasterMessageOptions) {
    this.toastSubject.next({ ...options, color: 'info', title: this.translate.instant('common.info'), body: message });
  }
  warn(message: string, options?: ToasterMessageOptions) {
    this.toastSubject.next({ ...options, color: 'warn', title: this.translate.instant('common.warning'), body: message });
  }
}
export interface ToasterMessageOptions {
  title: string;
  delay: number;
  placement: ToasterPlacement;
  autohide: true;
  color: Colors;
  body: string;
}
