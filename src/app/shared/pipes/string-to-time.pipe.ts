import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToTime'
})
export class StringToTimePipe implements PipeTransform {

  transform(time: string): string {
    console.log('time', time);
    const timeParts: string[] = time.split(':');

    const timeName = Number(timeParts[0]) > 12 ? 'PM' : 'AM';
    const hour = Number(timeParts[0]) % 12 || 12;
    return `${hour}:${timeParts[1]} ${timeName}`;
  }

}
