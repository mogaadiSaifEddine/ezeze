import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercice } from '../../../model/Exercice';
import { delay } from 'utils-decorators';
import { saveAs } from 'file-saver';

import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-exercice-show',
  templateUrl: './exercice-show.component.html',
  styleUrls: ['./exercice-show.component.scss']
})
export class ExerciceShowComponent implements OnInit {
  exercices: Exercice[] = [];
  dataSource = new MatTableDataSource<Exercice>(this.exercices);

  constructor(private sanitizer: DomSanitizer, private _liveAnnouncer: LiveAnnouncer) {}

  displayedColumns = ['numero', 'niveau', 'trimestre', 'sousChamp', 'chapitre', 'difficulte', 'fichiers'];

  @delay(200)
  getInfo() {
    // this.es.FindAllExercices().subscribe((res) => (this.exercices = res));

    this.getList();
  }
  @delay(700)
  getList() {
    // this.dataSource = new MatTableDataSource<Exercice>(this.exercices);
    // this.dataSource.filterPredicate = function (record,filter) {
    //   return (record.difficulte.titre.toLocaleLowerCase().includes(filter.toLocaleLowerCase() )||
    //     record.niveau.titre.toLocaleLowerCase().includes(filter.toLocaleLowerCase() ) ||
    //     record.numero.toString().includes(filter.toLocaleLowerCase() ) ||
    //     record.trimestre.titre.toLocaleLowerCase().includes(filter.toLocaleLowerCase() ) ||
    //     record.sousChamp.titre.toLocaleLowerCase().includes(filter.toLocaleLowerCase() ) ||
    //     record.chapitre.titre.toLocaleLowerCase().includes(filter.toLocaleLowerCase() )
    //   );
    // }
    // this.dataSource.sortingDataAccessor = (item, property) => {
    //   switch(property) {
    //     case 'niveau': return item.niveau.titre;
    //     case 'chapitre': return item.chapitre.titre;
    //     case 'trimestre': return item.trimestre.titre;
    //     case 'sousChamp': return item.sousChamp.titre;
    //     case 'difficulte': return item.difficulte.titre;
    //     default: return item[property];
    //   }
    // };
    // if (this.exercices !== []) {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }
  }

  ngOnInit(): void {
    this.getInfo();
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    /*if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/
  }

  getSanitizedURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  save(url: string, adress: string) {
    saveAs(this.getSanitizedURL(url).toString(), adress);
  }
}
