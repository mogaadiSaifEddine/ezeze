import { Component, OnInit } from '@angular/core';
import { RevisionService } from 'src/app/services/revision.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.scss']
})
export class RevisionComponent implements OnInit {
  serieExercice: any[];
  loading = false;

  constructor(private revisionService: RevisionService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {

      this.getSerieByChapter(Number(params['chapter_id']));
    });
  }

  getSerieByChapter(chapterId: number) {


    this.loading = true;
    this.revisionService.getExerciceSerieBychapter(chapterId).subscribe((res) => {

      this.revisionService.exerciceSerie.next(res);
    });
    this.loading = false;
  }
}
