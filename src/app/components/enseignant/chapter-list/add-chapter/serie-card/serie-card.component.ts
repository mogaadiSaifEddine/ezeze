import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddExerciceComponent } from '../add-exercice/add-exercice.component';
import { SerieService } from 'src/app/services/serie.service';

@Component({
  selector: 'app-serie-card',
  templateUrl: './serie-card.component.html',
  styleUrls: ['./serie-card.component.scss']
})
export class SerieCardComponent implements OnInit {
  @Input() serie: any;
  @Input() chapter_id: number;
  @Input() serie_id: number;

  displayedColumns: string[] = ['ordre', 'exercice', 'type', 'action'];
  constructor(public dialog: MatDialog, private serieService: SerieService) {}
  dataSource: any;

  ngOnInit(): void {
    this.dataSource = this.serie;
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  openDialog(element?): void {
    const dialogRef = this.dialog.open(AddExerciceComponent, {
      width: '50%',
      height: '50%',
      disableClose: true,
      data: {
        exercice: element,
        serieId: this.serie_id,
        chapterId: this.chapter_id
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.serieService.getSerieById(this.serie_id).subscribe((res: any) => {
        this.dataSource = res.exercices;
      });
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  deleteExercice(element) {
    this.serieService.deleteExercice(element.ex_id).subscribe((res) => {
      this.serieService.getSerieById(this.serie_id).subscribe((res: any) => {
        this.dataSource = res.exercices;
      });
    });
  }
}
