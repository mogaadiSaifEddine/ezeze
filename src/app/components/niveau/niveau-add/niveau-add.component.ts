import { Component, OnInit } from '@angular/core';
import { NiveauService } from '../../../services/niveauService/niveau.service';
import { Router } from '@angular/router';
import { Niveau } from '../../../model/Niveau';

@Component({
  selector: 'app-niveau-add',
  templateUrl: './niveau-add.component.html',
  styleUrls: ['./niveau-add.component.scss'],
})
export class NiveauAddComponent implements OnInit {
  n: Niveau = new Niveau();
  constructor(private _router: Router, private ns: NiveauService) {}

  ngOnInit() {}

  // convenience getter for easy access to form fields
  onClickSubmit(result) {

    this.n.titre = result.niveau;
    this.ns
      .addNiveau(this.n)
      .subscribe((res) =>
    this._router.navigateByUrl('niveau/show');
  }
}
