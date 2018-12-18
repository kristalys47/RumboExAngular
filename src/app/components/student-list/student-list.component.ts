import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../services/student.service";
import {Student} from "../../models/student";
import {MatTableDataSource, MatSort, Sort} from "@angular/material";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Array<Student>;
  filteredStudent: Array<Student>;
  sortedStudent: Array<Student>;

  displayedColumns: string[] = ['name', 'department_name', 'grade', 'email'];
  dataSource: MatTableDataSource<any>;

  departments = [
    {num: 4321, name: 'Artes y Ciencias'},
    {num: 9987, name: 'Ciencias Agricolas'},
    {num: 1234, name: 'Ingenieria'},
    {num: 7856, name: 'Administracion de Empresas'}
    // {'Artes y Ciencias':''},
    // {'Ciencias Agricolas':''},
    // {Ingenieria: 'Ingernieria de Computadoras'},
    // {'Administracion de Empresas':''}
  ];

  goals = ['Personales', 'Academicas', 'Profesionales', 'Otras'];

  goalData = [
    {name:'Lila Carrion', goal:'Aprobar examenes'},
    {name:'fer fer',goal:'Identificar area de estudio de interes'}
  ];

  alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  filteredData: any;

  selected: string = 'all';

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getstudentlist().subscribe(data => {
      this.students = data.Users;
      // this.dataSource = new MatTableDataSource(this.students);
      // this.dataSource.sort;
      this.filteredStudent = this.students.slice()
      this.sortedStudent = this.filteredStudent.slice();
    });
  }

  sortData(sort: Sort) {
    const data = this.filteredStudent.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedStudent = data;
      return;
    }

    this.sortedStudent = data.sort((a, b) => {
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

  searchData(filterValue: string) {
    this.filteredStudent = this.students.slice().filter((student) => {
      var full_name = student.name+' '+student.lastname;
      if(full_name.toLowerCase().indexOf(filterValue) >= 0) {
        return student;
      }
    });
    console.log(filterValue);
    this.sortData({active:'0',direction:'asc'});
    console.log(this.filteredStudent);
    console.log(this.sortedStudent);
  }

  filterData(params: any) {
    // if no arguments are given, return all students
    if(!params) {
      this.filteredStudent = this.students.slice();
    }
    else{
      console.log(params);
      const data = this.students.slice();
      this.filteredStudent = data.filter((student) => {
        // keys in params are the attributes to be filtering
        for(let key in params) {
          switch(key) {
            // if filtering name, return student if first letter of name is equal to value
            case('name' || 'alphabetical'):
              if(student.name[0].toLowerCase()==params[key]){
                return student;
              }
            case('department'):
              if (this.departments.some(d=>{
                if(d.name==params[key] && d.num==student.department_num){return true;}
              })) {return student;};
                // return student;
            case('alert'):
              return;
            case('goals'):
                return;
            default:
              return;
          }
        }
      });
    }
    this.sortData({active:'0',direction:'asc'});
    console.log(this.sortedStudent);
    console.log(this.filteredStudent);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

// function filterData() {
//
// }
