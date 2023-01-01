import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-concept-map',
  templateUrl: './show-concept-map.component.html',
  styleUrls: ['./show-concept-map.component.scss']
})
export class ShowConceptMapComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ShowConceptMapComponent>, @Inject(MAT_DIALOG_DATA) public data: { imgSrc; imageType: string }) {}

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }
}
