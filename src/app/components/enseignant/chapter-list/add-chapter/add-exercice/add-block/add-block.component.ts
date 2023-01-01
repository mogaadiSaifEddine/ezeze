import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { Exercise_Types } from 'src/app/model/Exercice_type';
import { FieldData } from 'src/app/types/block';

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

  fieldData: FieldData = {
    showLabel: false,
    showCorrectValue: false,
    showPlaceholder: false,
    showValue: false,
    showOrder: false,
    placeHolder: 'placeholder',
    valueHolder: 'value',
    labelHolder: 'label',
    correctValueHolder: 'correct value'
  };

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
    WORD_COLORATION: [ExerciceBlockTypes.COLOR, ExerciceBlockTypes.HIGHLIGHT_TEXT, ExerciceBlockTypes.COLORATE_TEXT, ExerciceBlockTypes.BREAK],
    SELECT_FROM_LIST: [ExerciceBlockTypes.TEXT, ExerciceBlockTypes.INPUT_TEXT, ExerciceBlockTypes.BREAK],
    FILL_EMPTY_FIELDS: [ExerciceBlockTypes.TEXT, ExerciceBlockTypes.INPUT_TEXT, ExerciceBlockTypes.BREAK],
    DRAG_DROP: [ExerciceBlockTypes.DRAG_DROP_IMAGE_LIST],
    DRAG_WORDS: [ExerciceBlockTypes.HIGHLIGHT_TEXT, ExerciceBlockTypes.TEXT, ExerciceBlockTypes.INPUT_TEXT, ExerciceBlockTypes.BREAK],
    FILL_LETTERS: [ExerciceBlockTypes.TEXT],
    HOTSPOT: []
  };
  readonly showFieldsFor: Record<string, () => void> = {
    LIKERT_SCALE: () => this.showFieldsForLikertScale(),
    NUMERIC: () => this.showFieldsForNumeric(),
    CORRESPONDANCE: () => this.showFieldsForCorrespondance(),
    WORD_COLORATION: () => this.showFieldsForWordColoration()
  };

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { block: ExerciceBlock; exercice_type: string }, private dialogRef: MatDialogRef<AddBlockComponent>) {}

  ngOnInit(): void {
    this.filterTypes();
    this.initForm();
  }
  clearValidators() {
    this.blockForm.get('label').clearValidators();
    this.blockForm.get('value').clearValidators();
    this.blockForm.get('placeholder').clearValidators();
    this.blockForm.get('correctValue').clearValidators();
  }

  addLabelValidator() {
    this.blockForm.get('label').addValidators([Validators.required]);
  }

  addValueValidator() {
    this.blockForm.get('value').addValidators([Validators.required]);
  }

  addPlaceholderValidator() {
    this.blockForm.get('placeholder').addValidators([Validators.required]);
  }

  addCorrectValueValidator() {
    this.blockForm.get('correctValue').addValidators([Validators.required]);
  }
  // this code is bullshit but we dont have time // .. or do we?

  checkFieldsToShow() {
    if (this.blockForm.get('exerciceBlockType').value === 6) {
      this.fieldData.showLabel = false;
      this.fieldData.showCorrectValue = false;
      this.fieldData.showPlaceholder = false;
      this.fieldData.showValue = true;
      this.fieldData.valueHolder = "Selectioner l'url de l'image";
      this.blockForm.get('value').addValidators([Validators.required]);
      this.blockForm.get('label').clearValidators();
      this.blockForm.get('correctValue').clearValidators();
      this.blockForm.get('placeholder').clearValidators();
    } else {
      const showFieldsForExerciceType = this.showFieldsFor[this.data.exercice_type];
      if (showFieldsForExerciceType) {
        showFieldsForExerciceType();
      }
    }
  }
  showFieldsForLikertScale() {
    if (this.blockForm.get('exerciceBlockType').value === 2) {
      this.clearValidators();
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
      this.clearValidators();
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

  showFieldsForCorrespondance() {
    this.clearValidators();
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
      this.clearValidators();
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

  initForm() {
    this.blockForm = this.fb.group({
      exerciceBlockType: [this.block?.exerciceBlockType, [Validators.required]],
      label: [this.data.block?.label],
      correctValue: [this.data.block?.correctValue],
      placeholder: [this.data.block?.placeholder],
      value: [this.data.block?.value],
      blockOrder: [this.data.block?.blockOrder],
      isAdmissable: [this.data.block?.isAdmissable],
      exercice_Block_Id: [this.data.block?.exerciceBlockId]
    });
  }

  filterTypes() {
    this.TYPES_KEYS_MAP = this.TYPES_KEYS_MAP.filter((x) => this.exerciceTypeToTypesKeysMap[this.data.exercice_type].includes(x.value));
  }
  saveBlock() {
    const c = {};
    c[this.blockForm.value.label] = this.blockForm.value.correctValue;

    const correctValue = this.blockForm.value.exerciceBlockType === 16 ? { ...this.blockForm.value, correctValue: JSON.stringify(c) } : this.blockForm.value;

    this.dialogRef.close(correctValue);
  }
}
