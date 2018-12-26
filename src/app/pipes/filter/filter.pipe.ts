import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  departments= [
    {num: 4321, name: 'Artes y Ciencias'},
    {num: 9987, name: 'Ciencias Agricolas'},
    {num: 1234, name: 'Ingenieria'},
    {num: 7856, name: 'Administracion de Empresas'}
  ];

  transform(value: Array<any>, filterValue: any): any {
    console.log(value, filterValue);
    // if filter value is all or no arguments are given, return all students
    if (!filterValue || filterValue == 'all') {
      return value;
    }
    else {
      return value.slice().filter((student) => {
        // keys in params are the attributes to be filtering
        for (let key in filterValue) {
          switch (key) {
            // if filtering name, return student if first letter of name is equal to value
            case('name' || 'alphabetical'):
              // if first letter of first name equals selected letter
              if (student.name[0].toLowerCase() == filterValue[key]) {
                return student;
              }
            case('department'):
              var dpt_num;
              this.departments.filter(d => {
                if (d.name == filterValue[key]) {
                  dpt_num = d.num;
                }
              });

              if (student.department_num == dpt_num) {
                return student;
              }
              // // check if
              // if (this.departments.some(d => {
              //   if (d.name == filterValue[key] && d.num == student.department_num) {
              //     console.log(student);
              //     return true;
              //   }
              // })) {
              //   return student;
              // }
              // )) {
              //   return student;
              // }
              // ;
            // return student;
            case('alert'):
              return;
            case('goals'):
              return;
            case('search'):
              console.log(filterValue[key]);
              var full_name = student.name+' '+student.lastname;
              if(full_name.toLowerCase().indexOf(filterValue[key]) >= 0) {
                return student;
              }
              return;
            default:
              return;
          }
        }
      });
    }
  }

}
