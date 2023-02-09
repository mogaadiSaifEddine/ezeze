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
  constructor(private chapterService: ChapitreService, private router: Router) {}
  chapterList: ChapterChildren[];

  ngOnInit(): void {
    this.chapterService.chapterList.subscribe({
      next: (value) => {
        console.log(value);

        this.chapterList = value;
      }
    });
  }
  navigateToMatieres() {
    this.router.navigate(['/revision/matieres']);
  }
}
