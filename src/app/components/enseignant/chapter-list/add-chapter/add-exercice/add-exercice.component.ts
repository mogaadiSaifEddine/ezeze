import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Difficulty } from 'src/app/model/Difficulty';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { Exercise_Types } from 'src/app/model/Exercice_type';
import { SerieService } from 'src/app/services/serie.service';
import { AddBlockComponent } from './add-block/add-block.component';
import { ExercicePreviewComponent } from './exercice-preview/exercice-preview.component';
import { InitEquationFormComponent } from 'src/app/components/exercice/exercice-types/tables/vertical-equations/init-equation-form/init-equation-form.component';
import { GeneralTablesBuilderComponent } from 'src/app/components/exercice/exercice-types/tables/general-purpose-tables/general-tables-builder/general-tables-builder.component';
import { VersionSelectorComponent } from 'src/app/components/exercice/exercice-types/stroke-wrong-answer/version-selector/version-selector.component';
import { TextUnderImageBuilderComponent } from 'src/app/components/exercice/exercice-types/tables/text-under-image-builder/text-under-image-builder.component';
import { CompositionTableBuilderComponent } from 'src/app/components/exercice/exercice-types/tables/composition-table/composition-table-builder/composition-table-builder.component';
import { ParagraphBuilderComponent } from 'src/app/components/exercice/exercice-types/separate-text/paragraph-builder/paragraph-builder.component';
import { WordBuilderComponent } from 'src/app/components/exercice/exercice-types/stroke-wrong-answer/stroke-word/word-builder/word-builder.component';
import * as _ from 'lodash';
@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.scss']
})
export class AddExerciceComponent implements OnInit {
  @Output() chapterId: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('hotspotImg') hotspotImg;
  currentExercice: Exercice;
  useEditor = true;
  useEditorQG = true;
  constructor(
    private serieService: SerieService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddExerciceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { exercice: Exercice; serieId: number; chapterId: number }
  ) { }
  hotspotsList = [];
  correctAnswerMode = false;
  displayedColumns: string[] = ['ordre', 'type', 'label', 'action'];
  hotspotImage = null;
  TYPES = Exercise_Types;
  BLOCKS: any[];
  dataSource: any[] = [];
  exerciceForm: any;
  difficultys = Difficulty;
  showdifficulty = false;
  order = 0;
  imageLoaded = false;
  showPreview = false;
  selectedExercice: Exercice;

