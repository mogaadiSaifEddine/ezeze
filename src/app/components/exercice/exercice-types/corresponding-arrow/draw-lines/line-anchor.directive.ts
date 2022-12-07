import {
  Directive,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  NgZone,
} from '@angular/core';

import { Rect } from './rect';

@Directive({
  selector: '[lineAnchor]',
})
export class LineAnchorDirective {
  @Input('lineAnchor') name: string;

  constructor(private element: ElementRef, private zone: NgZone) {}

  ngOnInit(): void {}

  get rect() {
    return Rect.fromElement(this.element);
  }
}
