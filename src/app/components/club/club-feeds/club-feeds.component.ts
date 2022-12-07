import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClubFeeds } from 'src/app/model/Club_Feeds';
import { ClubService } from 'src/app/service/club.service';
import { AddPostModalComponent } from './add-post-modal/add-post-modal.component';

@Component({
  selector: 'app-club-feeds',
  templateUrl: './club-feeds.component.html',
  styleUrls: ['./club-feeds.component.scss']
})
export class ClubFeedsComponent implements OnInit {
  clubFeeds: ClubFeeds[] = [];

  constructor(private readonly clubService: ClubService, private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AddPostModalComponent, {
      width: '440px',
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });
  }
  loadClubFeeds() {
    this.clubService.getClubFeeds().subscribe((clubFeeds) => {
      this.clubFeeds = clubFeeds;
    });
  }

  ngOnInit(): void {
    this.loadClubFeeds();
  }
}
