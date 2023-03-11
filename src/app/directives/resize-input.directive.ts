import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[inesResizeInput]'
})
export class ResizeInputDirective {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.resize();
  }

  private resize() {
    this.el.nativeElement.setAttribute('size', this.el.nativeElement.value.length);
  }

}
