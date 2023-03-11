import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-words-syllables-exercice',
  templateUrl: './words-syllables-exercice.component.html',
  styleUrls: ['./words-syllables-exercice.component.scss']
})
export class WordsSyllablesExerciceInputComponent implements OnInit {
  @Input() wordsSyllablesForm: FormGroup
  @Output() wordsSyllablesFormChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() defaultForm

  form: FormGroup
  wordsArray: FormArray
  wordsForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.defaultForm) {
      this.setDefaultForm();
      this.removeWord(this.wordsForm.value.words.length - 1)
    } else {
      this.wordsForm = this.fb.group({
        words: this.fb.array([
          this.fb.group({
            word: this.fb.array([
              this.fb.group({
                syllable: [null]
              })
            ]),
          })
        ]),
      });
    }

    this.wordsForm.valueChanges.subscribe(res => {
      this.wordsSyllablesFormChange.emit(this.wordsForm);
    })
  }
  setDefaultForm() {

    this.wordsForm = this.fb.group({
      words: this.fb.array([
        this.fb.group({
          word: this.fb.array([]),
        })
      ]),
    });

    this.defaultForm.blocks.forEach((word, index) => {
      this.addWords(false)
      word.correctValue.split('/').filter(syllable => syllable != '').forEach(syllable => {
        this.addSyllable(index, syllable)
      })
    });
  }
  newWord(withSyllable?: boolean): FormGroup {
    if (withSyllable) {
      return this.fb.group({
        word: this.fb.array([
          this.fb.group({
            syllable: [null]
          })
        ]),
      })
    } else {
      return this.fb.group({
        word: this.fb.array([
        ]),
      })
    }
  }
  addWords(withSyllable?) {
    this.words.push(this.newWord(withSyllable));
  }
  addSyllable(index: number, syllable?: string) {
    (this.words.controls[index].get('word') as FormArray).push(this.fb.group({
      syllable: [syllable ? syllable : null]
    }))
  }
  removeSyllable(i, j) {
    (this.words.controls[i].get('word') as FormArray).removeAt(j)
  }
  getSyllableArray(index) {
    return this.words.controls[index].get('word') as FormArray
  }
  removeWord(i: number) {
    this.words.removeAt(i);
  }
  onSubmit() {
    console.log(this.wordsForm.value);
  }
  get words(): FormArray {
    return this.wordsForm.get("words") as FormArray
  }
  addWord() {
    this.words.push(new FormControl(''));
  }
}