  wordsSyllablesForm: FormGroup;
  // EDITOR CONFIGURATION
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Question generale',
    defaultParagraphSeparator: '',
    defaultFontName: 'arial',
    defaultFontSize: 'auto',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName',
        'fontSize',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };
  get formControls() {
    return this.exerciceForm?.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadTable();
    if (this.data.exercice) {
      this.data.exercice.blocks.forEach((block: ExerciceBlock) => {
        if (block.exerciceBlockType === ExerciceBlockTypes.INPUT_TEXT) {
          this.hotspotsList.push({
            y: parseFloat(block.label),
            x: parseFloat(block.placeholder),
            correctValue: block.correctValue
          });
        }
      });
    }
  }
  loadTable() {
    if (this.data.exercice) {
      this.dataSource = this.data.exercice.blocks;
    }
  }
  initForm() {
    this.hotspotImage = this.data.exercice?.blocks.find((block) => block.exerciceBlockType == 'IMAGE')?.value;
    this.exerciceForm = this.fb.group({
      type: [this.data.exercice?.type, [Validators.required]],
      name: [this.data.exercice?.name],
      file: [null],
      question: [this.data.exercice?.question, [Validators.required]],
      difficulty: ['NIVEAU1', [Validators.required]],
      imageName: [this.hotspotImage],
      rtl: [this.data?.exercice?.rtl ?? false]
    });
  }

  toggleEditor() {
    this.useEditor = !this.useEditor;
  }
  toggleEditorForQG() {
    this.useEditorQG = !this.useEditorQG;
  }

  openBlockDialog(element?: ExerciceBlock) {
    let BLOCK_FORM_ACCORDING_TO_TYPE: any;
    if (element.toString() === 'VERTICAL_EQUATION') BLOCK_FORM_ACCORDING_TO_TYPE = InitEquationFormComponent;
    else if (element.toString() === 'GENERAL_TABLES') BLOCK_FORM_ACCORDING_TO_TYPE = GeneralTablesBuilderComponent;
    else if (element.toString() === 'STROKE_WRONG_ANSWER') BLOCK_FORM_ACCORDING_TO_TYPE = VersionSelectorComponent;
    else if (element.toString() === 'STROKE_WRONG_WORD') BLOCK_FORM_ACCORDING_TO_TYPE = WordBuilderComponent;
    else if (element.toString() === 'TEXT_UNDER_IMAGE') BLOCK_FORM_ACCORDING_TO_TYPE = TextUnderImageBuilderComponent;
    else if (element.toString() === 'COMPOSITION_TABLE') BLOCK_FORM_ACCORDING_TO_TYPE = CompositionTableBuilderComponent;
    else if (element.toString() === 'SEPARATE_TEXT') BLOCK_FORM_ACCORDING_TO_TYPE = ParagraphBuilderComponent;
    else BLOCK_FORM_ACCORDING_TO_TYPE = AddBlockComponent;

    this.dialog
      .open(BLOCK_FORM_ACCORDING_TO_TYPE, {
        width: '70%',
        maxWidth: '70%',
        maxHeight: '100vh',
        panelClass: 'my-custom-dialog-class',
        data: {
          block: element,
          exercice_type: this.exerciceForm.get('type').value
        }
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          result.blockOrder = this.order++;
          this.dataSource = [...this.dataSource, result];
        }
      });
  }

  onSubmit() {
    let exercice;

    if (this.exerciceForm.get('type').value == 'HOTSPOT') {
      this.setHotspotExercice();

      exercice = {
        ...this.exerciceForm.value,
        blocks: this.dataSource
      };
    } else if (this.exerciceForm.get('type').value == 'DRAG_SYLLABLES') {
      this.setSyllablesExercice();

      exercice = {
        ...this.exerciceForm.value,
        blocks: this.dataSource
      };
    } else {
      exercice = {
        ...this.exerciceForm.value,
        blocks: this.dataSource
      };
    }
    if (this.exerciceForm.valid && this.checkBlocks()) {
      if (this.data.exercice) {
        this.serieService.updateExercice(exercice, this.data.exercice.ex_id).subscribe(async (res: Exercice) => {
          exercice.blocks.forEach((element, index) => {
            let files = [];
            console.log(files);

            if (element.imageFile) {
              files.push(element.imageFile);
            }
            if (element.audioFile) {
              files.push(element.audioFile);
            }
            if (files.length)
              this.serieService.addExerciceBlockFile(files, Number(res.blocks[index].exercice_Block_Id)).subscribe((resFileBlock) => {
                console.log(resFileBlock);
                console.log(files);
              });
          });
          if (this.exerciceForm.get('file').value !== null)
            (await this.serieService.uploadFile(this.exerciceForm.get('file').value, res.ex_id)).subscribe((res) => { });
          this.dialogRef.close(true);
        });
      } else {
        this.serieService.addExercice(exercice, this.data.serieId).subscribe(async (res: Exercice) => {
          exercice.blocks.forEach((element, index) => {
            let files = [];

            if (element.imageFile) {
              files.push(element.imageFile);
            }
            if (element.audioFile) {
              files.push(element.audioFile);
            }
            if (files.length)
              this.serieService.addExerciceBlockFile(files, Number(res.blocks[index].exercice_Block_Id)).subscribe((resFileBlock) => {
                console.log(resFileBlock);
                console.log(files);
              });
          });
          if (this.exerciceForm.get('file').value !== null)
            (await this.serieService.uploadFile(this.exerciceForm.get('file').value, res.ex_id)).subscribe((res) => { });
          this.dialogRef.close(true);
        });
      }
    }
  }
  setHotspotExercice() {
    this.dataSource = [];
    this.dataSource.push({
      blockOrder: 0,
      correctValue: '',
      exerciceBlockType: ExerciceBlockTypes.IMAGE,
      exercice_Block_Id: null,
      isAdmissable: null,
      label: '',
      placeholder: '',
      value: this.hotspotImage
    });

    this.hotspotsList.forEach((hotspot, index) => {
      this.dataSource.push({
        blockOrder: index + 1,
        correctValue: hotspot.correctValue,
        exerciceBlockType: ExerciceBlockTypes.INPUT_TEXT,
        exercice_Block_Id: null,
        isAdmissable: null,
        label: hotspot.y,
        placeholder: hotspot.x,
        value: ''
      });
    });
  }
  setSyllablesExercice() {
    this.dataSource = [];
    let i = 0;
    this.wordsSyllablesForm.value.words.forEach((word, index) => {
      let localWord = '';
      console.log('WORD', word.word);
      word.word.forEach((syllable) => {
        localWord += syllable.syllable + '/';
      });
      this.dataSource.push({
        blockOrder: index,
        correctValue: localWord,
        exerciceBlockType: ExerciceBlockTypes.INPUT_TEXT,
        exercice_Block_Id: null,
        isAdmissable: null,
        label: '',
        placeholder: '',
        value: ''
      });
    });
  }
  checkBlocks() {
    return this.dataSource.length > 0;
  }
  resetBlocks(type: any) {
    this.dataSource = [];
    if (type === Exercise_Types.FILL_LETTERS) {
      this.displayedColumns = ['ordre', 'value', 'correctValue', 'action'];
    } else {
      this.displayedColumns = ['ordre', 'type', 'label', 'action'];
    }
  }
  deleteBlock(element) {
    this.dataSource = this.dataSource.filter((item) => item !== element);
  }

  addPoint(event) {
    this.hotspotsList.push({
      x: event.offsetX / this.hotspotImg.nativeElement.offsetWidth,
      y: event.offsetY / this.hotspotImg.nativeElement.offsetHeight
    });
  }
  editPoint(index) {
    if (this.correctAnswerMode) {
      this.hotspotsList[index].correctValue == 'true' ? null : 'true';
    } else {
      this.hotspotsList.splice(index, 1);
    }
  }
  openPreview() {
    console.debug(this.formControls.valid);
    if (this.exerciceForm.get('type').value == Exercise_Types.HOTSPOT) {
      this.dataSource = [];
      this.dataSource.push({
        blockOrder: 0,
        correctValue: '',
        exerciceBlockType: ExerciceBlockTypes.IMAGE,
        exercice_Block_Id: null,
        isAdmissable: null,
        label: '',
        placeholder: '',
        value: this.hotspotImage
      });

      this.hotspotsList.forEach((hotspot, index) => {
        this.dataSource.push({
          blockOrder: index + 1,
          correctValue: hotspot.correctValue,
          exerciceBlockType: ExerciceBlockTypes.INPUT_TEXT,
          exercice_Block_Id: null,
          isAdmissable: null,
          label: hotspot.y,
          placeholder: hotspot.x,
          value: ''
        });
      });
    }
    const exercice = {
      ...this.exerciceForm.value,
      blocks: this.dataSource
    };
    if (this.exerciceForm.valid && this.checkBlocks()) {
      this.selectedExercice = _.cloneDeep(exercice);
      this.dialog
        .open(ExercicePreviewComponent, {
          width: '70%',
          maxWidth: '85%',
          maxHeight: '90vh',
          position: {
            top: '10%',
            left: '15%'
          },
          panelClass: 'my-custom-dialog-class',

          data: {
            currentExercise: this.selectedExercice
          }
        })
        .afterClosed()
        .subscribe((res) => {
          this.selectedExercice = exercice;
        });
    }
  }

  test() {
    console.log(this.wordsSyllablesForm.value);
  }
}
