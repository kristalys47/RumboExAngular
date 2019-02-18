import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'finishedTask'
})
export class FinishedTaskPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.slice().filter((task) => {
      if(args.args == task.finished) {
        return task;
      }
    });
  }
}
