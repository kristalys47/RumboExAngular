import { Component } from '@angular/core';
import {CourseService} from "../../../services/course/course.service";

import {Store} from "@ngrx/store";
import * as fromRoot from '../../../store/reducers';
import {StudentService} from "../../../services/student/student.service";

@Component({
  selector: 'app-studentmain',
  templateUrl: './studentmain.component.html',
  styleUrls: ['./studentmain.component.css']
})
export class StudentmainComponent {

  student: any;
  courses: Array<any>;
  tasks: any;

  constructor(private studentService: StudentService,
              private courseService: CourseService,
              private store: Store<fromRoot.State>) {

  }

  ngOnInit() {

    // using services traditional way
    this.studentService.getStudent(0).subscribe(data => {
      this.student = data;
    });

    this.courseService.get_courses(this.student.id).subscribe(data => {
      this.courses = data;
    });

    // using the store

    // this.store.select('student').subscribe(data => {
    //   this.student = data.user;
    // });
    // this.store.select('course').subscribe(data => {
    //   this.courses = data.courses;
    // });
    // this.store.select('task').subscribe(data => {
    //   this.tasks = data.tasks;
    // });
  }

}
