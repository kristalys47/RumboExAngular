import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // hardcoded but need to get from database
  departments= [
    {num: 2, name: 'Artes y Ciencias'},
    {num: 3, name: 'Ciencias Agricolas'},
    {num: 4, name: 'Ingenieria'},
    {num: 1, name: 'Administracion de Empresas'}
  ];

  // list: array of students that is to be filtered
  // filterValue: dict where key is attribute to filter by, value is the item to look for; ex: {department: Ingenieria}
  transform(list: Array<any>, filterValue: any): any {
    console.log(list, filterValue);
    // if filter value is all or no arguments are given, return all students
    if (!filterValue || filterValue == 'all') {
      return list;
    }
    else {
      return list.slice().filter((student) => {
        // keys in params are the attributes to be filtering
        for (let key in filterValue) {
          switch (key) {
            // if filtering name, return student if first letter of name is equal to list
            case('name' || 'alphabetical'):
              // if first letter of first name equals selected letter
              if (student.name[0].toLowerCase() == filterValue[key]) {
                return student;
              }
            case('faculty'):
              if (student.faculty_name == filterValue[key]) {
                return student;
              }

              // var dpt_num;
              // this.departments.filter(d => {
              //   if (d.name == filterValue[key]) {
              //     dpt_num = d.num;
              //   }
              // });
              //
              // if (student.department_num == dpt_num) {
              //   return student;
              // }

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

            // to do
            case('alert'):
              return;

            // to do
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
