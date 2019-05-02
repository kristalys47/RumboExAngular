import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../services/course/course.service';
import {GooglechartService} from '../../../services/googlechart.service';
// import {TaskCountService} from '../../services/task-count.service';
import {config} from 'rxjs';
import {nextMonthDisabled} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools';
import {ActivatedRoute} from "@angular/router";
import {Course, Grade, Status} from "../../../models/course";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  curr_student_id = sessionStorage.getItem('userid');

  courses: Array<Course> = new Array<Course>();

  google: any;
  personalTask = [];
  courseTask = [];
  appointmentTask = [];
  studyTask = [];

  constructor(private route: ActivatedRoute,
              private courseService: CourseService,
              private chartService: GooglechartService  ){
              // private taskCountService: TaskCountService) {
  }
// getChartValues() {
//        this.taskCountService.get_apppointment_tasks_count(this.curr_student_id).subscribe(data => {
//       this.appointmentTask = data;
//       console.log('count of appointment tasks:', this.appointmentTask[0][0]);
//     });
//     this.taskCountService.get_personal_tasks_count(this.curr_student_id).subscribe(data => {
//       this.personalTask = data;
//       console.log('count of personal tasks:', this.personalTask[0][0]);
//     });
//     this.taskCountService.get_study_tasks_count(this.curr_student_id).subscribe(data => {
//       this.studyTask = data;
//       console.log('count of study tasks:', this.studyTask[0][0]);
//       });
//     this.taskCountService.get_course_tasks_count(this.curr_student_id).subscribe( data => {
//       this.courseTask = data;
//       console.log('count of course tasks:', this.courseTask[0][0]);
//       });
//   }
  ngOnInit() {

    this.courseService.get_courses_with_grades(this.curr_student_id).subscribe(data => {
      this.courses = data;
      this.courses.forEach(course => {
        this.updateGradeStatus(course);
      });
      console.log(this.courses);
    });

    // todo
    // this.route.queryParams.subscribe(params => {
    //   this.courses = JSON.parse(params['courses']);
    //   console.log(params['courses']);
    // });

    // this.getChartValues();
    // this.courseService.get_courses(this.curr_student_id).subscribe(data => {
    //   data.map(course => {
    //     this.courses.push({
    //
    //     });
    //   });
    //   console.log('course:', this.courses);
    // });
    let data1 = [
      ['Task', 'Hours per Day'],
      // fix this
      // ['Personal', this.personalTask[0][0]],
      // ['Courses' , this.courseTask[0][0]],
      // ['Appointments', this.appointmentTask[0][0]],
      // ['Study', this.studyTask[0][0]],
      ['Personal', 2],
      ['Courses', 4],
      ['Appointments', 1],
      ['Study', 3]
    ];

    let config1 = {'pieHole': 0.4};
    let elementId1 = 'donutchart';
    this.chartService.buildPieChart(elementId1, data1, config1);

  }
  // get the current grade of a course
  // getGrade(course_id) {
  //   // this code is so ugly... i will clean it later
  //   let grades: Array<any>;
  //   this.courseService.get_grades_by_course_id(course_id).subscribe(data => {
  //     console.log(data);
  //     grades = data;
  //   });
  //   let final_grade = 0;
  //   if(grades != null) {
  //     console.log(grades, grades.length);
  //     for (let i = 0; i < grades.length; i++) {
  //       let g = grades[i];
  //       final_grade += g['grade'] / g['total'] * g['weight'];
  //     }
  //     console.log(course_id, grades.length, final_grade);
  //   }
  //   return final_grade;
  // }

  // get the status of a course by grade
  // the grade range should be determined later by counselors (we need to ask this)
  // this code will be fixed later on
  // getStatus(grade) {
  //   if (grade > 85) {
  //     return 'PASSING';
  //   }
  //   else if (grade > 70) {
  //     return 'SURVIVING';
  //   }
  //   else {
  //     return 'NOT PASSING';
  //   }
  // }

  /*
  * Given a set of grades, it will calculate the average.
  * The average takes into consideration the weight of each grade and divides the sum of the grades by the percentage of
  * the weight taken up to date.
  * */
  private calculateAverage(grades: Grade[]) {
    let avg: number = 0;
    let cummulative_weight: number = 0;
    console.log(grades);
    grades.forEach(grade => {
      if(grade.grade && grade.total) {
        // todo: calcular avg cuando no se tiene weight de la nota
        avg = avg + ((grade.grade / grade.total) * grade.weight);
        cummulative_weight = cummulative_weight + grade.weight;
      }
    });
    console.log((avg/cummulative_weight * 100).toFixed(2));
    return parseFloat((avg/cummulative_weight * 100).toFixed(2));
  }

  /*
  *  Given a set of grades, calculate the cummulative grade.
  *  The cummulative grade takes into consideration the weight of each grade, and only adds the grades up to date.
  * */
  private calculateCummulativeAverage(grades: Grade[]) {
    let avg: number = 0;
    grades.forEach(grade => {
      if(grade.grade && grade.total) {
        avg = avg + ((grade.grade / grade.total) * grade.weight);
      }
    });
    return parseFloat(avg.toFixed(2));
  }

  /*
  *  Given a number as the average of the grades, return the status on course.
  * */
  private getCourseStatus(avg: number) {
    if(avg >= 90) { return Status.Excellent; }
    else if(avg >= 80) { return Status.Passing; }
    else if(avg >= 75) { return Status.Surviving; }
    else if (avg >=0 ) { return Status.NotPassing; }
    else { return Status.Undefined; }
  }

  /*
  *   When component is initialized or the array of grades modified (a grade is added, deleted or edited),
  *   this methods recalculates the gpa and the course status
  * */
  private updateGradeStatus(course: Course) {
    course.general_average = this.calculateAverage(course.grades);
    course.status = this.getCourseStatus(course.general_average);
    course.cummulative_average = this.calculateCummulativeAverage(course.grades);
  }

}
