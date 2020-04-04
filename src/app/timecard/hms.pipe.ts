import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';

@Pipe({
  name: 'hms'
})
export class HmsPipe implements PipeTransform {

  transform(value: number, hoursOnly?: boolean): string {
    const hours = value/1000/60/60;
    const mins = value/1000/60%60;
    const secs = value/1000%60;
    if (hoursOnly) {
      return formatNumber(hours, 'en-US', '1.0-2');
    }
    return `${Math.floor(hours)}h ${Math.floor(mins)}m ${Math.floor(secs)}s`;
  }

}
