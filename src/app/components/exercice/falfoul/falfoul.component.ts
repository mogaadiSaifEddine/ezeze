import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-falfoul',
  templateUrl: './falfoul.component.html',
  styleUrls: ['./falfoul.component.scss']
})
export class FalfoulComponent implements OnInit {

  thereIsAnAnswer = false;
  answerIsCorrect = true;
  congrats = "Bon travail l'ami !";
  failureMessage = "Plus de chance la prochaine fois.";

  constructor(
    private ss: SharedService
  ) { }

  ngOnInit(): void {
    this.ss.showFalfoul.subscribe({
      next: (value: boolean) => {
        this.thereIsAnAnswer = value;
      }
    });

    this.ss.answerIsCorrect.subscribe({
      next: (value: boolean) => {
        this.answerIsCorrect = value;
      }
    });
  }

}
