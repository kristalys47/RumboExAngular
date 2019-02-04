import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MbscEventcalendarOptions, MbscDatetimeOptions, mobiscroll, MbscEventcalendar} from '@mobiscroll/angular';
import {TaskService} from "../../services/task.service";
// import {NewCourseTaskForm} from "../individual-course/individual-course.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Task} from "../../models/task";
import {NewCourseTaskForm} from "../individual-course/individual-course.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.state";

import {Observable} from "rxjs";
import {Student} from "../../models/student";
// import {StudentState} from "../../store2/reducers/student.reducer";


let now = new Date();
let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css']
})

export class DailyScheduleComponent  implements OnInit {

  @ViewChild('mbscList')
  list: MbscEventcalendar;

  // student: Observable<StudentState>;

  current_user_id = sessionStorage.getItem('userid');

  studyTasks: any = [];
  personalTasks: any = [];
  courseTasks: any = [];

  events: Array<any> = [];

  navigate(inst, val) {
        if (inst) {
            inst.navigate(val);
        }
    };

  constructor(private taskService: TaskService,
              public dialog: MatDialog,
              private store: Store<AppState>) {

    // this.student = store2.select('student');
    // this.student.subscribe(data => {
    //   this.studyTasks = data.student.tasks.study;
    //   this.personalTasks = data.student.tasks.personal;
    //   this.mapPersonalTaskToCalendar();
    //   this.mapStudyTaskToCalendar();
    // })
}

  ngOnInit() {

    // this.loadTasks();
    console.log(now.getDate(), tomorrow);
    this.navigate(this.list.instance, tomorrow);

  }

  loadTasks() {

    this.taskService.get_study_tasks(this.current_user_id).subscribe(data => {
      this.studyTasks = data;
      this.mapStudyTaskToCalendar();
      console.log('study tasks:', this.studyTasks)
    });

    this.taskService.get_personal_tasks(this.current_user_id).subscribe(data => {
      this.personalTasks = data;
      this.mapPersonalTaskToCalendar();
      console.log('personal tasks:', this.personalTasks)
    });

    this.taskService.get_course_tasks(this.current_user_id).subscribe(data => {
      this.courseTasks = data;
      this.mapCourseTaskToCalendar();
      console.log('course tasks:', this.courseTasks)
    });

  }

  mapTasksToCalendar(task) {
    this.events.push({
      d: now,
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


    eventSettings: MbscEventcalendarOptions = {
        theme: 'ios',
        display: 'inline',
        view: {
          calendar: { type: 'week' },
          eventList: { type: 'day' }
        }
    };


}

@Component({
  selector: 'new-task-form',
  templateUrl: 'new-task-form.component.html'
})
export class NewTaskForm {

  constructor(public dialogRef: MatDialogRef<NewTaskForm>,
              private taskService: TaskService,
              @Inject(MAT_DIALOG_DATA) public data){}

  desktopSettings: MbscDatetimeOptions = {
    touchUi: false
  };

}
