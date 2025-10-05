import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToTime'
})
export class StringToTimePipe implements PipeTransform {

  transform(time: string): string {
    const timeParts: string[] = time.split(':');

    const timeName = Number(timeParts[0]) > 12 ? 'PM' : 'AM';
    const hour = Number(timeParts[0]) % 12 || 12;
    return `${hour}:${timeParts[1]} ${timeName}`;
  }

}
