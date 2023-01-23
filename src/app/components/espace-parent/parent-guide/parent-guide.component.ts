import { Component } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';


@Component({
  selector: 'app-parent-guide',
  templateUrl: './parent-guide.component.html',
  styleUrls: ['./parent-guide.component.scss']
})
export class ParentGuideComponent {

  constructor(private _lightbox: Lightbox) {
  }

  showFiller = false;
  _album: Array<any> = [
    {
      src: 'https://imgur.com/vKA5KXW.gif',
      thumb: 'https://imgur.com/vKA5KXW.gif',
      caption: 'Redeem a new token',
    },
    {
      src: 'https://imgur.com/eF7wZk0.gif',
      thumb: 'https://imgur.com/eF7wZk0.gif',
      caption: 'Display token details',
    },
    {
      src: 'https://imgur.com/VYZ1yJ1.gif',
      thumb: 'https://imgur.com/VYZ1yJ1.gif',
      caption: 'Create a new student account',
    },
    {
      src: 'https://imgur.com/wvv9dIC.gif',
      thumb: 'https://imgur.com/wvv9dIC.gif',
      caption: 'Update student info',
    },
    {
      src: 'https://imgur.com/YdqlNul.gif',
      thumb: 'https://imgur.com/YdqlNul.gif',
      caption: 'Delete a student account',
    },
  ];

  open(id: number): void {
    // open lightbox
    this._lightbox.open(this._album, id);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
