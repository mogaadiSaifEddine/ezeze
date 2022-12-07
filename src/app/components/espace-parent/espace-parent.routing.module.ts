import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspaceParentViewComponent } from './espace-parent-view/espace-parent-view.component';

const routes: Routes = [
  {
    path: '',
    component: EspaceParentViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EspaceParentRoutingModule { }