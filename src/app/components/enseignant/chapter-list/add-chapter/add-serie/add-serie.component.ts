import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chapter } from 'src/app/model/User';

@Component({
  selector: 'app-add-serie',
  templateUrl: './add-serie.component.html',
  styleUrls: ['./add-serie.component.scss']
})
export class AddSerieComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { series: any; chapter_id: number }) {}

  ngOnInit(): void {}
}
