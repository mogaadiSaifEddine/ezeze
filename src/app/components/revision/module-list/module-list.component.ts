import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/model/Chapter';
import { ChapitreService } from 'src/app/services/chapitre.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  constructor(private chapterService: ChapitreService) {}
  matieres: Chapter[];
  @Input() matiere: Chapter;

  ngOnInit(): void {
    this.getallchapters();


  }

  getallchapters() {


    this.chapterService.getChaptersByGroup(Number(JSON.parse(localStorage.getItem('user_details')).group?.id)).subscribe((chapt: Chapter[]) => {


      this.matieres = chapt.filter((el) => el.chapterType === 'MATIERE');
    });
  }
}
