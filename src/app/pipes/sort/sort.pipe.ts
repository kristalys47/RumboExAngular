import { Pipe, PipeTransform } from '@angular/core';

interface Sort {
  // ascending or descending order
  direction: string,
  // value to sort by
  active: string
}

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(list: Array<any>, sort: Sort): any {
    console.log(list, sort);
    const data = list.slice();
    if (!sort.active || sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'department_name':
          return compare(a.department_name, b.department_name, isAsc);
        case 'grade':
          return compare(a.user_id, b.user_id, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a : number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
