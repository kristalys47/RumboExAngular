import { Component, OnInit } from '@angular/core';
import { MbscEventcalendarOptions } from '@mobiscroll/angular';
import {TaskService} from "../../../services/task/task.service";
import {StudentProvider} from "../../../providers/student-provider";

let now = new Date();

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.css']
})

export class WeeklyScheduleComponent implements OnInit {

  current_user_id = sessionStorage.getItem('userid');

  studyTasks: any = [];
  personalTasks: any = [];
  courseTasks: any = [];

  events: Array<any> = [];

  constructor(private taskService: TaskService, private data: StudentProvider) { }

  ngOnInit() {

    // this.loadTasks();

    this.events = this.data.tasks;
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
    // convert dates from string format to Date object
    let start = new Date(task.start);
    let end = new Date(task.end);
    this.events.push({
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

    eventSettings: MbscEventcalendarOptions = {
        theme: 'ios',
        display: 'inline',
        view: {
            eventList: { type: 'week' }
        }
    };
}
