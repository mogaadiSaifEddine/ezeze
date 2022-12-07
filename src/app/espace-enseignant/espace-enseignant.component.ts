import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AjouterChapitreComponent } from '../ajouter-chapitre/ajouter-chapitre.component';
import { Chapter } from '../model/Chapter';
import { Course } from '../model/Course';
import { Module } from '../model/Module';
import { Group } from '../model/User';
import { ChapitreServiceService } from '../service/chapitre-service.service';
import { UserService } from '../services/userservice.service';

@Component({
  selector: 'app-espace-enseignant',
  templateUrl: './espace-enseignant.component.html',
  styleUrls: ['./espace-enseignant.component.scss']
})
export class EspaceEnseignantComponent implements OnInit {
  chapp: Chapter[];
  name: string;
  module: Module;
  course: Course;
  pre_required_chapter: string;
  resumer_cour: any;
  catre_conceptuelle: any;
  // dataSource = new MatTableDataSource<Chapter>(this.chapp);
  ngOnInit(): void {
    this.getallchapter();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private chapservice: ChapitreServiceService, public dialog: MatDialog) {}
  displayedColumns: string[] = ['chapitre', 'Prerequis', 'seriedexercice'];

  getallchapter() {
    this.chapservice.getchapitre().subscribe((chapt) => {

      this.chapp = chapt;

    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AjouterChapitreComponent, {
      panelClass: 'my-custom-dialog-class',
      data: {
        NomChap: this.name,
        Module: this.module,
        Course: this.course,
        ChapPrerquis: this.pre_required_chapter,
        resumer_cour: this.resumer_cour,
        catre_conceptuelle: this.catre_conceptuelle
      }
    });
    dialogRef.afterClosed().subscribe((result) => {

      this.chapp = result;
      this.getallchapter();
    });
  }
}

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }
// }

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
// //  chapp:Chapter[];
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
