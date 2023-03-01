import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// DIALOGS
import { SentenceBuilderComponent } from '../stroke-sentence/sentence-builder/sentence-builder.component';
import { WordBuilderComponent } from '../stroke-word/word-builder/word-builder.component';
import { ShapesGroupsBuilderComponent } from '../stroke-sentence/shapes-groups-builder/shapes-groups-builder.component';
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
    if (this.CHOSEN_VARATION === "image")
      BLOCK_CREATOR_ACORDING_TO_TYPE = ShapesGroupsBuilderComponent;

    this.dialog
      .open(BLOCK_CREATOR_ACORDING_TO_TYPE, {
        width: '70%',
        maxWidth: '1000px',
        maxHeight: '90vh',
      }).afterClosed().subscribe((result) => {
        if (result) {
          this.dialogRef.close(result);
        }
      });
  }

}
