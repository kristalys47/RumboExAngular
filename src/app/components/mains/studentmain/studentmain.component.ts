import {Component, OnInit} from '@angular/core';
import {StudentProvider} from "../../../providers/student-provider";
import {StudentService} from "../../../services/student/student.service";
import {CourseService} from "../../../services/course/course.service";

@Component({
  selector: 'app-studentmain',
  templateUrl: './studentmain.component.html',
  styleUrls: ['./studentmain.component.css']
})
export class StudentmainComponent implements OnInit {

  curr_user_id = sessionStorage.getItem('userid');

  student: any;
  courses: Array<any>;
  tasks: any;

  constructor(private data: StudentProvider, private studentService: StudentService, private courseService: CourseService) {

  }

  ngOnInit() {

    console.log(this.curr_user_id);

    // this.student = this.data.student;

    // this.data.loadStudent(this.curr_user_id);
    // this.student = this.data.student;
    // this.data.loadStudent(this.curr_user_id).subscribe( data => {
    //     console.log(data);
    //     console.log(this.data.student);
    //     this.student = this.data.student;
    //     // this.courses = this.data.courses;
    //     // this.tasks = this.data.tasks;
    //   }
    // );

    // this.data.loadStudent(this.curr_user_id);
    // this.student = this.data.student;
    this.studentService.getStudent(this.curr_user_id).subscribe(data => {
      this.student = data;
    });
    console.log(this.student);

    this.courseService.get_courses(this.curr_user_id).subscribe(data => {
      this.courses = data;
      console.log(this.courses);
    });

  }

  doNothing($event) {
    console.log(event);
    $event.preventDefault();
  }

}
