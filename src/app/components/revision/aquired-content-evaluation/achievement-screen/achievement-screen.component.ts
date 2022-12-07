import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-achievement-screen',
  templateUrl: './achievement-screen.component.html',
  styleUrls: ['./achievement-screen.component.scss']
})
export class AchievementScreenComponent implements OnInit {
  @Output() goNextStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  triggerNextStep() {
    this.goNextStep.emit(false);
  }
}
