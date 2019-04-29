import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentNum'
})
export class StudentNumPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value.length == 9) {
      let area = value.substring(0,3);
      let year = value.substring(3,5);
      let number = value.substring(5);
      return (area + '-' + year + '-' + number);
    }
    return value;
  }

}
