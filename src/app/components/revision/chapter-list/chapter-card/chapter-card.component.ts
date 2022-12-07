import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter, ChapterChildren } from 'src/app/model/Chapter';
import { RevisionService } from 'src/app/services/revision.service';
import { SerieService } from 'src/app/services/serie.service';

@Component({
  selector: 'app-chapter-card',
  templateUrl: './chapter-card.component.html',
  styleUrls: ['./chapter-card.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [style({ opacity: 0, transform: 'translateY(10px)' }), animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))]),
      transition(':leave', [animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' }))])
    ])
  ]
})
export class ChapterCardComponent implements OnInit {
  colorPalette = ['FD90D4', '00B997', 'FFEC01', 'FA617D', '01CC01', 'A9013F', '009CA9', 'A9F800', '8B8E95', 'FE1F34', 'F08324'];
  series;
  @Input() chapter: ChapterChildren;
  // randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  randomColor = '#' + this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];

  constructor(private router: Router, private serieService: SerieService, private revisionService: RevisionService) {}
  ngOnInit(): void {}
  navigateToRoute() {
    this.serieService.getSerieByChapter(this.chapter.chapter_id).subscribe((res) => {
      this.series = res;
    });

    this.revisionService.chapter.next(this.chapter);
    this.router.navigate(['/revision/aquired-content-evaluation'], { queryParams: { chapter_id: this.chapter.chapter_id } });
  }
}
