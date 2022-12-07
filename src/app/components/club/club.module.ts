import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubService } from '../../service/club.service';
import { ClubRoutingModule } from './club-routing.module';
import { ClubComponent } from './club.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ClubCardComponent } from './club-list/club-card/club-card.component';
import { ClubFeedsComponent } from './club-feeds/club-feeds.component';
import { ClubFeedsCardComponent } from './club-feeds/club-feeds-card/club-feeds-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddPostModalComponent } from './club-feeds/add-post-modal/add-post-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ClubFeedCommentComponent } from './club-feeds/club-feeds-card/club-feed-comment/club-feed-comment.component';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { DeleteChangeComponent } from './club-feeds/add-post-modal/delete-change/delete-change.component';
import { MatSelectModule } from '@angular/material/select';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ClubSettingsCardComponent } from './club-feeds/club-settings-card/club-settings-card.component';
import { MatStepperModule } from '@angular/material/stepper';

const MaterialModules = [
  MatCardModule,
  MatPaginatorModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatInputModule,
  MatTooltipModule,
  MatTabsModule,
  MatGridListModule,
  MatSelectModule,
  MatStepperModule,
];
@NgModule({
  declarations: [
    ClubListComponent,
    ClubComponent,
    ClubCardComponent,
    ClubFeedsComponent,
    ClubFeedsCardComponent,
    AddPostModalComponent,
    ClubFeedCommentComponent,
    DeleteChangeComponent,
    ClubSettingsCardComponent,
  ],
  imports: [CommonModule, ClubRoutingModule, MaterialModules, PickerModule],
  providers: [ClubService],
})
export class ClubModule {}
