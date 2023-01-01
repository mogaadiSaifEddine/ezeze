import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterListComponent } from './chapter-list/chapter-list.component';

const routes: Routes = [
  {
    path: 'chapter-list',
    component: ChapterListComponent
  },
  { path: '**', redirectTo: 'chapter-list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule {}
