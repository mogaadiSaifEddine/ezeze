import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorrespondingArrowComponent } from '../exercice/exercice-types/corresponding-arrow/corresponding-arrow.component';
import { AquiredContentEvaluationComponent } from './aquired-content-evaluation/aquired-content-evaluation.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { CourseReminderComponent } from './course-reminder/course-reminder.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { RevisionComponent } from './revision.component';

const routes: Routes = [
  {
    path: '',
    component: RevisionComponent,
    children: [
      {
        path: 'aquired-content-evaluation',
        component: AquiredContentEvaluationComponent
      },
      {
        path: 'course-reminder',
        component: CourseReminderComponent
      },
      {
        path: 'matieres',
        component: ModuleListComponent
      },
      {
        path: 'chapitres',
        component: ChapterListComponent
      }
      // {
      //   path: 'aquired-content-evaluation',
      //   component: CorrespondingArrowComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionRoutingModule {}
