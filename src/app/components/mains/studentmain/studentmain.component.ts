import { Component } from '@angular/core';
import {CourseService} from "../../../services/course/course.service";

import {StudentService} from "../../../services/student/student.service";
import {StudentProvider} from "../../../providers/student-provider";

@Component({
  selector: 'app-studentmain',
  templateUrl: './studentmain.component.html',
  styleUrls: ['./studentmain.component.css']
})
export class StudentmainComponent {

  curr_student_id = sessionStorage.getItem('userid');

  student: any;
  courses: Array<any>;
  tasks: any;

  constructor(private studentService: StudentService,
              private courseService: CourseService,
              private data: StudentProvider) {

  }

  ngOnInit() {

    this.data.loadStudent(this.curr_student_id);

    // this.studentService.getStudent(0).subscribe(data => {
    //   this.student = data;
    // });
    //
    // this.courseService.get_courses(this.student.id).subscribe(data => {
    //   this.courses = data;
    // });
  }

  doNothing($event) {
    console.log(event);
    $event.preventDefault();
  }

}
