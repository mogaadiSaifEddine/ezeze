import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
@Pipe({
  name: 'fileGetter'
})
export class FileGetterPipe implements PipeTransform {
  transform(path: string): string {
    return environment.serverApi + path;
  }
}
