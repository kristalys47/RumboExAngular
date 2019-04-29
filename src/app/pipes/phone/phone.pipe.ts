import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if(value.length==10) {
      let areaCode = value.substring(0,2);
      let exchangeCode = value.substring(3,5);
      let subscriberNumber = value.substring(6,9);
      return (areaCode + '-' + exchangeCode + '-' + subscriberNumber);
    }
    return value;
  }

}
