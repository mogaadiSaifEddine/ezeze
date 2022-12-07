import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { ToastSampleComponent } from './toast-sample/toast-sample.component';
import { ToasterWrapperService } from '../services/toaster-wrapper.service';
@Component({
  selector: 'app-toaster-wrapper',
  templateUrl: './toaster-wrapper.component.html',
})
export class ToasterWrapperComponent implements OnInit {
  placement = ToasterPlacement.TopEnd;
  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(private toastWrapperService: ToasterWrapperService) {}

  ngOnInit(): void {
    this.toastWrapperService.toastSubject.subscribe((opts) => {

      this.toaster.addToast(ToastSampleComponent, opts);
    });
  }
}
