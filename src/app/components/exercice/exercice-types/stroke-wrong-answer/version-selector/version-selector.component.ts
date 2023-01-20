import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// DIALOGS
import { SentenceBuilderComponent } from '../stroke-sentence/sentence-builder/sentence-builder.component';

@Component({
  selector: 'ines-version-selector',
  templateUrl: './version-selector.component.html',
  styleUrls: ['./version-selector.component.scss']
})
export class VersionSelectorComponent implements OnInit {

  exerciseVarations = [
    {
      type: "sentence",
      thumbnail: "https://i.imgur.com/Gk00wl2.png"
    },
    {
      type: "word",
      thumbnail: "https://i.imgur.com/vq0VjfS.png"
    },
    {
      type: "image",
      thumbnail: "https://i.imgur.com/5BVzB77.png"
    }
  ]

  CHOSEN_VARATION: any;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<VersionSelectorComponent>
  ) { }

  ngOnInit(): void {
  }

  handleUserTypeSelection(event: any) {
    this.CHOSEN_VARATION = event.target.value;
  }

  DisplayBlockCreator() {
    // don't forget to close this one

    let BLOCK_CREATOR_ACORDING_TO_TYPE: any;
    if (this.CHOSEN_VARATION === "sentence")
      BLOCK_CREATOR_ACORDING_TO_TYPE = SentenceBuilderComponent;

    this.dialog
      .open(BLOCK_CREATOR_ACORDING_TO_TYPE, {
        width: '70%',
        maxWidth: '800px',
        maxHeight: '80vh',
      }).afterClosed().subscribe((result) => {
        if (result) {
          this.dialogRef.close(result);
        }
      });
  }

}
