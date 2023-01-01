import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';

@Component({
  selector: 'app-color-the-text-element',
  templateUrl: './color-the-text-element.component.html',
  styleUrls: ['./color-the-text-element.component.scss']
})
export class ColorTheTextElementComponent implements OnInit {
  @Input() element: string;
  @Input() color: string; //change color;
  @Input() correctColored: any[];
  @Output() colorChange: EventEmitter<object> = new EventEmitter<object>();
  @ViewChild('word')
    wordElement: ElementRef<HTMLSpanElement>;

  constructor() {}

  ngOnInit(): void {}

  //change color
  changeElementColor(color: string) {

    // this.element.value = color;

    const obj = {};
    if (this.wordElement.nativeElement.style.color === this.color) 
      this.wordElement.nativeElement.style.color = 'black';
    else 
      this.wordElement.nativeElement.style.color = this.color;

    if (this.wordElement.nativeElement.style.color !== '' && this.wordElement.nativeElement.style.color !== 'black')
      obj[this.wordElement.nativeElement.innerText.trim()] = this.wordElement.nativeElement.style.color;
    this.colorChange.emit(obj);
  }
}
