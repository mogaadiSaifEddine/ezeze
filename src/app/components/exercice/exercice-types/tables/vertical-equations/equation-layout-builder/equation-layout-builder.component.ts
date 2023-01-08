import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ines-equation-layout-builder',
  templateUrl: './equation-layout-builder.component.html',
  styleUrls: ['./equation-layout-builder.component.scss']
})
export class EquationLayoutBuilderComponent implements OnInit {

  MATRIX: any[][];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.drawEquationMatrix();
  }

  drawEquationMatrix() {
    console.log(this.data);
    this.MATRIX = Array.from(Array(this.data.numRows), () => new Array(this.data.numColumns));
    console.log(this.MATRIX);
  }

}
