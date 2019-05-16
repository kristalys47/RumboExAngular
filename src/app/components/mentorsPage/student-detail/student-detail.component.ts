import {Component, Input, OnInit} from '@angular/core';
import {Student} from "../../../models/student";
import {Course, Grade, Status} from "../../../models/course";
import {Task} from '../../../models/task';
import {StudentService} from "../../../services/student/student.service";
import {CommentButtonComponent} from "../../comment-button/comment-button.component";
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../../services/course/course.service";
import {TaskService} from "../../../services/task/task.service";

interface StudentDetail {
  student: Student,
  courses: Course[],
  tasks: Task[]
}


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  student: Student;
  courses: Array<Course>;
  tasks: Array<Task>;

  // student: Student;
  // @Input() student: StudentDetail;

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private courseService: CourseService,
              private taskService: TaskService,
              private commentComponent: CommentButtonComponent) {
    // console.log(this.student);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        let student_id = JSON.parse(params['student']);
        this.studentService.getStudent(student_id).subscribe(data => {
          this.student = data;
          console.log(this.student);
        });
        this.courseService.get_courses_with_grades(student_id).subscribe(data => {
          this.courses = data;
          this.setCourseAvgAndStatus();
          console.log(this.courses);
        });
        this.taskService.get_tasks(student_id).subscribe(data => {
          this.tasks = data;
          console.log(this.tasks);
        })
      });
    // this.studentService.getStudent().subscribe(data => {
    //   this.student = data;
    // })
    console.log(this.student);
  }

  comment() {
    this.commentComponent.openForm(this.student.user_id);
  }

  private setCourseAvgAndStatus() {
    this.courses.forEach(course => {
      let avg: number = 0;
      let cummulative_weight: number = 0;
      course.grades.forEach(grade => {
        if(grade.grade && grade.total) {
          // todo: calcular avg cuando no se tiene weight de la nota
          avg = avg + ((grade.grade / grade.total) * grade.weight);
          cummulative_weight = cummulative_weight + grade.weight;
        }
      });
      course.general_average = parseFloat((avg/cummulative_weight * 100).toFixed(2));
      if(course.general_average >= 90) { course.status = Status.Excellent; }
      else if(course.general_average >= 80) { course.status = Status.Passing; }
      else if(course.general_average >= 75) { course.status = Status.Surviving; }
      else if (course.general_average >=0 ) { course.status = Status.NotPassing; }
      else { course.status = Status.Undefined; }
    });
    let gpa = 0, total_credits = 0;
    this.courses.forEach(course => {
      if(!course.credits) course.credits=3;
      total_credits+= course.credits;
      let points: number = 0;
      if(course.general_average>=90) {points=4;}
      else if(course.general_average>=80) {points=3;}
      else if(course.general_average>=70) {points=2;}
      else if(course.general_average>=60) {points=1;}
      gpa+= (points * course.credits);
    });
    this.student.gpa = gpa / total_credits;
  }
}
