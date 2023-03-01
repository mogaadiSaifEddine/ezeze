import { NgModule } from '@angular/core';
import { MultipleChoiceComponent } from './exercice-types/multiple-choice/multiple-choice.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MultipleAnswersComponent } from './exercice-types/multiple-answers/multiple-answers.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TrueFalseComponent } from './exercice-types/true-false/true-false.component';
import { ShortResponseComponent } from './exercice-types/short-response/short-response.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FillEmptyFieldsComponent } from './exercice-types/fill-empty-fields/fill-empty-fields.component';
import { CorrespondenceComponent } from './exercice-types/correspondence/correspondence.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NumericComponent } from './exercice-types/numeric/numeric.component';
import { LikertScaleComponent } from './exercice-types/likert-scale/likert-scale.component';
import { WritingComponent } from './exercice-types/writing/writing.component';
import { SelectFromListComponent } from './exercice-types/select-from-list/select-from-list.component';
import { MatSelectModule } from '@angular/material/select';
import { SequencingComponent } from './exercice-types/sequencing/sequencing.component';
import { PassTestComponent } from './pass-test/pass-test.component';
import { ColorTheTextComponent } from './exercice-types/color-the-text/color-the-text.component';
import { ColorTheTextElementComponent } from './exercice-types/color-the-text/color-the-text-element/color-the-text-element.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragSyllablesComponent } from './exercice-types/drag-syllables/drag-syllables.component';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorPaletteElementComponent } from './exercice-types/color-the-text/color-palette-element/color-palette-element.component';

import { DragDropComponent } from './exercice-types/drag-drop/drag-drop.component';

import { DragWordsComponent } from './drag-words/drag-words.component';
import { HotspotComponent } from './exercice-types/hotspot/hotspot.component';
import { TranslateModule } from '@ngx-translate/core';
import { EspaceProfComponent } from './espace-prof/espace-prof.component';
import { CorrespondingArrowComponent } from './exercice-types/corresponding-arrow/corresponding-arrow.component';
import { DrawLinesComponent } from './exercice-types/corresponding-arrow/draw-lines/draw-lines.component';
import { LineAnchorDirective } from './exercice-types/corresponding-arrow/draw-lines/line-anchor.directive';
import { FalfoulComponent } from './falfoul/falfoul.component';
import { TextUnderImageComponent } from './exercice-types/tables/text-under-image/text-under-image.component';
import { InitEquationFormComponent } from './exercice-types/tables/vertical-equations/init-equation-form/init-equation-form.component';
import { EquationLayoutBuilderComponent } from './exercice-types/tables/vertical-equations/equation-layout-builder/equation-layout-builder.component';
import { EquationDisplayComponent } from './exercice-types/tables/vertical-equations/equation-display/equation-display.component';
// MEDIROE
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ListeningComponent } from './exercice-types/listening/listening.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralTablesBuilderComponent } from './exercice-types/tables/general-purpose-tables/general-tables-builder/general-tables-builder.component';
import { GeneralTablesTeacherStudentComponent } from './exercice-types/tables/general-purpose-tables/general-tables-teacher-student/general-tables-teacher-student.component';
import { GeneralTablesStudentDisplayComponent } from './exercice-types/tables/general-purpose-tables/general-tables-student-display/general-tables-student-display.component';
import { SentenceBuilderComponent } from './exercice-types/stroke-wrong-answer/stroke-sentence/sentence-builder/sentence-builder.component';
import { VersionSelectorComponent } from './exercice-types/stroke-wrong-answer/version-selector/version-selector.component';
import { StrokeAnswerDisplayComponent } from './exercice-types/stroke-wrong-answer/stroke-answer-display/stroke-answer-display.component';
import { WordBuilderComponent } from './exercice-types/stroke-wrong-answer/stroke-word/word-builder/word-builder.component';
import { ShapesGroupsBuilderComponent } from './exercice-types/stroke-wrong-answer/stroke-sentence/shapes-groups-builder/shapes-groups-builder.component';
import { TextUnderImageBuilderComponent } from './exercice-types/tables/text-under-image-builder/text-under-image-builder.component';
const MaterialModules = [
  MatButtonToggleModule,
  MatStepperModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatRadioModule,
  MatCheckboxModule,
  MatFormFieldModule,
  DragDropModule,
  MatSelectModule,
  MatButtonModule,
  MatTooltipModule,
  MatProgressSpinnerModule
];

