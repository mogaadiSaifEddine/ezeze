import { Component, Input, OnInit } from '@angular/core';
import { Colors } from '@coreui/angular/lib/coreui.types';

@Component({
  selector: 'app-toast-sample-icon',
  templateUrl: './toast-sample-icon.component.html'
})
export class ToastSampleIconComponent implements OnInit {
  @Input() color?: Colors;

  fillColor = 'rgb(255, 0, 0)';

  constructor() { }

  ngOnInit(): void {
  }

}
