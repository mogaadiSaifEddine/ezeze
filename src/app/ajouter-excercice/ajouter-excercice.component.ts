import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseSeries } from '../../app/model/CourseSeries';
import { Chapter } from '../../app/model/Chapter';
import { ChapitreServiceService } from '../service/chapitre-service.service';
import { ExcerciceserviceService } from '../service/excerciceservice.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

const FRUITS: string[] = ['blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth'
];
@Component({
  selector: 'app-ajouter-excercice',
  templateUrl: './ajouter-excercice.component.html',
  styleUrls: ['./ajouter-excercice.component.scss']
})
export class AjouterExcerciceComponent implements OnInit {
  xxx: any;
  regiForm: FormGroup;
  exercice: CourseSeries;
  chap: Chapter[];
  ngOnInit(): void {
    this.getchapter();
  }
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, private Exservice: ExcerciceserviceService, private chapter: ChapitreServiceService) {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
    this.regiForm = fb.group({
      chap: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      nameex: [null, Validators.required],
      diff: [null, Validators.required],
      question: [null, Validators.required],
      label: [null, Validators.required],
      placeholder: [null, Validators.required],
      value: [null, Validators.required],
      correctValue: [null, Validators.required],
      exerciceBlockType: [null, Validators.required],
      seriesType: [null, Validators.required],
      typeEx: [null, Validators.required]
    });
  }
  onFormSubmit(): void {
    this.Exservice.ajouterserieexetblock(this.regiForm.value, this.regiForm.value.chap).subscribe((data) => {
      this.exercice = data;
    });
    // this.route.navigate[("/dashboard")];
    alert('kk a été ajouter ');
  }
  getchapter() {
    this.chapter.getchapitre().subscribe((serie) => {
      this.chap = serie;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' + NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))]
  };
}
