import { NgModule } from '@angular/core';
import { RevisionComponent } from './revision.component';
import { RevisionRoutingModule } from './revision-routing.module';
import { RevisionService } from '../../services/revision.service';
import { ExerciceModule } from '../exercice/exercice.module';
import { AquiredContentEvaluationComponent } from './aquired-content-evaluation/aquired-content-evaluation.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CourseReminderComponent } from './course-reminder/course-reminder.component';
import { MatCardModule } from '@angular/material/card';
import { ShowCourseComponent } from './course-reminder/show-course/show-course.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ShowConceptMapComponent } from './aquired-content-evaluation/show-concept-map/show-concept-map.component';

import { MainScreenComponent } from './aquired-content-evaluation/main-screen/main-screen.component';
import { ScoreScreenComponent } from './aquired-content-evaluation/score-screen/score-screen.component';

import { AchievementScreenComponent } from './aquired-content-evaluation/achievement-screen/achievement-screen.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TranslateModule } from '@ngx-translate/core';
import { ModuleListComponent } from './module-list/module-list.component';

import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { ModuleCardComponent } from './module-list/module-card/module-card.component';
import { ChapterCardComponent } from './chapter-list/chapter-card/chapter-card.component';
import { SharedModule } from '@coreui/angular';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

const MatModules = [MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatTooltipModule, MatProgressBarModule,MatProgressSpinnerModule];

@NgModule({
  imports: [RevisionRoutingModule, ExerciceModule, CommonModule, MatModules, TranslateModule, SharedModule, NgxExtendedPdfViewerModule],
  declarations: [
    RevisionComponent,
    AquiredContentEvaluationComponent,
    CourseReminderComponent,
    ShowCourseComponent,
    ShowConceptMapComponent,
    MainScreenComponent,
    ScoreScreenComponent,
    AchievementScreenComponent,
    ModuleListComponent,
    ChapterListComponent,
    ModuleCardComponent,
    ChapterCardComponent
  ],
  providers: [RevisionService]
})
export class RevisionModule { }
