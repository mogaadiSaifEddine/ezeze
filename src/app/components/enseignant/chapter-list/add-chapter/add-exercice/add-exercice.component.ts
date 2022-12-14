import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercice } from 'src/app/model/Exercice';
import { ExerciceBlock } from 'src/app/model/ExerciceBlock';
import { Types } from 'src/app/model/Exercice_type';
import { AddBlockComponent } from './add-block/add-block.component';
import { SerieService } from 'src/app/services/serie.service';
import { Difficulty } from 'src/app/model/Difficulty';
import { ExerciceBlockTypes } from 'src/app/model/ExerciceBlockTypes';
import { ExercicePreviewComponent } from './exercice-preview/exercice-preview.component';

@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.scss']
})
export class AddExerciceComponent implements OnInit {
  @Output() chapterId: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('hotspotImg') hotspotImg;
  currentExercice:Exercice
  constructor(
    private serieService: SerieService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddExerciceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { exercice: Exercice; serieId: number; chapterId: number }
  ) {}
  hotspotsList=[]
  correctAnswerMode=false;
  displayedColumns: string[] = ['ordre', 'type', 'label', 'action'];
  hotspotImage=null
  TYPES = Types;
  BLOCKS: any[];
  dataSource: any[] = [];
  exerciceForm: any;
  difficultys = Difficulty;
  showdifficulty = false;
  order = 0;
  imageLoaded=false;
  showPreview=false;
  selectedExercice:Exercice;
  ngOnInit(): void {
    this.initForm();
    this.loadTable();
    if(this.data.exercice){
      this.data.exercice.blocks.forEach((block: ExerciceBlock) => {
        if(block.exerciceBlockType === ExerciceBlockTypes.INPUT_TEXT){
          this.hotspotsList.push({
            y:parseFloat(block.label),
            x:parseFloat(block.placeholder),
            correctValue:block.correctValue
          })
  
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
    this.hotspotImage= this.data.exercice?.blocks.find(block=>block.exerciceBlockType=="IMAGE")?.value;
    this.exerciceForm = this.fb.group({
      type: [this.data.exercice?.type, [Validators.required]],
      name: [this.data.exercice?.name],
      file: [''],
      question: [this.data.exercice?.question, [Validators.required]],
      difficulty: ['NIVEAU1', [Validators.required]],
      imageName:[this.hotspotImage],
      rtl: [this.data?.exercice?.rtl ?? false]
    });
  }

  openBlockDialog(element?: ExerciceBlock) {
    const dialog = this.dialog.open(AddBlockComponent, {
      width: '700px',
      maxWidth: '700px',
      maxHeight: '100vh',
      // position: {
      //   top: '5%',
      //   left: '10%'
      // },
      panelClass: 'my-custom-dialog-class',

      data: {
        block: element,
        exercice_type: this.exerciceForm.get('type').value
      }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        result.blockOrder = this.order++;
        this.dataSource = [...this.dataSource, result];
      }
    });
  }

  onSubmit() {
    let exercice
    if(this.exerciceForm.get('type').value=='HOTSPOT'){
      this.dataSource = [];
      this.dataSource.push({
        blockOrder:0,
        correctValue:"",
        exerciceBlockType:ExerciceBlockTypes.IMAGE,
        exercice_Block_Id:null,
        isAdmissable: null,
        label : "",
        placeholder:"",
        value:this.hotspotImage
      })

      this.hotspotsList.forEach((hotspot,index)=>{
        this.dataSource.push({
          blockOrder:index+1,
          correctValue:hotspot.correctValue,
          exerciceBlockType:ExerciceBlockTypes.INPUT_TEXT,
          exercice_Block_Id:null,
          isAdmissable: null,
          label : hotspot.y,
          placeholder:hotspot.x,
          value:""
        })
      })
      exercice = {
        ...this.exerciceForm.value,
        blocks: this.dataSource
      };
    }else{
      
      exercice = {
        ...this.exerciceForm.value,
        blocks: this.dataSource
      };
    }
    if (this.exerciceForm.valid && this.checkBlocks()) {
      if (this.data.exercice) {
        this.serieService.updateExercice(exercice, this.data.exercice.ex_id).subscribe(async (res: Exercice) => {
          if (this.exerciceForm.get('file').value !== null) (await this.serieService.uploadFile(this.exerciceForm.get('file').value, res.ex_id)).subscribe((res) => {});
          this.dialogRef.close(true);
          this.dialogRef.close();
        });
      } else {     
        this.serieService.addExercice(exercice, this.data.serieId).subscribe(async (res: Exercice) => {

          if (this.exerciceForm.get('file').value !== null) (await this.serieService.uploadFile(this.exerciceForm.get('file').value, res.ex_id)).subscribe((res) => {});
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
  resetBlock(event) {
    this.dataSource = [];
  }
  deleteBlock(element) {
    this.dataSource = this.dataSource.filter((item) => item !== element);
  }

  addPoint(event){
    this.hotspotsList.push({
      x:event.offsetX/this.hotspotImg.nativeElement.offsetWidth,
      y:event.offsetY/this.hotspotImg.nativeElement.offsetHeight,
    })
  }
  editPoint(index){
    if(this.correctAnswerMode){
      this.hotspotsList[index].correctValue == 'true'?this.hotspotsList[index].correctValue =null:this.hotspotsList[index].correctValue = 'true';
    }else{
      this.hotspotsList.splice(index,1)
    }
  }
  openPreview(){
    let exercice
    if(this.exerciceForm.get('type').value=='HOTSPOT'){
      this.dataSource = [];
      this.dataSource.push({
        blockOrder:0,
        correctValue:"",
        exerciceBlockType:ExerciceBlockTypes.IMAGE,
        exercice_Block_Id:null,
        isAdmissable: null,
        label : "",
        placeholder:"",
        value:this.hotspotImage
      })

      this.hotspotsList.forEach((hotspot,index)=>{
        this.dataSource.push({
          blockOrder:index+1,
          correctValue:hotspot.correctValue,
          exerciceBlockType:ExerciceBlockTypes.INPUT_TEXT,
          exercice_Block_Id:null,
          isAdmissable: null,
          label : hotspot.y,
          placeholder:hotspot.x,
          value:""
        })
      })
      exercice = {
        ...this.exerciceForm.value,
        blocks: this.dataSource
      };
    }else{
      
      exercice = {
        ...this.exerciceForm.value,
        blocks: this.dataSource
      };
    }
    if (this.exerciceForm.valid && this.checkBlocks()) {

      const dialog =this.selectedExercice = exercice
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
