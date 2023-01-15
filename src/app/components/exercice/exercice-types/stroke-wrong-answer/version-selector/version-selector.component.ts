import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  handleUserTypeSelection(event: any) {
    this.CHOSEN_VARATION = event.target.value;
  }

  DisplayBlockCreator() {
    // don't forget to close this one


    switch (this.CHOSEN_VARATION) {

      case 'sentence':
        console.log("OPENING THIS FUCKER");
        break;

      case 'sentence':
        console.log("OPENING THIS FUCKER");
        break;

      case 'sentence':
        console.log("OPENING THIS FUCKER");
        break;
    }
  }

}
