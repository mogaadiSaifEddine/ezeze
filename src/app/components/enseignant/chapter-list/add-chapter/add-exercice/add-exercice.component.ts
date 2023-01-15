import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.scss']
})
export class AddExerciceComponent implements OnInit {
  @Output() chapterId: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('hotspotImg') hotspotImg;
  currentExercice: Exercice;
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
      file: [''],
      question: [this.data.exercice?.question, [Validators.required]],
      difficulty: ['NIVEAU1', [Validators.required]],
      imageName: [this.hotspotImage],
      rtl: [this.data?.exercice?.rtl ?? false]
    });
  }

  openBlockDialog(element?: ExerciceBlock) {
    let BLOCK_FORM_ACCORDING_TO_TYPE: any;
    if (['VERTICAL_EQUATION'].includes(element.toString()))
      BLOCK_FORM_ACCORDING_TO_TYPE = InitEquationFormComponent;
    else if (element.toString() === "GENERAL_TABLES")
      BLOCK_FORM_ACCORDING_TO_TYPE = GeneralTablesBuilderComponent;
    else
      BLOCK_FORM_ACCORDING_TO_TYPE = AddBlockComponent;

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
      .afterClosed().subscribe((result) => {
        if (result) {
          result.blockOrder = this.order++;
          this.dataSource = [...this.dataSource, result];
        }
      });
  }

  onSubmit() {
    if (this.exerciceForm.get('type').value == 'HOTSPOT') {
      this.dataSource = [];
      this.dataSource.push({
        blockOrder: 0,
        correctValue: '',
        exerciceBlockType: ExerciceBlockTypes.IMAGE,
        exercice_Block_Id: null,
        isAdmissable: null,
        label: '',
        placeholder: '',
        blockParams: "{'ee':'55'}",
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
      if (this.data.exercice) {
        this.serieService.updateExercice(exercice, this.data.exercice.ex_id).subscribe(async (res: Exercice) => {
          if (this.exerciceForm.get('file').value !== null)
            (await this.serieService.uploadFile(this.exerciceForm.get('file').value, res.ex_id)).subscribe((res) => { });
          this.dialogRef.close(true);
        });
      } else {
        this.serieService.addExercice(exercice, this.data.serieId).subscribe(async (res: Exercice) => {
          console.log(res);

          let files = [];
          exercice.blocks.forEach((element, index) => {
            if (element.imageFile) {
              files.push(element.imageFile);
            }
            if (element.audioFile) {
              files.push(element.audioFile);
            }
            if (files.length)
              this.serieService
                .addExerciceBlockFile(files, Number(res.blocks[index].exercice_Block_Id))
                .subscribe((resFileBlock) => console.log(resFileBlock));
          });
          if (this.exerciceForm.get('file').value !== null)
            (await this.serieService.uploadFile(this.exerciceForm.get('file').value, res.ex_id)).subscribe((res) => { });
          this.dialogRef.close(true);
        });
      }
    }
  }

  checkBlocks() {
    if (this.dataSource.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  resetBlocks() {
    this.dataSource = [];
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
      this.hotspotsList[index].correctValue == 'true'
        ? (this.hotspotsList[index].correctValue = null)
        : (this.hotspotsList[index].correctValue = 'true');
    } else {
      this.hotspotsList.splice(index, 1);
    }
  }
  openPreview() {
    if (this.exerciceForm.get('type').value == 'HOTSPOT') {
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
      this.selectedExercice = exercice;
      this.dialog.open(ExercicePreviewComponent, {
        width: '70%',
        maxWidth: '70%',
        maxHeight: '70%',
        position: {
          top: '10%',
          left: '15%'
        },
        panelClass: 'my-custom-dialog-class',

        data: {
          currentExercise: this.selectedExercice
        }
      });
    }
  }
}
