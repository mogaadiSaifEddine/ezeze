import { ChangeDetectorRef, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { ToasterService, ToastComponent } from '@coreui/angular';

@Component({
  selector: 'app-toast-sample',
  templateUrl: './toast-sample.component.html',
  styleUrls: ['./toast-sample.component.scss']
})
export class ToastSampleComponent extends ToastComponent {

  @Input() closeButton = false;
  @Input() title = '';
  @Input() body = '';

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef);
    console.debug(this.color);
  }
}
