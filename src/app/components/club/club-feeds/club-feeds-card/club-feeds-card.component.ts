import { Component, Input, OnInit } from '@angular/core';
import { ClubFeeds } from 'src/app/model/Club_Feeds';

@Component({
  selector: 'app-club-feeds-card',
  templateUrl: './club-feeds-card.component.html',
  styleUrls: ['./club-feeds-card.component.scss']
})
export class ClubFeedsCardComponent implements OnInit {
  @Input() clubFeeds: ClubFeeds;

  start: number = 0;
  end: number = 3;

  loadComments() {
    this.end += 3;
  }
  constructor() {}

  ngOnInit(): void {}

  commentFocus() {
    document.getElementById('comment').focus();
  }
}
