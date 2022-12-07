import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chapter } from 'src/app/model/Chapter';
import { Module } from 'src/app/model/Module';
import { ChapitreServiceService } from '../../../service/chapitre-service.service'
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})


export class CardsComponent {

  colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' }
  ];
  regiForm: FormGroup;

  IsAccepted: number = 0;
  chapitre: Chapter;

  imgContext = { $implicit: 'top', bottom: 'bottom' };

  constructor(private fb: FormBuilder, private chapterservice: ChapitreServiceService, private route: Router) {
    this.regiForm = fb.group({
      'NomChap': [null, Validators.required],
      'Module': [null, Validators.required],
      'Course': [null, Validators.required],
      'IsAccepted': [null],
      'ChapPrerquis': [null, Validators.required]

    });
  }


  onChange(event: any) {
    if (event.checked === true) {
      this.IsAccepted = 1;
    } else {
      this.IsAccepted = 0;
    }
  }

  // onFormSubmit(): void {
  //
  //   this.chapterservice.ajouterchapitre(this.regiForm.value).subscribe(data => {
  //     this.chapitre = data
  //   })
  //   this.route.navigate[("/dashboard")];
  //   alert("chapitre a été ajouter ");
  // }
  // {'name':this.regiForm.value.NomChap,'module':this.regiForm.value.Module,'pre_required_chapter':this.regiForm.value.ChapPrerquis,'course':this.regiForm.value.course,'catre_conceptuelle':'','resumer_cour':'','id':this.regiForm.value.id}
}
