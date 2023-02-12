import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserData, AjouterChapitreComponent } from 'src/app/ajouter-chapitre/ajouter-chapitre.component';
import { ChapterType, Trimestre } from 'src/app/model/Chapter';
import { prerquis } from 'src/app/model/prerquis';
import { Chapter, Group } from 'src/app/model/User';

import { ChapitreService } from 'src/app/services/chapitre.service';
import { UserService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent implements OnInit {
  series = ['Evaluation', 'Exercice', 'Pre-Requis'];

  regiForm: FormGroup;
  chapitre: Chapter;
  classes: Group[];
  matieres: any;
  trimestres = Trimestre;
  Prer: prerquis[];
  chap: Chapter[];
  dataSource: MatTableDataSource<UserData>;
  CHAPTER_TYPE = ChapterType;
  filesForm: FormGroup;
  selectedFiles?: FileList;
  currentFile?: File;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialogRef: MatDialogRef<AddChapterComponent>,
    private fb: FormBuilder,
    private chapterservice: ChapitreService,
    private Userservice: UserService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public data: Chapter,
    public dialog: MatDialog
  ) {
    // Assign the data to the data source for the table to render
  }

  initForm() {
    this.regiForm = this.fb.group({
      name: [this.data?.name, Validators.required],
      type: [ChapterType.MATIERE, Validators.required],
      matiere: [null],
      groupe: [this.data?.group.id, Validators.required],
      trimestre: [this.data?.trimestre],
      catre_conceptuelle: [null],
      resumer_cour: [null]
    });
    this.filesForm = this.fb.group({});
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
  ngOnInit(): void {
    this.getAllGroupe();
    this.getMatieres();
    // this.getFile();
    this.initForm();
  }

  // getFile() {

  //   if (this.data) {
  //     this.chapterservice.getFile(this.data.catre_conceptuelle.carte_id).subscribe((res) => {
  //     });
  //   }
  // }

  onFormSubmit(): void {
    if (this.regiForm.valid) {
      if (!!this.data) {
        this.chapterservice
          .updateChapter(this.regiForm.value, this.data.chapter_id, this.regiForm.get('groupe').value)
          .subscribe(async (res: Chapter) => {
            if (this.filesForm.get('resumer_cour').value !== null)
              (await this.chapterservice.uploadVideo(this.filesForm.get('resumer_cour').value, res.chapter_id)).subscribe((res) => {});

            if (this.filesForm.get('catre_conceptuelle').value !== null)
              setTimeout(async () => {
                (await this.chapterservice.uploadFile(this.filesForm.get('catre_conceptuelle').value, res.chapter_id)).subscribe(
                  (res) => {}
                );
              }, 500);
            this.dialog.closeAll();
          });
      } else {
        this.chapitre = this.regiForm.value;
        this.chapterservice
          .addChapter({ chapterType: this.regiForm.value.type, ...this.regiForm.value }, this.regiForm.get('groupe').value)
          .subscribe(async (res: Chapter) => {
            if (this.filesForm.get('resumer_cour').value !== null)
              (await this.chapterservice.uploadVideo(this.filesForm.get('resumer_cour').value, res.chapter_id)).subscribe((res) => {});
            if (this.filesForm.get('catre_conceptuelle').value !== null)
              setTimeout(async () => {
                (await this.chapterservice.uploadFile(this.filesForm.get('catre_conceptuelle').value, res.chapter_id)).subscribe(
                  (res) => {}
                );
              }, 500);
            this.dialog.closeAll();
          });
      }
    }
  }

  getMatieres() {
    this.chapterservice.getMatieres().subscribe((data) => {
      this.matieres = data;
    });
  }
  getAllGroupe() {
    this.Userservice.getGroups().subscribe((serie) => {
      this.classes = serie;
    });
  }

  addChapterValidation() {
    if (this.regiForm.get('type').value === 0) {
      this.regiForm.get('trimestre').addValidators(Validators.required);
      this.regiForm.get('matiere').addValidators(Validators.required);
      this.filesForm.get('catre_conceptuelle').addValidators(Validators.required);
      this.filesForm.get('resumer_cour').addValidators(Validators.required);
    } else {
      this.regiForm.get('trimestre').clearValidators;
      this.regiForm.get('matiere').clearValidators;
      this.filesForm.get('catre_conceptuelle').clearValidators;
      this.filesForm.get('resumer_cour').clearValidators;
    }
  }

  onGroupChange() {
    this.chapterservice.getMatieres().subscribe((res) => {
      this.matieres = res;

      this.matieres = this.matieres.filter((mat) => mat.group.id === this.regiForm.get('groupe').value);
    });
  }
}
