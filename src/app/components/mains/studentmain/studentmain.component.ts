import { Component } from '@angular/core';
import {StudentProvider} from "../../../providers/student-provider";

@Component({
  selector: 'app-studentmain',
  templateUrl: './studentmain.component.html',
  styleUrls: ['./studentmain.component.css']
})
export class StudentmainComponent {

  curr_user_id = sessionStorage.getItem('userid');

  student: any;
  courses: Array<any>;
  tasks: any;

  constructor(private data: StudentProvider) {

  }

  ngOnInit() {

    this.student = this.data.student;
    this.courses = this.data.courses;
    this.tasks = this.data.tasks;

  }

  doNothing($event) {
    console.log(event);
    $event.preventDefault();
  }

}
