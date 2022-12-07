import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CouponsListComponent } from './coupons-list/coupons-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCouponComponent } from './coupons-list/add-coupon/add-coupon.component';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
  MatDatepickerModule,
  ClipboardModule
];

@NgModule({
  declarations: [AdminComponent, CouponsListComponent, AddCouponComponent],
  imports: [CommonModule, AdminRoutingModule, MATERIAL_MODULES, TranslateModule.forChild(), ReactiveFormsModule, QRCodeModule]
})
export class AdminModule {}
