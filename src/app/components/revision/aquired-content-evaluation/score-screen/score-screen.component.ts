import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-screen',
  templateUrl: './score-screen.component.html',
  styleUrls: ['./score-screen.component.scss']
})
export class ScoreScreenComponent implements OnInit {
  @Input() score: number;
  @Input() canGoNext: boolean;
  @Output() goNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goNextLevel() {
    this.goNext.emit(true);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
