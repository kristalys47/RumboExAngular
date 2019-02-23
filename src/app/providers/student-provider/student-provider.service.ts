import { Injectable } from '@angular/core';
import {Student} from "../../models/student";
import {Course} from "../../models/course";
import {Task} from '../../models/task';
import {StudentService} from "../../services/student/student.service";
import {CourseService} from "../../services/course/course.service";
import {TaskService} from "../../services/task/task.service";

@Injectable({
  providedIn: 'root'
})
export class StudentProviderService {

  private id = sessionStorage.getItem('userid');

  public student: Student = null;
  public courses: Course[] = [];
  public tasks: Task[] = [];

  constructor(private studentService: StudentService,
              private courseService: CourseService,
              private taskService: TaskService) {



  }

  loadStudent(id: any): Promise<any> {
    let promise =  new Promise((resolve, reject) =>{
      this.studentService.getStudent(this.id).subscribe(data => {
        this.student = data;
        console.log(this.student);
        if(this.student) resolve('resolved');
        else reject('Oops! Something happened... Data was not loaded correctly.')
      });
      console.log(this.student);

    })
      .then(
        (data) => {console.log(data);},
        (err) => {console.log(err);}
      );
    console.log(promise);
    return promise;
  }

  // loadData(id: any): Promise<any> {
  //
  // }

}
