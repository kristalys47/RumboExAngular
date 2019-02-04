import {Component, Inject, OnInit} from '@angular/core';
import {MbscEventcalendarOptions, mobiscroll} from '@mobiscroll/angular';
import { TaskService } from "../../services/task.service";
import {PopoverComponent} from "../popover/popover.component";

import {Observable} from "rxjs";
import {Store, State} from '@ngrx/store';
import {Student} from "../../models/student";
import {AppState} from "../../app.state";
import {NewCourseTaskForm} from "../individual-course/individual-course.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

// mobiscroll.settings = {
//     theme: 'web'
// };

var date = new Date();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {

  current_user_id = sessionStorage.getItem('userid');

  student: Observable<any>;

  studyTasks: any = [];
  personalTasks: any = [];
  courseTasks: any = [];

  labelDays: Array<any> = [];

  showModal: Boolean = false;

  constructor(private taskService: TaskService,
              private store: Store<AppState>,
              public dialog: MatDialog) {
    // this.student = store.select('student');
    // this.student.subscribe(data => {
    //   this.studyTasks = data.tasks.study;
    //   this.personalTasks = data.tasks.personal;
    //   this.mapPersonalTaskToCalendar();
    //   this.mapStudyTaskToCalendar();
    this.loadTasks();
  }


  ngOnInit() {

    // this.loadTasks();
    // this.addPersonalTask();

    $("button").click(function(){
      this.showModal = true;
      console.log(this.showModal);
    })

  }

  loadTasks() {

    this.taskService.get_study_tasks(this.current_user_id).subscribe(data => {
      this.studyTasks = data;
      console.log('study tasks:', this.studyTasks);
      this.mapStudyTaskToCalendar();
    });

    this.taskService.get_personal_tasks(this.current_user_id).subscribe(data => {
      this.personalTasks = data;
      this.mapPersonalTaskToCalendar();
      console.log('personal tasks:', this.personalTasks)
    });

    this.taskService.get_course_tasks(this.current_user_id).subscribe(data => {
      this.courseTasks = data;
      this.mapCourseTaskToCalendar();
      console.log('course tasks:', this.courseTasks);
      console.log(this.labelDays);
    });

  }

  mapTasksToCalendar(task) {
    // convert dates from string format to Date object
    let start = new Date(task.start);
    let end = new Date(task.end);
    this.labelDays.push({
      // d: date.now,
      start: start,
      end: end,
      text: task.title,
      color: '#00aabb',
      description: task.description
    });
  }

  mapStudyTaskToCalendar() {
    for(let task of this.studyTasks) {
      this.mapTasksToCalendar(task);
    }
  }

  mapPersonalTaskToCalendar() {
    for(let task of this.personalTasks) {
      this.mapTasksToCalendar(task);
    }
  }

  mapCourseTaskToCalendar() {
    for(let task of this.courseTasks) {
      this.mapTasksToCalendar(task);
    }
  }

  addPersonalTask() {
    this.taskService.insert_personal_task(
      this.current_user_id,
      {
        title: 'eat',
        description: 'because im hungry',
        start: 7,
        end: 8,
        finished: false
      }
    );
  }

  // openForm() {
  //   console.log('opened');
  //   const dialogRef = this.dialog.open(NewTaskForm,{
  //     // data: {course: this.course.course_name}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     this.createTask(result);
  //   });
  // }
  //
  // createTask(data) {
  //   console.log('data:', data);
  //   var title = data['title'];
  //   var description = data['description'];
  //   var start = data['start'];
  //   var end = data['end'];
  //   // var task = new Task(title, description, start, end, false);
  //   // console.log(task);
  //   // this.taskService.insert_study_task(data, this.curr_student_id, this.curr_course_id);
  //   // this.authService.insert_study_task(data, this.curr_student_id, this.curr_course_id);
  // }

  eventSettings: MbscEventcalendarOptions = {
        theme: 'ios',
        display: 'inline',
        eventBubble: true,
        layout: 'liquid',
        buttons: ['set'], // ?
        // showEventCount: true,
        view: {
          // calendar: { labels: true },
          // eventList: { type: 'week', size: 2 }
        }
    };

}

// @Component({
//   selector: 'new-task-form',
//   templateUrl: 'new-task-form.component.html'
// })
// export class NewTaskForm {
//
//   constructor(public dialogRef: MatDialogRef<NewTaskForm>,
//               private taskService: TaskService,
//               @Inject(MAT_DIALOG_DATA) public data){}
//
// }

