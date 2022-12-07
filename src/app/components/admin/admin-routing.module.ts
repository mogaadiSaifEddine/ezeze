import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponsListComponent } from './coupons-list/coupons-list.component';

const routes: Routes = [
  {
    path: 'coupons-list',
    component: CouponsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
