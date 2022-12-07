import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardAvatar, MatCardModule } from '@angular/material/card';

const MATERIAL_MODULES = [MatFormFieldModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatListModule, MatIconModule, MatCardModule];
@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, ChatRoutingModule, MATERIAL_MODULES, ReactiveFormsModule]
})
export class ChatModule {}
