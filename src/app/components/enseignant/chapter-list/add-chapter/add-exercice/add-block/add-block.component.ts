import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { Exercise_Types } from 'src/app/model/Exercice_type';
import { FieldData } from 'src/app/helpers/block';

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

  fieldData = new FieldData();

  readonly exerciceTypeToTypesKeysMap: Record<Exercise_Types, ExerciceBlockTypes[]> = {
    CORRESPONDANCE: [ExerciceBlockTypes.CORRESPONDANCE_LEFT, ExerciceBlockTypes.CORRESPONDANCE_RIGHT],
    LINK_ARROW: [ExerciceBlockTypes.ARROW_LEFT, ExerciceBlockTypes.ARROW_RIGHT],
    MULTIPLE_CHOICE: [ExerciceBlockTypes.RADIO, ExerciceBlockTypes.IMAGE, ExerciceBlockTypes.QUESTION],
    TRUE_FALSE: [ExerciceBlockTypes.RADIO, ExerciceBlockTypes.IMAGE, ExerciceBlockTypes.QUESTION],
    SHORT_RESPONSE: [ExerciceBlockTypes.INPUT_TEXT],
    SEQUENCING: [ExerciceBlockTypes.INPUT_TEXT],
    WRITING: [ExerciceBlockTypes.INPUT_TEXT],
    LIKERT_SCALE: [ExerciceBlockTypes.INPUT_TEXT],
    MULTIPLE_RESPONSE: [ExerciceBlockTypes.INPUT_TEXT, ExerciceBlockTypes.QUESTION],
    NUMERIC: [ExerciceBlockTypes.INPUT_NUMBER],
    WORD_COLORATION: [
      ExerciceBlockTypes.COLOR,
      ExerciceBlockTypes.HIGHLIGHT_TEXT,
      ExerciceBlockTypes.COLORATE_TEXT,
      ExerciceBlockTypes.BREAK
    ],
    SELECT_FROM_LIST: [ExerciceBlockTypes.TEXT, ExerciceBlockTypes.INPUT_TEXT, ExerciceBlockTypes.BREAK],
    FILL_EMPTY_FIELDS: [ExerciceBlockTypes.TEXT, ExerciceBlockTypes.INPUT_TEXT, ExerciceBlockTypes.BREAK],
    DRAG_DROP: [ExerciceBlockTypes.DRAG_DROP_IMAGE_LIST],
    DRAG_WORDS: [ExerciceBlockTypes.HIGHLIGHT_TEXT, ExerciceBlockTypes.TEXT, ExerciceBlockTypes.INPUT_TEXT, ExerciceBlockTypes.BREAK],
    FILL_LETTERS: [ExerciceBlockTypes.TEXT],
    HOTSPOT: [],
    [Exercise_Types.DRAG_SYLLABLES]: [],
    [Exercise_Types.PUT_IN_FRAME]: [],
    [Exercise_Types.OUTSIDER_ELEMENT]: [],
    [Exercise_Types.LISTEN]: [ExerciceBlockTypes.AUDIO_IMAGE],
    [Exercise_Types.ARITHMETIC_TREE]: [],
    [Exercise_Types.FILL_BLANKS_IMG]: [],
    [Exercise_Types.COLOR_SHAPE]: [],
    TEXT_UNDER_IMAGE: [ExerciceBlockTypes.IMAGE_WITH_TEXT],
    VERTICAL_EQUATION: [ExerciceBlockTypes.EQUATION],
    GENERAL_TABLES: [ExerciceBlockTypes.TABLE],
    STROKE_WRONG_ANSWER: [ExerciceBlockTypes.ANSWER_TO_STROKE]
  };
  readonly showFieldsFor: Record<Exercise_Types, () => void> = {
    LIKERT_SCALE: () => this.showFieldsForLikertScale(),
    NUMERIC: () => this.showFieldsForNumeric(),
    CORRESPONDANCE: () => this.showFieldsForCorrespondance(),
    WORD_COLORATION: () => this.showFieldsForWordColoration(),
    FILL_LETTERS: (): void => this.showFieldsForFillLetters(),
    MULTIPLE_CHOICE: (): void => { },
    MULTIPLE_RESPONSE: (): void => { },
    TRUE_FALSE: (): void => { },
    SHORT_RESPONSE: (): void => { },
    FILL_EMPTY_FIELDS: (): void => { },
    SEQUENCING: (): void => { },
    HOTSPOT: (): void => { },
    DRAG_DROP: (): void => { },
    DRAG_WORDS: (): void => { },
    SELECT_FROM_LIST: (): void => { },
    WRITING: (): void => { },
    TEXT_UNDER_IMAGE: () => this.showFieldsForTextUnderImage(),
    VERTICAL_EQUATION: () => this.showFieldsForVerticalEquation(),
    GENERAL_TABLES: () => this.showFieldsForGeneralTable(),
    STROKE_WRONG_ANSWER: () => this.showFieldsForStrokeTheWrongAnswer(),
    LINK_ARROW: (): void => { },
    [Exercise_Types.DRAG_SYLLABLES]: function (): void {
      throw new Error('Function not implemented.');
    },
    [Exercise_Types.PUT_IN_FRAME]: function (): void {
      throw new Error('Function not implemented.');
    },
    [Exercise_Types.OUTSIDER_ELEMENT]: function (): void {
      throw new Error('Function not implemented.');
    },
    [Exercise_Types.LISTEN]: (): void => this.showFieldsForListening(),
    [Exercise_Types.ARITHMETIC_TREE]: function (): void {
      throw new Error('Function not implemented.');
    },
    [Exercise_Types.FILL_BLANKS_IMG]: function (): void {
      throw new Error('Function not implemented.');
    },
    [Exercise_Types.COLOR_SHAPE]: function (): void {
      throw new Error('Function not implemented.');
    }
  };

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { block: ExerciceBlock; exercice_type: string },
    private dialogRef: MatDialogRef<AddBlockComponent>
  ) { }

  ngOnInit(): void {
    this.filterTypes();
    this.initForm();
  }
  // this code is bullshit but we dont have time
  // (＃￣ω￣) * ... and appnester took exception to that *

  checkFieldsToShow() {
    this.fieldData.resetFieldData();
    this.clearValidators();
    if (this.blockForm.get('exerciceBlockType').value === 6) {
      this.fieldData.showLabel = false;
      this.fieldData.showCorrectValue = false;
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = true;
      this.fieldData.valueHolder = "Selectioner l'url de l'image";

      this.addValueValidator();
    } else {
      const showFieldsForExerciceType = this.showFieldsFor[this.data.exercice_type];
      if (showFieldsForExerciceType) {
        showFieldsForExerciceType();
      }
    }
  }

  private showFieldsForListening() {
    this.fieldData.showLabel = true;
    this.fieldData.showValue = true;
    this.fieldData.showPlaceholder = false;

    this.fieldData.valueHolder = 'Veuiller saisir la valeur';
    this.fieldData.labelHolder = 'Veuiller saisir le label';

    this.blockForm.get('label').addValidators([Validators.required]);
    this.blockForm.get('value').addValidators([Validators.required]);
    // this.blockForm.addControl('imageFile', new FormControl('', Validators.required));
    // this.blockForm.addControl('audioFile', new FormControl('', Validators.required));
    this.blockForm.get('placeholder').clearValidators();
    console.log(this.blockForm.value);

    if (this.blockForm.get('exerciceBlockType').value === 12) {
      this.fieldData.showCorrectValue = true;
      this.blockForm.get('correctValue').addValidators([Validators.required]);
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte separer avec un /';
    } else {
      this.fieldData.showCorrectValue = false;
      this.blockForm.get('correctValue').clearValidators();
    }
  }

  showFieldsForLikertScale() {
    if (this.blockForm.get('exerciceBlockType').value === 2) {
      this.fieldData.showLabel = false;
      this.fieldData.showCorrectValue = true;
      this.fieldData.showPlaceholder = true;
      this.fieldData.showValue = false;
      this.fieldData.placeHolder = 'Veuiller saisir le champ a voter';
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte de 1-5';

      this.addCorrectValueValidator();
      this.addPlaceholderValidator();
    }
  }

  showFieldsForNumeric() {
    if (this.blockForm.get('exerciceBlockType').value === 3) {
      this.fieldData.showLabel = true;
      this.fieldData.showCorrectValue = true;
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = false;
      this.fieldData.labelHolder = 'Veuiller saisir la question';
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte';
      this.addCorrectValueValidator();
      this.addLabelValidator();
    }
  }

  showFieldsForTextUnderImage() {
    if (this.blockForm.get('exerciceBlockType').value === 20) {
      this.fieldData.showLabel = false; // TEXT SHOWN TO STUDENT
      this.fieldData.showCorrectValue = true; // show to teacher and test to get the score
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = true;
      this.fieldData
      this.fieldData.labelHolder = 'Veuiller saisir la question';
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correct';
      this.addCorrectValueValidator();
    }
  }

  showFieldsForVerticalEquation() {
    if (this.blockForm.get('exerciceBlockType').value === 21) {
      this.fieldData.showLabel = false; // TEXT SHOWN TO STUDENT
      this.fieldData.showCorrectValue = false; // show to teacher and test to get the score
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = true;
      this.fieldData
    }
  }
  showFieldsForGeneralTable() {
    if (this.blockForm.get('exerciceBlockType').value === 22) {
      this.fieldData.showLabel = false; // TEXT SHOWN TO STUDENT
      this.fieldData.showCorrectValue = false; // show to teacher and test to get the score
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = true;
      this.fieldData
    }
  }

  showFieldsForStrokeTheWrongAnswer() {
    if (this.blockForm.get('exerciceBlockType').value === 23) {
      this.fieldData.showLabel = false; // TEXT SHOWN TO STUDENT
      this.fieldData.showCorrectValue = false; // show to teacher and test to get the score
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = true;
      this.fieldData
    }
  }

  showFieldsForCorrespondance() {
    this.fieldData.showLabel = true;
    this.fieldData.showValue = true;
    this.fieldData.showPlaceholder = true;

    this.fieldData.placeHolder = "Veuiller saisir le nom de l'image";
    this.fieldData.valueHolder = 'Veuiller saisir la valeur';
    this.fieldData.labelHolder = 'Veuiller saisir le label';

    this.addLabelValidator();
    this.addValueValidator();
    this.addPlaceholderValidator();

    if (this.blockForm.get('exerciceBlockType').value === 10) {
      this.fieldData.showCorrectValue = true;
      this.addCorrectValueValidator();
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte';
    } else {
      this.fieldData.showCorrectValue = false;
    }
  }
  showFieldsForWordColoration() {
    if (this.blockForm.get('exerciceBlockType').value === 4 || this.blockForm.get('exerciceBlockType').value === 16) {
      this.fieldData.showLabel = true;
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = false;
      this.fieldData.showCorrectValue = true;

      this.fieldData.labelHolder = 'Veuiller saisir la mot a colorer';

      this.fieldData.correctValueHolder = 'Veuiller saisir la couleur correcte si aucune valeur correcte laisser vide';

      this.addCorrectValueValidator();
      this.addLabelValidator();
    }
  }
  showFieldsForFillLetters() {
    this.fieldData.showValue = true;
    this.fieldData.showCorrectValue = true;

    this.fieldData.valueHolder = 'Veuillez saisir la réponse avec les séparateurs (exp: Ines<A>cademy)';
    this.fieldData.correctValueHolder = 'Veuiller saisir la réponse correcte à vérifier (exp: InesAcademy)';

    this.addCorrectValueValidator();
    this.addValueValidator();
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
    this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => this.exerciceTypeToTypesKeysMap[this.data.exercice_type].includes(x.value));
  }
  saveBlock() {
    const c = {};
    c[this.blockForm.value.label] = this.blockForm.value.correctValue;

    const block =
      this.blockForm.value.exerciceBlockType === 16 ? { ...this.blockForm.value, correctValue: JSON.stringify(c) } : this.blockForm.value;

    this.dialogRef.close(block);
  }
  private clearValidators() {
    this.blockForm.get('label').clearValidators();
    this.blockForm.get('value').clearValidators();
    this.blockForm.get('placeholder').clearValidators();
    this.blockForm.get('correctValue').clearValidators();
  }

  private addLabelValidator() {
    this.blockForm.get('label').addValidators([Validators.required]);
  }

  private addValueValidator() {
    this.blockForm.get('value').addValidators([Validators.required]);
  }

  private addPlaceholderValidator() {
    this.blockForm.get('placeholder').addValidators([Validators.required]);
  }

  private addCorrectValueValidator() {
    this.blockForm.get('correctValue').addValidators([Validators.required]);
  }
}
