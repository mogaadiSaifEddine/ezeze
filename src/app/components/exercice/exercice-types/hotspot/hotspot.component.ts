import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'app-hotspot',
  templateUrl: './hotspot.component.html',
  styleUrls: ['./hotspot.component.scss']
})
export class HotspotComponent implements OnInit, OnChanges {
  selectedBlock;

  @Input() exercice: Exercice;
  @Input() answer: boolean;
  @Output() answerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() canGoNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChildren('hotspotImg') hotspotImg;
  readonly ExerciceBlockTypes = ExerciceBlockTypes;
  imageBlock: ExerciceBlock = null;
  hotspotsList: any[] = [];
  imageLoaded = false;
  constructor() {}
  ngOnInit(): void {
    this.exercice.question = this.exercice.question.split('#').join('\n');
    this.exercice.name = this.exercice.name.split('#').join('\n');

    this.initExercice();
  }

  private initExercice() {
    this.answerChange.emit(false);
    this.imageBlock = this.exercice.blocks.find((block: ExerciceBlock) => block.exerciceBlockType === ExerciceBlockTypes.IMAGE);
    console.log('BLOCKss', this.exercice.blocks);
    this.hotspotsList = [];
    this.exercice.blocks.forEach((block: ExerciceBlock) => {
      if (block.exerciceBlockType === ExerciceBlockTypes.INPUT_TEXT) {
        this.hotspotsList.push({
          y: parseFloat(block.label),
          x: parseFloat(block.placeholder),
          correctValue: block.correctValue
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercice']) {
      this.initExercice();
    }
  }

  valueChanged() {
    this.answerChange.emit(this.selectedBlock.value === this.selectedBlock.correctValue);
    this.canGoNext.emit(this.selectedBlock.value.length > 0);
  }

  hotspotClicked(hotspot) {
    !hotspot.value ? (hotspot.value = 'true') : (hotspot.value = null);
    let correct = true;
    console.log(this.hotspotsList);
    this.hotspotsList.forEach((hot) => {
      if (hot.value == 'true' && hot.correctValue != 'true') {
        correct = false;
      }
    });
    console.log(correct);
    this.answerChange.emit(correct);
    this.canGoNext.emit(true);
  }
}
