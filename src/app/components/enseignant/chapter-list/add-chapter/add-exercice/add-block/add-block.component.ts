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
  readonly EXERCICE_BLOCK_TYPES = ExerciceBlockTypes;
  blockTypes: ExerciceBlockTypes[];

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
    STROKE_WRONG_ANSWER: [ExerciceBlockTypes.ANSWER_TO_STROKE],
    SEPARATE_TEXT: [ExerciceBlockTypes.TEXT_TO_SEPARATE]
  };
  readonly showFieldsFor: Record<Exercise_Types, () => void> = {
    LIKERT_SCALE: () => this.showFieldsForLikertScale(),
    NUMERIC: () => this.showFieldsForNumeric(),
    CORRESPONDANCE: () => this.showFieldsForCorrespondance(),
    WORD_COLORATION: () => this.showFieldsForWordColoration(),
    FILL_LETTERS: (): void => this.showFieldsForFillLetters(),
    MULTIPLE_CHOICE: (): void => {
      this.showFiledsForMultipleChoice();
    },
    MULTIPLE_RESPONSE: (): void => {
      this.showFiledsForMultipleResponse();
    },
    TRUE_FALSE: (): void => {
      this.showFiledsForTrueFalse();
    },
    SHORT_RESPONSE: (): void => {
      this.showFiledsForShortResponse();
    },
    FILL_EMPTY_FIELDS: (): void => {
      this.showFiledsForEmptyFields();
    },
    SEQUENCING: (): void => {
      this.showFiledsForSequencing();
    },
    HOTSPOT: (): void => {},
    DRAG_DROP: (): void => {},
    DRAG_WORDS: (): void => {
      this.showFiledsForDragWords();
    },
    SELECT_FROM_LIST: (): void => {
      this.showFiledsForSelectFromList();
    },
    WRITING: (): void => {
      this.showFiledsForWriting();
    },
    TEXT_UNDER_IMAGE: () => this.showFieldsForTextUnderImage(),
    VERTICAL_EQUATION: () => this.showFieldsForVerticalEquation(),
    GENERAL_TABLES: () => this.showFieldsForGeneralTable(),
    STROKE_WRONG_ANSWER: () => this.showFieldsForStrokeTheWrongAnswer(),
    SEPARATE_TEXT: () => this.showFieldsForSeparateText(),
    LINK_ARROW: (): void => {
      this.showFiledsForLinkArrow();
    },
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
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.filterTypes();
  }
  checkFieldsToShow() {
    this.fieldData.resetFieldData();
    this.clearValidators();
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.IMAGE) {
      this.fieldData.showOnly(['showValue']);
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
    this.fieldData.showOnly(['showLabel', 'showValue']);

    this.fieldData.valueHolder = 'Veuiller saisir la valeur';
    this.fieldData.labelHolder = 'Veuiller saisir le label';

    this.blockForm.get('label').addValidators([Validators.required]);
    this.blockForm.get('value').addValidators([Validators.required]);
    this.blockForm.get('placeholder').clearValidators();

    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.BREAK) {
      this.fieldData.showCorrectValue = true;
      this.blockForm.get('correctValue').addValidators([Validators.required]);
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte separée avec un /';
    } else {
      this.fieldData.showCorrectValue = false;
      this.blockForm.get('correctValue').clearValidators();
    }
  }

  showFieldsForLikertScale() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.INPUT_TEXT) {
      this.fieldData.showOnly(['showPlaceholder', 'showCorrectValue']);
      this.fieldData.placeHolder = 'Veuiller saisir le champ a voter';
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte de 1-5';

      this.addCorrectValueValidator();
      this.addPlaceholderValidator();
    }
  }

  showFieldsForNumeric() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.INPUT_NUMBER) {
      this.fieldData.showOnly(['showLabel', 'showCorrectValue']);
      this.fieldData.labelHolder = 'Veuiller saisir la question';
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte';
      this.addCorrectValueValidator();
      this.addLabelValidator();
    }
  }

  showFieldsForTextUnderImage() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.IMAGE_WITH_TEXT) {
      this.fieldData.showLabel = false; // TEXT SHOWN TO STUDENT
      this.fieldData.showCorrectValue = true; // show to teacher and test to get the score
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = true;
      this.fieldData;
      this.fieldData.labelHolder = 'Veuiller saisir la question';
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correct';
      this.addCorrectValueValidator();
    }
  }

  showFieldsForVerticalEquation() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.EQUATION) {
      this.fieldData.showLabel = false; // TEXT SHOWN TO STUDENT
      this.fieldData.showCorrectValue = false; // show to teacher and test to get the score
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = true;
      this.fieldData;
    }
  }
  showFieldsForGeneralTable() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.TABLE) {
      this.fieldData.showLabel = false; // TEXT SHOWN TO STUDENT
      this.fieldData.showCorrectValue = false; // show to teacher and test to get the score
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = true;
      this.fieldData;
    }
  }

  showFieldsForStrokeTheWrongAnswer() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.ANSWER_TO_STROKE) {
      this.fieldData.showLabel = false; // TEXT SHOWN TO STUDENT
      this.fieldData.showCorrectValue = false; // show to teacher and test to get the score
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = true;
      this.fieldData;
    }
  }
  showFieldsForSeparateText() {
    // console.log('BLOCK NUMBER BEING RETURNE FROM THE BACKK IS :::: ', this.blockForm.get('exerciceBlockType').value);
    
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.TEXT_TO_SEPARATE) {
      this.fieldData.showLabel = false; // TEXT SHOWN TO STUDENT
      this.fieldData.showCorrectValue = false; // show to teacher and test to get the score
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = true;
      this.fieldData;
    }
  }

  showFieldsForCorrespondance() {
    this.fieldData.showOnly(['showLabel', 'showValue', 'showPlaceholder']);

    this.fieldData.placeHolder = "Veuiller saisir le nom de l'image";
    this.fieldData.valueHolder = 'Veuiller saisir la valeur';
    this.fieldData.labelHolder = 'Veuiller saisir le label';

    this.addLabelValidator();
    this.addValueValidator();
    this.addPlaceholderValidator();

    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.CORRESPONDANCE_LEFT) {
      this.fieldData.showCorrectValue = true;
      this.addCorrectValueValidator();
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte';
    } else {
      this.fieldData.showCorrectValue = false;
    }
  }
  showFieldsForWordColoration() {
    if ([ExerciceBlockTypes.COLORATE_TEXT, ExerciceBlockTypes.HIGHLIGHT_TEXT].includes(this.blockForm.get('exerciceBlockType').value)) {
      this.fieldData.showOnly(['showLabel', 'showCorrectValue']);

      this.fieldData.labelHolder = 'Veuiller saisir la mot a colorer';
      this.fieldData.correctValueHolder = 'Veuiller saisir la couleur correcte si aucune valeur correcte laisser vide';

      this.addCorrectValueValidator();
      this.addLabelValidator();
    }
  }
  showFieldsForFillLetters() {
    this.fieldData.showOnly(['showValue', 'showCorrectValue']);

    this.fieldData.valueHolder = 'Veuillez saisir la réponse avec les séparateurs (exp: Ines<A>cademy)';
    this.fieldData.correctValueHolder = 'Veuiller saisir la réponse correcte à vérifier (exp: InesAcademy)';

    this.addValueValidator();
    this.addCorrectValueValidator();
  }

  showFiledsForEmptyFields() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.TEXT) {
      this.fieldData.showOnly(['showValue']);
      this.fieldData.valueHolder = 'Veuiller saisir le texte';
    } else {
      this.fieldData.showOnly(['showValue', 'showCorrectValue']);
      this.fieldData.valueHolder = 'Veuilller saisir la valeur initiale du champ vide (optionel)';
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte du champ';
    }
  }

  showFiledsForMultipleChoice() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.RADIO) {
      this.fieldData.showOnly(['showLabel', 'showCorrectValue', 'showValue']);
      this.fieldData.correctValueHolder = 'Veuiller saisir true si cette valuer est correcte';
    }
  }
  showFiledsForMultipleResponse() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.INPUT_TEXT) {
      this.fieldData.showOnly(['showLabel', 'showCorrectValue']);
      this.fieldData.correctValueHolder = 'Veuiller saisir true si cette valuer est correcte';
      this.fieldData.labelHolder = 'Veullier saisir true si vous vouler que le champ soit coché initialement (optionel)';
    }
  }

  showFiledsForTrueFalse() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.RADIO) {
      this.fieldData.showOnly(['showLabel', 'showCorrectValue']);
      this.fieldData.correctValueHolder = 'Veuiller saisir true pour la valeur correcte';
      this.fieldData.labelHolder = 'Veuiller saisir true or false';
    }
  }

  showFiledsForShortResponse() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.INPUT_TEXT) {
      this.fieldData.showOnly(['showLabel', 'showCorrectValue']);
      this.fieldData.labelHolder = 'Veuiller saisir la question';
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte';
    }
  }
  showFiledsForSequencing() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.INPUT_TEXT) {
      this.fieldData.showOnly(['showPlaceholder', 'showCorrectValue']);
      this.fieldData.placeHolder = 'veuiller saisir le texte';
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur par ordre en nombre ex 1';
    }
  }
  showFiledsForDragWords() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.INPUT_TEXT) {
      this.fieldData.showOnly(['showCorrectValue']);
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte';
    } else if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.TEXT) {
      this.fieldData.showOnly(['showValue']);
      this.fieldData.valueHolder = 'Veuiller saisir le texte';
    } else {
      this.fieldData.showOnly(['showValue']);
      this.fieldData.valueHolder = 'Veuiller saisir les mots separer avec un /';
    }
  }

  showFiledsForSelectFromList() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.INPUT_TEXT) {
      this.fieldData.showOnly(['showCorrectValue', 'showPlaceholder']);
      this.fieldData.placeHolder = 'Veuilller saisir les champ de selection séparé avec /';
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte';
    } else {
      this.fieldData.showOnly(['showValue']);
      this.fieldData.valueHolder = 'Veuiller saisir le texte';
    }
  }

  showFiledsForWriting() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.INPUT_TEXT) {
      this.fieldData.showOnly(['showCorrectValue', 'showLabel']);
      this.fieldData.labelHolder = 'Veuiller saisir la question';
      this.fieldData.correctValueHolder = 'Veuiller saisir la valeur correcte';
    }
  }
  showFiledsForLinkArrow() {
    if (this.blockForm.get('exerciceBlockType').value === ExerciceBlockTypes.ARROW_LEFT) {
      this.fieldData.showOnly(['showCorrectValue', 'showLabel', 'showValue']);
      this.fieldData.labelHolder = 'Veuiller saisir le label';
      this.fieldData.valueHolder = 'Veuiller saisir la valuer';
    } else {
      this.fieldData.showOnly(['showLabel', 'showValue']);
      this.fieldData.labelHolder = 'Veuiller saisir le label';
      this.fieldData.valueHolder = 'Veuiller saisir la valuer';
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
      blockParams: [this.data.block?.blockParams]
    });
  }

  filterTypes() {
    this.blockTypes = Object.values(this.EXERCICE_BLOCK_TYPES).filter((x) =>
      this.exerciceTypeToTypesKeysMap[this.data.exercice_type].includes(x)
    );
    if (this.blockTypes.length === 1) {
      this.blockForm.get('exerciceBlockType').patchValue(this.blockTypes[0]);
      this.checkFieldsToShow();
    }
  }
  saveBlock() {
    const c = {};
    c[this.blockForm.value.label] = this.blockForm.value.correctValue;

    const block =
      this.blockForm.value.exerciceBlockType === ExerciceBlockTypes.COLORATE_TEXT
        ? { ...this.blockForm.value, correctValue: JSON.stringify(c) }
        : this.blockForm.value;

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