import { FillLettersComponent } from './exercice-types/fill-letters/fill-letters.component';
import { CompositionTableBuilderComponent } from './exercice-types/tables/composition-table/composition-table-builder/composition-table-builder.component';
import { CompositionTableTeacherViewComponent } from './exercice-types/tables/composition-table/composition-table-teacher-view/composition-table-teacher-view.component';
import { CompositionTableStudentDisplayComponent } from './exercice-types/tables/composition-table/composition-table-student-display/composition-table-student-display.component';
import { ParagraphBuilderComponent } from './exercice-types/separate-text/paragraph-builder/paragraph-builder.component';
import { ParagraphDisplayComponent } from './exercice-types/separate-text/paragraph-display/paragraph-display.component';
import { ExerciseNotFoundComponent } from './exercise-not-found/exercise-not-found.component';
// DIRECTIVES
import { ResizeInputDirective } from 'src/app/directives/resize-input.directive';
import { WordDisplayComponent } from './exercice-types/stroke-wrong-answer/stroke-word/word-display/word-display.component';
@NgModule({
  imports: [
    MaterialModules,
    SharedModule,
    TranslateModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    AngularEditorModule,
    ReactiveFormsModule
  ],
  declarations: [
    DragSyllablesComponent,
    MultipleChoiceComponent,
    MultipleAnswersComponent,
    TrueFalseComponent,
    ShortResponseComponent,
    FillEmptyFieldsComponent,
    CorrespondenceComponent,
    NumericComponent,
    LikertScaleComponent,
    WritingComponent,
    SelectFromListComponent,
    SequencingComponent,
    PassTestComponent,
    ColorTheTextComponent,
    ColorTheTextElementComponent,
    ColorPaletteElementComponent,
    DragDropComponent,
    DragWordsComponent,
    HotspotComponent,
    EspaceProfComponent,
    CorrespondingArrowComponent,
    DrawLinesComponent,
    LineAnchorDirective,
    FalfoulComponent,
    ListeningComponent,
    TextUnderImageComponent,
    InitEquationFormComponent,
    EquationLayoutBuilderComponent,
    EquationDisplayComponent,
    GeneralTablesBuilderComponent,
    GeneralTablesTeacherStudentComponent,
    GeneralTablesStudentDisplayComponent,
    SentenceBuilderComponent,
    VersionSelectorComponent,
    StrokeAnswerDisplayComponent,
    WordBuilderComponent,
    ShapesGroupsBuilderComponent,
    TextUnderImageBuilderComponent,
    FillLettersComponent,
    CompositionTableBuilderComponent,
    CompositionTableTeacherViewComponent,
    CompositionTableStudentDisplayComponent,
    ParagraphBuilderComponent,
    ParagraphDisplayComponent,
    ExerciseNotFoundComponent,
    ResizeInputDirective,
    WordDisplayComponent
  ],
  providers: [],
  exports: [
    DragSyllablesComponent,
    MultipleChoiceComponent,
    MultipleAnswersComponent,
    TrueFalseComponent,
    ShortResponseComponent,
    FillEmptyFieldsComponent,
    CorrespondenceComponent,
    NumericComponent,
    LikertScaleComponent,
    WritingComponent,
    SelectFromListComponent,
    SequencingComponent,
    PassTestComponent,
    ColorTheTextComponent,
    ColorTheTextElementComponent,
    ColorPaletteElementComponent,
    DragDropComponent,
    DragWordsComponent,
    HotspotComponent,
    EspaceProfComponent,
    CorrespondingArrowComponent,
    DrawLinesComponent,
    LineAnchorDirective,
    FalfoulComponent,
    TextUnderImageComponent,
    InitEquationFormComponent,
    EquationDisplayComponent,
    GeneralTablesStudentDisplayComponent,
    StrokeAnswerDisplayComponent,
    FillLettersComponent,
    ParagraphDisplayComponent,
    CompositionTableStudentDisplayComponent,
    ResizeInputDirective,
    WordDisplayComponent

  ]
})
export class ExerciceModule { }
