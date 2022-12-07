import { Component, Input, OnInit } from '@angular/core';
import { Club, ClubMinimized } from 'src/app/model/Club';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-card',
  templateUrl: './club-card.component.html',
  styleUrls: ['./club-card.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [style({ opacity: 0, transform: 'translateY(10px)' }), animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))]),
      transition(':leave', [animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' }))])
    ])
  ]
})
export class ClubCardComponent implements OnInit {
  @Input() club: ClubMinimized;
  constructor(private router: Router) {}

  goToFeeds() {
    this.router.navigate(['/chat']);
  }
  ngOnInit(): void {}
}
