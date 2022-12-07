import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjouterExcerciceComponent } from '../ajouter-excercice/ajouter-excercice.component';
import { CourseSeries } from '../model/CourseSeries';
import { Exercice } from '../model/Exercice';
import { ExerciceBlock } from '../model/ExerciceBlock';
import { ExcerciceserviceService } from '../service/excerciceservice.service';

@Component({
  selector: 'app-list-exercice',
  templateUrl: './list-exercice.component.html',
  styleUrls: ['./list-exercice.component.scss']
})
export class ListExerciceComponent implements OnInit {
  serieEx?:CourseSeries[];
  ex:Exercice[];
  Exblock:ExerciceBlock[];
  constructor(private ExerciceService:ExcerciceserviceService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllSerieExercice();
  }
  getAllSerieExercice(){
    this.ExerciceService.GetSerieExercice().subscribe(chapt => {

      this.serieEx = chapt;

      });
    }
    openDialog(): void {
      const dialogRef = this.dialog.open(AjouterExcerciceComponent, {
        width: '900px',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {

      });
    }
}
