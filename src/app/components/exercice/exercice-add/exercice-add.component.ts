import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Champ } from '../../../model/Champ';

import { Exercice } from '../../../model/Exercice';
import { MatSelectChange } from '@angular/material/select';
import { SousChamp } from 'src/app/model/SousChamp';
import { Chapter } from 'src/app/model/Chapter';
import { Difficulte } from 'src/app/model/Difficulte';

@Component({
  selector: 'app-exercice-add',
  templateUrl: './exercice-add.component.html',
  styleUrls: ['./exercice-add.component.scss']
})
export class ExerciceAddComponent implements OnInit {
  niveau = new FormControl('', [Validators.required]);
  trimestre = new FormControl('', [Validators.required]);
  champ = new FormControl('', [Validators.required]);
  sousChamp = new FormControl('', [Validators.required]);
  chapitre = new FormControl('', [Validators.required]);
  difficulte = new FormControl('', [Validators.required]);
  numero = new FormControl('', [Validators.required]);
  fichier = new FormControl('', [Validators.required]);
  // ex:Exercice=new Exercice();
  //  niveaux:Niveau[]=[];
  //  trimestres:Trimestre[]=[];
  submitted: any;
  opt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ngSelect = 1;
  champs: Champ[] = [];
  sousChamps: SousChamp[] = [];
  cacher: boolean = false;
  chapitres: Chapter[] = [];
  difficultes: Difficulte[] = [];
  uploadForm: FormGroup;
  formdata: FormData = new FormData();
  champselec: Champ;
  file: File;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      niveau: new FormControl('', [Validators.required]),
      trimestre: new FormControl('', [Validators.required]),
      champ: new FormControl('', [Validators.required]),
      sousChamp: new FormControl('', [Validators.required]),
      chapitre: new FormControl('', [Validators.required]),
      difficulte: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      fichier: new FormControl('', [Validators.required])
    });

    this.cacher = false;
    // this.ns.FindAllNiveaus().subscribe(res=>
    // {this.niveaux=res;
    // }

    // );
    // this.ts.FindAllTrimestres().subscribe(res=>{
    //   this.trimestres=res;

    // })

    // this.cs.FindAllChamps().subscribe(res=>{
    //   this.champs=res;

    // })
    // this.chaps.FindAllChapitres().subscribe(res=>{
    //   this.chapitres=res;

    // })
    // this.ds.FindAllDifficultes().subscribe(res=>{
    //   this.difficultes=res;
    // })
  }

  onSubmit() {
    if (
      !this.niveau.invalid &&
      !this.trimestre.invalid &&
      !this.champ.invalid &&
      !this.sousChamp.invalid &&
      !this.chapitre.invalid &&
      !this.difficulte.invalid &&
      !this.numero.invalid
    ) {
      // this.es.addExercice(this.ex).subscribe(res=>{
      //   this.fs.AddExerciceFiles(res.id,this.formdata).subscribe(()=>("file added"));
      //   this._router.navigateByUrl('exercice/show');
      // })
    }
  }

  // SelectChamp($event: MatSelectChange) {
  //   this.ss.FindSousChampByChamp(this.champselec.id).subscribe(res=>
  //   this.cacher=true;

  // }
  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.uploadForm.get('fichier').setValue(this.file);
    this.formdata.append('file', this.uploadForm.get('fichier').value);
  }

  getErrorMessage() {
    if (this.uploadForm.get('niveau').hasError('required')) {
      return 'Choisissez une valeur svp';
    }
    if (this.uploadForm.get('trimestre').hasError('required')) {
      return 'Choisissez une valeur svp';
    }
    if (this.uploadForm.get('champ').hasError('required')) {
      return 'Choisissez une valeur svp';
    }
    if (this.uploadForm.get('sousChamp').hasError('required')) {
      return 'Choisissez une valeur svp';
    }
    if (this.uploadForm.get('difficulte').hasError('required')) {
      return 'Choisissez une valeur svp';
    }
    if (this.uploadForm.get('numero').hasError('number')) {
      return 'Choisir un nombre superieur à 0 svp';
    }
    if (this.uploadForm.get('fichier').hasError('fichier')) {
      return 'Ajouter fichier svp';
    } else return null;
  }
}
