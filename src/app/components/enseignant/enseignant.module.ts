import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnseignantRoutingModule } from './enseignant-routing.module';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { AddChapterComponent } from './chapter-list/add-chapter/add-chapter.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AddExerciceComponent } from './chapter-list/add-chapter/add-exercice/add-exercice.component';
import { AddBlockComponent } from './chapter-list/add-chapter/add-exercice/add-block/add-block.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddSerieComponent } from './chapter-list/add-chapter/add-serie/add-serie.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
  declarations: [ChapterListComponent, AddChapterComponent, SerieCardComponent, AddExerciceComponent, AddBlockComponent, AddSerieComponent],
  imports: [CommonModule, EnseignantRoutingModule, MATERIAL_MODULES, ReactiveFormsModule, NgxMatFileInputModule, TranslateModule.forChild({})]
})
export class EnseignantModule {}
