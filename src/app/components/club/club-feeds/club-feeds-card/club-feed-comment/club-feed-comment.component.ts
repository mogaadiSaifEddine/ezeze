import { Component, Input, OnInit } from '@angular/core';
import { FeedComments } from 'src/app/model/Feed_Comments';

@Component({
  selector: 'app-club-feed-comment',
  templateUrl: './club-feed-comment.component.html',
  styleUrls: ['./club-feed-comment.component.scss'],
})
export class ClubFeedCommentComponent implements OnInit {
  @Input() comment: FeedComments;
  constructor() {}

  ngOnInit(): void {}
}
