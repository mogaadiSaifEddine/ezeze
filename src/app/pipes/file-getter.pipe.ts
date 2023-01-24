import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
@Pipe({
  name: 'fileGetter'
})
export class FileGetterPipe implements PipeTransform {
  transform(path: string): string {
    console.log(environment.serverApi + path);

    return environment.serverApi + path;
  }
}
