import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import * as _ from 'lodash';

@Component({
  selector: 'ines-csi-display',
  templateUrl: './csi-display.component.html',
  styleUrls: ['./csi-display.component.scss']
})
export class CsiDisplayComponent implements OnInit {

  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange = new EventEmitter<boolean>();
  @Output() canGoNext = new EventEmitter<boolean>();

  CORRECT_ANSWER_COMBINATION: boolean[] = [];
  USER_ANSWER_COMBINATION: boolean[] = [];
  FINAL_BOOLEAN: boolean = false;

  constructor(private render: Renderer2) { }

  ngOnInit(): void {
    this.initExercice();
  }

  private initExercice() {
    // init mirror arrays to use in validation
    this.CORRECT_ANSWER_COMBINATION = new Array(this.exercice.blocks.length).fill('*');
    this.USER_ANSWER_COMBINATION = new Array(this.exercice.blocks.length).fill('*');

    this.exercice.blocks.forEach((block: any, index: number) => {
      // SENTENCE BLOCKS  
      if (block.exerciceBlockType === ExerciceBlockTypes.SHAPES_IMAGES_TO_COLOR) {
        block.blockParams = JSON.parse(block.blockParams);
        this.CORRECT_ANSWER_COMBINATION[index] = block.blockParams.image_is_colored;
      }
    });
  }

  toggleColor(event: any, colorToUse: string, index: number) {
    if (event.target.className.includes('selected')) {
      this.render.removeClass(event.target, "selected");
      this.render.setStyle(event.target, 'background-color', '#fff');
      this.kepTrackOfScore(false, index);
    } else {
      this.kepTrackOfScore(true, index);
      this.render.setStyle(event.target, 'background-color', colorToUse);
      this.render.addClass(event.target, "selected");
    }

  }

  kepTrackOfScore(state: boolean, index: number) {
    this.USER_ANSWER_COMBINATION[index] = state;

    this.FINAL_BOOLEAN = _.isEqual(this.USER_ANSWER_COMBINATION, this.CORRECT_ANSWER_COMBINATION);

    this.answerChange.emit(this.FINAL_BOOLEAN);
    this.canGoNext.emit(true);
  }



  ngOnDestroy() {
    this.exercice.blocks.forEach((block: any) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.SHAPES_IMAGES_TO_COLOR) {
        block.blockParams = JSON.stringify(block.blockParams);
      }
    });
  }

}
