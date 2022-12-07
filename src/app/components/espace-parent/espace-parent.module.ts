import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EspaceParentRoutingModule } from './espace-parent.routing.module';
import { EspaceParentViewComponent } from './espace-parent-view/espace-parent-view.component';
import { AddVoucherComponent } from './dialogs/add-voucher/add-voucher.component'
import { AddNewComponent } from './dialogs/student-forms/add-new/add-new.component'
import { ViewEditComponent } from './dialogs/student-forms/view-edit/view-edit.component';
import { DeleteConfirmationComponent } from 'src/app/components/espace-parent/dialogs/delete-confirmation/delete-confirmation.component';
import { TokenDetailsComponent } from 'src/app/components/espace-parent/dialogs/token-details/token-details.component';

// MATERIAL
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';



const MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatStepperModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [
    EspaceParentViewComponent,
    AddVoucherComponent,
    AddNewComponent,
    ViewEditComponent,
    DeleteConfirmationComponent,
    TokenDetailsComponent
  ],
  imports: [
    CommonModule,
    EspaceParentRoutingModule,
    MATERIAL_MODULES,
    ReactiveFormsModule,
    TranslateModule.forChild({})
  ],
  providers: [DatePipe]
})

export class EspaceParentModule { }