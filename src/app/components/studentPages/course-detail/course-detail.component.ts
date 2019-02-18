import {Component, OnInit, Inject, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../../../models/task';
import {TaskService} from '../../../services/task/task.service';
import {CourseService} from '../../../services/course/course.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


import {AuthService} from "../../../services/auth.service";
import {Student} from "../../../models/student";

@Component({
  selector: 'app-individual-course',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
// this whole code is so messy and ugly
// i will find the time to clean it... i promise :)
export class CourseDetailComponent implements OnInit {

  @Input() student: Student;

  curr_student_id: any = sessionStorage.getItem('userid');

  curr_course_id;

  course;

  grades: Array<any> = [];
  progress;

  sub;

  newGrade: {
    evaluation: any, date: any, weight: any, grade: any
  } = {evaluation: null, date: null, weight: null, grade: null}; // need to be initialized o si no tira error

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private courseService: CourseService,
              public dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.course = JSON.parse(params['course']);
      });

    this.courseService.get_course(this.course.id).subscribe(data => {
      if(data) {
        this.course = data;
        this.grades = this.course.grades;
        console.log('course:', this.course);
      }
    });

    // this.courseService.get_grades_by_course_id(this.curr_course_id).subscribe(data => {
    //   this.grades = data;
    //   console.log('grades:', this.grades);
    //   this.get_total_grade();
    // });
    //
    // this.taskService.get_study_tasks_by_course(this.curr_student_id, this.curr_course_id).subscribe(data => {
    //   data.map(task => {
    //       if (task['finished'] == false) {
    //         this.undoneTasks.push(task);
    //       }
    //       else {
    //         this.doneTasks.push(task);
    //       }
    //     }
    //   );
    //   console.log('tasks:', this.undoneTasks, this.doneTasks);
    // });
  }

  addGrade() {
    console.log(this.newGrade, this.grades);
    this.grades.push(this.newGrade);
    this.newGrade = {evaluation: null, date: null, weight: null, grade: null};
    console.log(this.newGrade);
  }

  checkTask(task: Task) {
    console.log(task.finished);
    task.finished = !task.finished;
    console.log(task.finished);
    console.log(this.course.tasks);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get_total_grade() {
    this.progress = 0;
    for(let i = 0; i < this.grades.length; i++) {
      let g = this.grades[i];
      this.progress += g['grade'] / g['total'] * g['weight'];
    }
    console.log('progress:', this.progress);
  }

  openForm() {
    console.log('opened');
    const dialogRef = this.dialog.open(NewCourseTaskForm,{
      data: {course: this.course.course_name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.createTask(result);
    });
  }

  createTask(data) {
    console.log('data:', data);
    var title = data['title'];
    var description = data['description'];
    var start = data['start'];
    var end = data['end'];
    // var task = new Task(title, description, start, end, false);
    // console.log(task);
    // this.taskService.insert_study_task(data, this.curr_student_id, this.curr_course_id);
    this.authService.insert_study_task(data, this.curr_student_id, this.curr_course_id);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}

@Component({
  selector: 'new-course-task-form',
  templateUrl: 'new-course-task-form.component.html'
})
export class NewCourseTaskForm {

  constructor(public dialogRef: MatDialogRef<NewCourseTaskForm>,
              private taskService: TaskService,
              @Inject(MAT_DIALOG_DATA) public data){}

}
