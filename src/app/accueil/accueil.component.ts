import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/userservice.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  emailConfirmed = false;
  urlParams: any = {};

  constructor(private readonly translate: TranslateService) {}

  ngOnInit(): void {
    /*   this.activatedRoute.params.subscribe(s => {

      this.userservice.Activecompte(s["username"]).subscribe
      alert("avtive");


    });*/
    // this.activecompte();
  }
  changeLang(lang: string) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
  /* activecompte():void{
    this.userservice.Activecompte(this.urlParams).subscribe(()=>{
    this.emailConfirmed=true;
    alert("Bienvenu chez Education ! Votre compte est active  ")
    })

   }*/
}
