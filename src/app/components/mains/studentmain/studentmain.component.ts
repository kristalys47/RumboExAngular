import {Component, OnInit} from '@angular/core';
import {StudentProvider} from "../../../providers/student-provider";
import {StudentService} from "../../../services/student/student.service";
import {CourseService} from "../../../services/course/course.service";
import {Course, Grade, Status} from "../../../models/course";
import {Student} from "../../../models/student";
import {StudentProviderService} from "../../../providers/student-provider/student-provider.service";

@Component({
  selector: 'app-studentmain',
  templateUrl: './studentmain.component.html',
  styleUrls: ['./studentmain.component.css']
})
export class StudentmainComponent implements OnInit {

  curr_user_id = sessionStorage.getItem('userid');

  student: Student;
  courses: Array<Course>;
  tasks: any;

  constructor(private studentProvider: StudentProviderService, private data: StudentProvider, private studentService: StudentService, private courseService: CourseService) {

  }

  ngOnInit() {

    console.log(this.curr_user_id);

    // this.studentProvider.loadStudent(this.curr_user_id).then(() => {
    //   this.student = this.studentProvider.student;
    // }).catch((err) => {console.log(err);});

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
      // this.studentService.student = data;
      this.student = data;
      console.log(this.student);

    });

    this.courseService.get_courses(this.curr_user_id).subscribe(data => {
      this.courses = data;
      this.courses.forEach(course => {
        course.general_average = this.calculateAverage(course.grades);
        course.status = this.getCourseStatus(course.general_average);
        course.cummulative_average = this.calculateCummulativeAverage(course.grades);
      });
      console.log(this.courses);
    });

  }

  calculateAverage(grades: Grade[]) {
    let avg: number = 0;
    let cummulative_weight: number = 0;
    grades.forEach(grade => {
      avg = avg + ((grade.grade / grade.total) * grade.weight);
      cummulative_weight = cummulative_weight + grade.weight;
    });
    return (avg/cummulative_weight * 100);
  }

  calculateCummulativeAverage(grades: Grade[]) {
    let avg: number = 0;
    grades.forEach(grade => {
      avg = avg + ((grade.grade / grade.total) * grade.weight);
    });
    return (avg);
  }

  getCourseStatus(avg: number) {
    if(avg == null) {
      return Status.Undefined;
    }
    else if(avg >= 90) {
      return Status.Excellent;
    }
    else if(avg >=80) {
      return Status.Passing;
    }
    else if(avg >=75) {
      return Status.Surviving;
    }
    else {
      return Status.NotPassing;
    }
  }

  doNothing($event) {
    console.log(event);
    $event.preventDefault();
  }

}
