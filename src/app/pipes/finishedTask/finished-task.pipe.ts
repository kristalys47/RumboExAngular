import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'finishedTask'
})
export class FinishedTaskPipe implements PipeTransform {

  // args is a boolean variable; if true will return finished tasks, if false will return unfinished tasks
  transform(value: any, args?: any): any {
    return value.slice().filter((task) => {
      if(args.args == task.finished) {
        return task;
      }
    });
  }
}
