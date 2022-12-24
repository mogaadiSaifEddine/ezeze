import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-rejection',
  templateUrl: './comment-rejection.component.html',
  styleUrls: ['./comment-rejection.component.scss']
})
export class CommentRejectionComponent implements OnInit {
  
  comment=""

  constructor(private dialogRef:MatDialogRef<CommentRejectionComponent>){}
  ngOnInit(){
  }
}
