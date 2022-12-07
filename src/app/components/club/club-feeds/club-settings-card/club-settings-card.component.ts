import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/model/Club';
import { ClubService } from 'src/app/service/club.service';

@Component({
  selector: 'app-club-settings-card',
  templateUrl: './club-settings-card.component.html',
  styleUrls: ['./club-settings-card.component.scss']
})
export class ClubSettingsCardComponent implements OnInit {
  club: Club[] = [];
  constructor(private readonly clubService: ClubService) {}

  loadClub() {
    this.clubService.getClubs().subscribe((club) => {
      this.club = club;
    });
  }
  ngOnInit(): void {}
}
