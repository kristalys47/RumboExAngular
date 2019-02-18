import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import {StudentProvider} from "../../providers/student-provider";

@Component({
  selector: 'app-student-courses-table',
  templateUrl: './student-courses-table.component.html',
  styleUrls: ['./student-courses-table.component.css']
})
export class StudentCoursesTableComponent implements OnInit {

  @Input() courseSelectDisabled: boolean;

  courses;

  constructor(private courseService: CourseService, private data: StudentProvider) { }

  ngOnInit() {
    // this.courseService.get_courses(0).subscribe(data => {
    //   this.courses = data;
    // });
    this.courses = this.data.courses;
  }

}
