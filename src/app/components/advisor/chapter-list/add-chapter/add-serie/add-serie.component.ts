import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chapter } from 'src/app/model/User';
import { ChapitreService } from 'src/app/services/chapitre.service';

@Component({
  selector: 'app-add-serie',
  templateUrl: './add-serie.component.html',
  styleUrls: ['./add-serie.component.scss']
})
export class AddSerieComponent implements OnInit {
  constructor(private dialogRef:MatDialogRef<AddSerieComponent>,@Inject(MAT_DIALOG_DATA) public data: { series: any; chapter_id: number;chapter:any },private chapterService:ChapitreService) {}

  ngOnInit(): void {
    this.checkChapterValidation()
  }

  checkChapterValidation(){
    let exist = this.data.series.find(series=>{
      return this.checkInvalidExercice(series.exercices)
    })
    if(!exist){
      this.data.chapter.isValid=true
      this.chapterService.updateChapter(this.data.chapter,this.data.chapter_id,this.data.chapter.group.id).subscribe(res=>{})
      this.dialogRef.close(true);
    }
  }

  checkInvalidExercice(exercices){
    return exercices.find(exercices=>!exercices.valid)
  }
}
