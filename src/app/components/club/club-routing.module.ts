import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubFeedsComponent } from './club-feeds/club-feeds.component';
import { ClubComponent } from './club.component';

const routes: Routes = [
  {
    path: '',
    component: ClubComponent,
  },
  {
    path: 'club-feeds',
    component: ClubFeedsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubRoutingModule {}
