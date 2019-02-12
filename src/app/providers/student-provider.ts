import {Injectable} from "@angular/core";
import {Student} from "../models/student";
import {Course, Grade, Status} from "../models/course";
import {Task, Type} from "../models/task";
import {StudentService} from "../services/student/student.service";
import {CourseService} from "../services/course/course.service";
import {TaskService} from "../services/task/task.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StudentProvider {

  public student: Student = null;
  public courses: Course[] = [];
  public tasks: Task[] = [];

  public constructor(private studentService: StudentService,
                     private courseService: CourseService,
                     private taskService: TaskService) {}

  loadStudent(id: any): Promise<any> {
    // fetch student information
    this.studentService.getStudent(id).subscribe(data => {
      this.student = data;
    });

    // fetch student's courses
    this.courseService.get_courses(id).subscribe(data => {
      this.courses = data.forEach(course => {
        course.cummulative_average = this.calculateCummulativeAverage(course.grades);
        course.general_average = this.calculateAverage(course.grades);
        course.status = this.getCourseStatus(course.general_average);
      });
    });

    // fetch student's tasks
    this.taskService.get_course_tasks(id).subscribe(data => {
      data.forEach(task => {
        task.type = Type.Course;
        this.tasks.push(task);
      })
    });

    this.taskService.get_study_tasks(id).subscribe(data => {
      data.forEach(task => {
        task.type = Type.Study;
        this.tasks.push(task);
      })
    });

    this.taskService.get_personal_tasks(id).subscribe(data => {
      data.forEach(task => {
        task.type = Type.Personal;
        this.tasks.push(task);
      })
    });

    return new Promise((resolve, reject) => {
      if(this.student) resolve();
      else reject(Error);
    });
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  addGrade(grade: Grade, course_id: number) {
    this.courses.filter(course => {
      if(course.id==course_id) {
        course.grades.push(grade);
      }
    })
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
    return (avg * 100);
  }

  getCourseStatus(avg: number) {
    if(avg >= 90) {
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

}
