import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from 'src/app/model/Chapter';
import { ChapitreService } from 'src/app/services/chapitre.service';

@Component({
  selector: 'app-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [style({ opacity: 0, transform: 'translateY(10px)' }), animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))]),
      transition(':leave', [animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' }))])
    ])
  ]
})
export class ModuleCardComponent implements OnInit {
  @Input() matiere: Chapter;
  colorPalette = ['FD90D4', '00B997', 'FFEC01', 'FA617D', '01CC01', 'A9013F', '009CA9', 'A9F800', '8B8E95', 'FE1F34', 'F08324'];

  // randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  randomColor = '#' + this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];

  constructor(private router: Router, private chapterService: ChapitreService) {}

  ngOnInit(): void {}
  navigateToRoute() {
    this.chapterService.getOneChapter(this.matiere.chapter_id).subscribe((res: Chapter[]) => {
      this.chapterService.chapterList.next(res);
      this.router.navigate(['/revision/chapitres']);
    });
  }
}
