import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hms'
})
export class HmsPipe implements PipeTransform {

  transform(value: number): string {
    const hours = value/1000/60/60;
    const mins = value/1000/60%60;
    const secs = value/1000%60;
    return `${Math.floor(hours)}h ${Math.floor(mins)}m ${Math.floor(secs)}s`;
  }

}
