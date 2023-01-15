import { trigger, transition, style, animate } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, interval, merge, Observable, skipWhile, Subscription, switchMap, take, tap } from 'rxjs';
import { Chapter } from 'src/app/model/Chapter';
import { ChapitreService } from 'src/app/services/chapitre.service';

@Component({
  selector: 'app-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' }))])
    ])
  ]
})
export class ModuleCardComponent implements OnInit {
  @Input() matiere: Chapter;
  colorPalette = ['FD90D4', '00B997', 'FFEC01', 'FA617D', '01CC01', 'A9013F', '009CA9', 'A9F800', '8B8E95', 'FE1F34', 'F08324'];
  randomColor = '#' + this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];
  cardIcons = [
    { name: 'إنتاج كتابي', url: 'https://img.icons8.com/color/512/left-handed.png' },
    { name: 'حساب', url: 'https://img.icons8.com/office/512/abacus.png' },
    { name: 'ايقاظ علمي', url: 'https://img.icons8.com/color/512/microscope.png' },
    { name: 'رسم واملاء', url: 'https://img.icons8.com/color/512/pencil-tip.png' },
    { name: 'قواعد لغة', url: 'https://img.icons8.com/color/512/pencil-tip.png' },
    { name: 'قراءة', url: 'https://img.icons8.com/fluency/512/reading.png' },
    { name: 'انجليزية', url: 'https://img.icons8.com/color-glass/512/requires-interpreter.png' },
    { name: 'فرنسية', url: 'https://img.icons8.com/color-glass/512/requires-interpreter.png' }
  ];
  iconToDislay = '';

  constructor(private router: Router, private chapterService: ChapitreService) {}

  ngOnInit(): void {
    console.log(this.matiere);

    this.iconToDislay = this.cardIcons.filter((ci) => ci.name === this.matiere.name.trim())[0].url;
  }

  navigateToRoute() {
    this.chapterService.getOneChapter(this.matiere.chapter_id).subscribe((res: Chapter[]) => {
      this.chapterService.chapterList.next(res);
      this.router.navigate(['/revision/chapitres']);
    });
  }
}
