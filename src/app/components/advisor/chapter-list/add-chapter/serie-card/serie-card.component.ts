import { DataSource } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Chapter } from 'src/app/model/Chapter';
import { ChapitreService } from 'src/app/services/chapitre.service';
import { SerieService } from 'src/app/services/serie.service';
import { CommentRejectionComponent } from '../comment-rejection/comment-rejection.component';
import { ExercicePreviewComponent } from '../exercice-preview/exercice-preview.component';

@Component({
  selector: 'app-serie-card',
  templateUrl: './serie-card.component.html',
  styleUrls: ['./serie-card.component.scss']
})
export class SerieCardComponent implements OnInit {
  @Input() serie: any;
  @Input() chapter_id: number;
  @Input() serie_id: number;
  @Input() chapter:any;
  @Output() changedChapter:EventEmitter<boolean>=new EventEmitter<boolean>();
  displayedColumns: string[] = ['ordre', 'exercice', 'type', 'action'];
  constructor(public dialog: MatDialog, private serieService: SerieService,private chapterService:ChapitreService) {}
  dataSource: any;

  ngOnInit(): void {
    this.dataSource =new MatTableDataSource<any>(this.serie.filter(serie=>!serie.valid)) ;
    console.log("Chapter",this.chapter)
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  validateExercice(element){
    console.log(element);
    element.valid=true;
    this.serieService.updateExercice(element,element.ex_id).subscribe(res=>{
      let index = this.dataSource.data.findIndex(element=>element===element);
      this.dataSource.data.splice(index,1);
    
      console.log(this.dataSource.data)
      this.dataSource =new MatTableDataSource<any>(this.dataSource.data) ;
      this.changedChapter.emit(true);
    })

  }
  
  reject(element){
    this.dialog.open(CommentRejectionComponent, {
      width: '70%',
      maxWidth: '70%',
      maxHeight: '70%',
      position: {
        top: '10%',
        left: '15%'
      },
      panelClass: 'my-custom-dialog-class',

      data: {
        currentExercise: element
      }
    }).afterClosed().subscribe(res=>{
      if(res){
        element.
        this.serieService.updateExercice(element,element.ex_id).subscribe(res=>{
          let index = this.dataSource.data.findIndex(element=>element===element);
          this.dataSource.data.splice(index,1);
        
          console.log(this.dataSource.data)
          this.dataSource =new MatTableDataSource<any>(this.dataSource.data) ;
          this.changedChapter.emit(true);
        })
      }
    });

  }

  deleteExercice(element) {
    this.serieService.deleteExercice(element.ex_id).subscribe((res) => {
      this.serieService.getSerieById(this.serie_id).subscribe((res: any) => {
        this.dataSource = res.exercices;
      });
    });
  }

  openPreview(element){
    this.dialog.open(ExercicePreviewComponent, {
      width: '70%',
      maxWidth: '70%',
      maxHeight: '70%',
      position: {
        top: '10%',
        left: '15%'
      },
      panelClass: 'my-custom-dialog-class',

      data: {
        currentExercise: element
      }
    });
  }
}
