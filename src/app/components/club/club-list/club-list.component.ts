import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ClubService } from 'src/app/service/club.service';
import { Club } from '../../../model/Club';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnInit {
  clubs: Club[] = [];
  constructor(private readonly clubService: ClubService) {}

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map((str) => +str);
    }
  }

  loadMinizedClubs() {
    this.clubService.getClubs().subscribe((clubs) => {
      this.clubs = clubs;
    });
  }
  ngOnInit(): void {
    this.loadMinizedClubs();
  }
}
