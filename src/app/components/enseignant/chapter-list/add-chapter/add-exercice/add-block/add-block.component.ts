import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';

@Component({
  selector: 'app-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.scss']
})
export class AddBlockComponent implements OnInit {
  @Input() block: ExerciceBlock;
  @Output() blockElement: EventEmitter<ExerciceBlock> = new EventEmitter<ExerciceBlock>();
  blockForm: FormGroup;
  TYPES = ExerciceBlockTypes;
  TYPES_KEYS_MAP = Object.values(this.TYPES).map((el, ind) => ({ key: ind, value: el }));
  showLabel = false;
  showCorrectValue = false;
  showPlaceholder = false;
  showValue = false;
  showOrder = false;
  placeHolder = 'placeholder';
  valueHolder = 'value';
  labelHolder = 'label';
  correctValueHolder = 'correct value';

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { block: ExerciceBlock; exercice_type: string }, private dialogRef: MatDialogRef<AddBlockComponent>) {}

  ngOnInit(): void {
    this.filterTypes();
    this.initForm();
  }
  // this code is bullshit but we dont have time
  checkFieldsToShow() {
    console.log(this.blockForm.get('exerciceBlockType').value);

    if (this.blockForm.get('exerciceBlockType').value === 6) {
      this.showLabel = false;
      this.showCorrectValue = false;
      this.showPlaceholder = false;
      this.showValue = true;
      this.valueHolder = "Selectioner l'url de l'image";
      this.blockForm.get('value').addValidators([Validators.required]);
      this.blockForm.get('label').clearValidators();
      this.blockForm.get('correctValue').clearValidators();
      this.blockForm.get('placeholder').clearValidators();
    }
    if (this.data.exercice_type === 'LIKERT_SCALE') {
      if (this.blockForm.get('exerciceBlockType').value === 2) {
        this.showLabel = false;
        this.showCorrectValue = true;
        this.showPlaceholder = true;
        this.showValue = false;
        this.placeHolder = 'Veuiller saisir le champ a voter';
        this.correctValueHolder = 'Veuiller saisir la valeur correcte de 1-5';

        this.blockForm.get('label').clearValidators();
        this.blockForm.get('value').clearValidators();
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.blockForm.get('placeholder').addValidators([Validators.required]);
      }
    } else if (this.data.exercice_type === 'NUMERIC') {
      if (this.blockForm.get('exerciceBlockType').value === 3) {
        this.showLabel = true;
        this.showCorrectValue = true;
        this.showPlaceholder = false;
        this.showValue = false;
        this.labelHolder = 'Veuiller saisir la question';
        this.correctValueHolder = 'Veuiller saisir la valeur correcte';
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('value').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      }
    } else if (this.data.exercice_type === 'CORRESPONDANCE') {
      this.showLabel = true;
      this.showValue = true;
      this.showPlaceholder = true;

      this.placeHolder = "Veuiller saisir le nom de l'image";
      this.valueHolder = 'Veuiller saisir la valeur';
      this.labelHolder = 'Veuiller saisir le label';

      this.blockForm.get('label').addValidators([Validators.required]);
      this.blockForm.get('value').addValidators([Validators.required]);
      this.blockForm.get('placeholder').addValidators([Validators.required]);
      if (this.blockForm.get('exerciceBlockType').value === 10) {
        this.showCorrectValue = true;
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.correctValueHolder = 'Veuiller saisir la valeur correcte';
      } else {
        this.showCorrectValue = false;
        this.blockForm.get('correctValue').clearValidators();
      }
    } else if (this.data.exercice_type === 'WORD_COLORATION') {
      if (this.blockForm.get('exerciceBlockType').value === 4 || this.blockForm.get('exerciceBlockType').value === 16) {
        this.showLabel = true;
        this.showPlaceholder = false;
        this.showValue = false;
        this.showCorrectValue = true;

        this.labelHolder = 'Veuiller saisir la mot a colorer';

        this.correctValueHolder = 'Veuiller saisir la couleur correcte si aucune valeur correcte laisser vide';
        this.blockForm.get('correctValue').clearValidators();
        this.blockForm.get('label').addValidators([Validators.required]);
        this.blockForm.get('value').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      } else {
        this.showLabel = true;
        this.showCorrectValue = false;
        this.showPlaceholder = false;
        this.showValue = false;
        this.labelHolder = "Veuiller saisir le couleur de l'image";
        this.blockForm.get('label').addValidators([Validators.required]);
        this.blockForm.get('value').clearValidators();
        this.blockForm.get('correctValue').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      }
    } else if (this.data.exercice_type === 'FILL_EMPTY_FIELDS') {
      if (this.blockForm.get('exerciceBlockType').value === 5) {
        this.showLabel = false;
        this.showCorrectValue = false;
        this.showPlaceholder = false;
        this.showValue = true;
        this.valueHolder = 'Veuiller saisir le texte';
        this.blockForm.get('value').addValidators([Validators.required]);
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('correctValue').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      } else if (this.blockForm.get('exerciceBlockType').value === 2) {
        this.showLabel = false;
        this.showPlaceholder = false;
        this.showValue = true;
        this.showCorrectValue = true;
        this.labelHolder = 'Veuiller saisir le texte';
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('value').clearValidators();
        this.valueHolder = 'Veuilller saisir la valeur initiale du champ vide (optionel)';
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.correctValueHolder = 'Veuiller saisir la valeur correcte du champ';
        this.blockForm.get('placeholder').clearValidators();
      }
      // this.showLabel = true;
      // this.showCorrectValue = true;
      // this.showPlaceholder = true;
      // this.showValue = true;
      // this.blockForm.get('label').addValidators([Validators.required]);
      // this.blockForm.get('value').addValidators([Validators.required]);
      // this.blockForm.get('placeholder').addValidators([Validators.required]);
    } else if (this.data.exercice_type === 'MULTIPLE_RESPONSE') {
      if (this.blockForm.get('exerciceBlockType').value === 2) {
        this.showLabel = true;
        this.showCorrectValue = true;
        this.showPlaceholder = false;
        this.showValue = true;
        this.labelHolder = 'Veuiller saisir le text du champ';
        this.blockForm.get('label').addValidators([Validators.required]);
        this.blockForm.get('value').clearValidators();
        this.valueHolder = 'Veullier saisir true si vous vouler que le champ soit coché initialement (optionel)';
        this.correctValueHolder = 'Veuiller saisir true si ce champ est la bonne reponse';
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.blockForm.get('placeholder').clearValidators();
      } else if (this.blockForm.get('exerciceBlockType').value === 15) {
        this.showLabel = true;
        this.showCorrectValue = false;
        this.showPlaceholder = false;
        this.showValue = false;
        this.labelHolder = 'Veuiller saisir la question';
        this.blockForm.get('value').clearValidators();
        this.blockForm.get('label').addValidators([Validators.required]);
        this.blockForm.get('correctValue').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      }
    } else if (this.data.exercice_type === 'SELECT_FROM_LIST') {
      if (this.blockForm.get('exerciceBlockType').value === 5) {
        this.showLabel = false;
        this.showCorrectValue = false;
        this.showPlaceholder = false;
        this.showValue = true;
        this.labelHolder = 'Veuiller saisir le texte';
        this.blockForm.get('value').addValidators([Validators.required]);
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('correctValue').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      } else if (this.blockForm.get('exerciceBlockType').value === 2) {
        this.showLabel = false;
        this.showPlaceholder = true;
        this.showValue = false;
        this.showCorrectValue = true;
        this.labelHolder = 'Veuiller saisir le texte';
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('value').clearValidators();
        this.placeHolder = 'Veuilller saisir les champ de selection séparé avec /';
        this.blockForm.get('placeholder').addValidators([Validators.required]);
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.correctValueHolder = 'Veuiller saisir la valeur correcte de la selection';
      }
    } else if (this.data.exercice_type === 'WRITING') {
      if (this.blockForm.get('exerciceBlockType').value === 2) {
        this.showLabel = true;
        this.showCorrectValue = true;
        this.showPlaceholder = false;
        this.showValue = false;
        this.labelHolder = 'Veuiller saisir la question';

        this.blockForm.get('label').clearValidators();
        this.blockForm.get('value').clearValidators();
        this.correctValueHolder = "veiller saisir la valuer correcte de l'essai";
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.blockForm.get('label').addValidators([Validators.required]);

        this.blockForm.get('placeholder').clearValidators();
      }
    } else if (this.data.exercice_type === 'TRUE_FALSE') {
      if (this.blockForm.get('exerciceBlockType').value === 1) {
        this.showLabel = true;
        this.showCorrectValue = true;
        this.showPlaceholder = false;
        this.showValue = false;
        this.labelHolder = 'Veuiller saisir true or false';
        this.correctValueHolder = 'Veuiller saisir true pour la valeur correcte';
        this.blockForm.get('value').addValidators([Validators.required]);
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('correctValue').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      } else if (this.blockForm.get('exerciceBlockType').value === 15) {
        this.showLabel = true;
        this.showCorrectValue = false;
        this.showPlaceholder = false;
        this.showValue = false;
        this.labelHolder = 'Veuiller saisir la question';
        this.blockForm.get('value').clearValidators();
        this.blockForm.get('label').addValidators([Validators.required]);
        this.blockForm.get('correctValue').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      }
    } else if (this.data.exercice_type === 'MULTIPLE_CHOICE') {
      if (this.blockForm.get('exerciceBlockType').value === 1) {
        this.showLabel = true;
        this.showCorrectValue = true;
        this.showPlaceholder = false;
        this.showValue = false;
        this.labelHolder = 'Veuiller la valeur du champ';
        this.correctValueHolder = 'Veuiller saisir true si cette valuer est correcte';
        this.blockForm.get('value').addValidators([Validators.required]);
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('correctValue').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      } else if (this.blockForm.get('exerciceBlockType').value === 15) {
        this.showLabel = true;
        this.showCorrectValue = false;
        this.showPlaceholder = false;
        this.showValue = false;
        this.labelHolder = 'Veuiller saisir la question';
        this.blockForm.get('value').clearValidators();
        this.blockForm.get('label').addValidators([Validators.required]);
        this.blockForm.get('correctValue').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      }
    } else if (this.data.exercice_type === 'SHORT_RESPONSE') {
      if (this.blockForm.get('exerciceBlockType').value === 2) {
        this.showLabel = true;
        this.showCorrectValue = true;
        this.showPlaceholder = false;
        this.showValue = false;
        this.labelHolder = 'Veuiller saisir la question';
        this.correctValueHolder = 'Veuiller saisir la valeur correcte';
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('value').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      }
    } else if (this.data.exercice_type === 'DRAG_WORDS') {
      if (this.blockForm.get('exerciceBlockType').value === 2) {
        this.showLabel = false;
        this.showCorrectValue = true;
        this.showPlaceholder = false;
        this.showValue = false;
        this.correctValueHolder = 'Veuiller saisir la valeur correcte';
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('value').clearValidators();
        this.blockForm.get('placeholder').clearValidators();
      } else if (this.blockForm.get('exerciceBlockType').value === 5) {
        this.showLabel = false;
        this.showCorrectValue = false;
        this.showPlaceholder = false;
        this.showValue = true;
        this.valueHolder = 'Veuiller saisir le texte';
        this.blockForm.get('correctValue').clearValidators();
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('value').addValidators([Validators.required]);
        this.blockForm.get('placeholder').clearValidators();
      } else if (this.blockForm.get('exerciceBlockType').value === 4) {
        this.showLabel = false;
        this.showCorrectValue = false;
        this.showPlaceholder = false;
        this.showValue = true;
        this.valueHolder = 'Veuiller saisir les mots separer avec un /';
        this.blockForm.get('correctValue').clearValidators();
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('value').addValidators([Validators.required]);
        this.blockForm.get('placeholder').clearValidators();
      }
    } else if (this.data.exercice_type === 'SEQUENCING') {
      if (this.blockForm.get('exerciceBlockType').value === 2) {
        this.showLabel = false;
        this.showCorrectValue = true;
        this.showPlaceholder = true;
        this.showValue = false;
        this.placeHolder = 'veuiller saisir le texte';
        this.correctValueHolder = 'Veuiller saisir la valeur par ordre en nombre ex 1';
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.blockForm.get('label').clearValidators();
        this.blockForm.get('value').clearValidators();
        this.blockForm.get('placeholder').addValidators([Validators.required]);
      }
    } else if (this.data.exercice_type === 'LINK_ARROW') {
      this.showLabel = true;
      this.showValue = true;
      this.showPlaceholder = false;

      this.valueHolder = 'Veuiller saisir la valeur';
      this.labelHolder = 'Veuiller saisir le label';

      this.blockForm.get('label').addValidators([Validators.required]);
      this.blockForm.get('value').addValidators([Validators.required]);
      this.blockForm.get('placeholder').clearValidators();
      if (this.blockForm.get('exerciceBlockType').value === 12) {
        this.showCorrectValue = true;
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.correctValueHolder = 'Veuiller saisir la valeur correcte separer avec un /';
      } else {
        this.showCorrectValue = false;
        this.blockForm.get('correctValue').clearValidators();
      }
    } else if (this.data.exercice_type === 'LISTEN') {
      this.showLabel = true;
      this.showValue = true;
      this.showPlaceholder = false;

      this.valueHolder = 'Veuiller saisir la valeur';
      this.labelHolder = 'Veuiller saisir le label';

      this.blockForm.get('label').addValidators([Validators.required]);
      this.blockForm.get('value').addValidators([Validators.required]);
      // this.blockForm.addControl('imageFile', new FormControl('', Validators.required));
      // this.blockForm.addControl('audioFile', new FormControl('', Validators.required));
      this.blockForm.get('placeholder').clearValidators();
      console.log(this.blockForm.value);

      if (this.blockForm.get('exerciceBlockType').value === 12) {
        this.showCorrectValue = true;
        this.blockForm.get('correctValue').addValidators([Validators.required]);
        this.correctValueHolder = 'Veuiller saisir la valeur correcte separer avec un /';
      } else {
        this.showCorrectValue = false;
        this.blockForm.get('correctValue').clearValidators();
      }
    }
  }

  initForm() {
    this.blockForm = this.fb.group({
      exerciceBlockType: [this.block?.exerciceBlockType, [Validators.required]],
      label: [this.data.block?.label],
      correctValue: [this.data.block?.correctValue],
      placeholder: [this.data.block?.placeholder],
      value: [this.data.block?.value],
      blockOrder: [this.data.block?.blockOrder],
      isAdmissable: [this.data.block?.isAdmissable],
      exercice_Block_Id: [this.data.block?.exerciceBlockId],
      imageFile: [''],
      audioFile: [''],
      workstationUuid: this.fb.group({})
    });
  }

  filterTypes() {
    if (this.data.exercice_type === 'CORRESPONDANCE') {
      this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => x.value === 'CORRESPONDANCE_LEFT' || x.value === 'CORRESPONDANCE_RIGHT');
    } else if (this.data.exercice_type === 'LINK_ARROW') {
      this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => x.value === 'ARROW_LEFT' || x.value === 'ARROW_RIGHT');
    } else if (this.data.exercice_type === 'MULTIPLE_CHOICE' || this.data.exercice_type === 'TRUE_FALSE') {
      this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => x.value === 'RADIO' || x.value === 'IMAGE' || x.value === 'QUESTION');
    } else if (
      this.data.exercice_type === 'SHORT_RESPONSE' ||
      this.data.exercice_type === 'SEQUENCING' ||
      // this.data.exercice_type === 'HOTSPOT' ||
      this.data.exercice_type === 'WRITING' ||
      this.data.exercice_type === 'LIKERT_SCALE'
    ) {
      this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => x.value === 'INPUT_TEXT');
    } else if (this.data.exercice_type === 'MULTIPLE_RESPONSE') {
      this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => x.value === 'INPUT_TEXT' || x.value === 'QUESTION');
    } else if (this.data.exercice_type === 'NUMERIC') {
      this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => x.value === 'INPUT_NUMBER');
    } else if (this.data.exercice_type === 'WORD_COLORATION') {
      this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => x.value === 'COLOR' || x.value === 'HIGHLIGHT_TEXT' || x.value === 'COLORATE_TEXT' || x.value === 'BREAK');
    } else if (this.data.exercice_type === 'SELECT_FROM_LIST' || this.data.exercice_type === 'FILL_EMPTY_FIELDS') {
      this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => x.value === 'TEXT' || x.value === 'INPUT_TEXT' || x.value === 'BREAK');
    } else if (this.data.exercice_type === 'DRAG_DROP') {
      this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => x.value === 'DRAG_DROP_IMAGE_LIST');
    } else if (this.data.exercice_type === 'DRAG_WORDS') {
      this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => x.value === 'HIGHLIGHT_TEXT' || x.value === 'TEXT' || x.value === 'INPUT_TEXT' || x.value === 'BREAK');
    } else if (this.data.exercice_type === 'LISTEN') {
      this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => x.value === 'AUDIO_IMAGE');
    }
  }
  saveBlok() {
    let c = {};
    c[this.blockForm.value.label] = this.blockForm.value.correctValue;
    console.log(this.blockForm.get('audioFile').value);
    // let correctValue = { ...this.blockForm.value, workstationUuid: "{'a' : 'rr'}" };
    const correctValue = this.blockForm.value.exerciceBlockType === 16 ? { ...this.blockForm.value, correctValue: JSON.stringify(c) } : this.blockForm.value;
    console.log(correctValue);

    this.dialogRef.close(correctValue);
  }
}
