import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FileGetterPipe } from '../pipes/file-getter.pipe';
import { SelectImageComponent } from './select-image/select-image.component';
// import { NgxAudioPlayerModule } from 'ngx-audio-player';

@NgModule({
  declarations: [FileGetterPipe, SelectImageComponent],
  imports: [CommonModule, TranslateModule.forChild({})],
  exports: [FileGetterPipe]
})
export class SharedModule {}
