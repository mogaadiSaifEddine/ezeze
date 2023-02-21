import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter, ChapterChildren } from 'src/app/model/Chapter';
import { ChapitreService } from 'src/app/services/chapitre.service';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss']
})
export class ChapterListComponent implements OnInit {
  constructor(private chapterService: ChapitreService, private router: Router) { }
  chapterList: ChapterChildren[];
  isLoading = true;

  ngOnInit(): void {
    this.isLoading = true;
    this.chapterService.chapterList.subscribe({
      next: (value) => { this.chapterList = value; this.isLoading = false; }
    });
  }
  navigateToMatieres() {
    this.router.navigate(['/revision/matieres']);
  }
}
