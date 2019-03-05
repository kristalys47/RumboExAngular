import { Component, OnInit } from '@angular/core';
import {ErroralertService} from "../../../services/erroralert.service";
import {CourseService} from "../../../services/course/course.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";

interface Course {
  codification: string,
  section_num: string
}

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.css']
})
export class CourseSelectionComponent implements OnInit {

  courses: Course[] = new Array<Course>();
  newCourse: Course = {codification: '', section_num: ''};

  constructor(private courseService: CourseService, private auth: AuthService, private error: ErroralertService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    let user_id = sessionStorage.getItem('userid');
    let success: boolean = true;
    this.courses.forEach(course => {
      this.courseService.insert_course(user_id, course)
        .then(course => {console.log(course);})
        .catch(err => {
          success = false;
          console.log(err);
          this.error.displaymessage('An error occurred. Refresh page and try again.');
        });
    });
    // if success, all post methods were done without errors
    if(success) {
      this.router.navigate(['/studentlogin'])
        .then(result => {
          console.log(result);
          alert('Registration successful! You can now login.');
        })
        .catch(err => {console.log(err);});
    }
  }

  addCourse() {
    if(this.newCourse.codification.length != 8) {
      this.error.displaymessage('Enter a valid codification');
    }
    else if(this.newCourse.section_num.length != 4 && this.newCourse.section_num.length != 3) {
      this.error.displaymessage('Enter a valid section');
    }
    else {
      this.error.hidemessage();
      this.newCourse.codification = this.newCourse.codification.toUpperCase();
      this.courses.push(this.newCourse);
      this.newCourse = {codification: '', section_num: ''};
    }
  }

  remove(c: Course) {
    this.courses = this.courses.filter(course => {
      if(course != c) {return course;}
    });
  }

}
