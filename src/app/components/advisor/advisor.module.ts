import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { AddChapterComponent } from './chapter-list/add-chapter/add-chapter.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatGridListModule } from '@angular/material/grid-list';
import { SerieCardComponent } from './chapter-list/add-chapter/serie-card/serie-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ExerciceModule } from '../exercice/exercice.module';
import { AdvisorRoutingModule } from './advisor-routing.module';
import {AddSerieComponent} from './chapter-list/add-chapter/add-serie/add-serie.component'
import { ExercicePreviewComponent } from './chapter-list/add-chapter/exercice-preview/exercice-preview.component';
import { CommentRejectionComponent } from './chapter-list/add-chapter/comment-rejection/comment-rejection.component';

const MATERIAL_MODULES = [
  MatGridListModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatTableModule,
  MatDividerModule,
  MatDialogModule,
  MatRippleModule,
  MatTooltipModule,
  MatSlideToggleModule
];
@NgModule({
  declarations: [CommentRejectionComponent,ExercicePreviewComponent,ChapterListComponent, AddChapterComponent, SerieCardComponent, AddSerieComponent],
  imports: [FormsModule,ExerciceModule,CommonModule, AdvisorRoutingModule, MATERIAL_MODULES, ReactiveFormsModule, NgxMatFileInputModule, TranslateModule.forChild({})]
})
export class AdvisorModule {}
