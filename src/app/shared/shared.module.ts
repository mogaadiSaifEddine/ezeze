import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FileGetterPipe } from '../pipes/file-getter.pipe';
import { AngMusicPlayerModule } from 'ang-music-player';
// import { NgxAudioPlayerModule } from 'ngx-audio-player';

@NgModule({
  declarations: [FileGetterPipe],
  imports: [CommonModule, TranslateModule.forChild({})],
  exports: [FileGetterPipe]
})
export class SharedModule {}
