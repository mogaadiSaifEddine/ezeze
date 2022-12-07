import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  @Output() startEvaluation: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  triggerEvaluation() {
    this.startEvaluation.emit(false);
  }
  ngOnInit(): void {}
}
