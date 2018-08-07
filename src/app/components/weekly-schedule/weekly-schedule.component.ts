import { Component, OnInit } from '@angular/core';
import { MbscEventcalendarOptions } from '@mobiscroll/angular';
import {TaskService} from "../../services/task.service";

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
  allTasks: any = [];

  labelDays: Array<any> = [];

  colorarray = ['#00aabb', '#8B0000', '#20B2AA', '#FFD700' ];

  constructor(private taskService: TaskService) {}


  ngOnInit() {

    this.loadTasks();

  }

  loadTasks() {

    this.taskService.get_study_tasks(this.current_user_id).subscribe(data => {
      this.studyTasks = data;
      this.mapStudyTaskToCalendar();
      console.log('study tasks:', this.studyTasks);
    }, data => {'No info'; });

    this.taskService.get_personal_tasks(this.current_user_id).subscribe(data => {
      this.personalTasks = data;
      this.mapPersonalTaskToCalendar();
      console.log('personal tasks:', this.personalTasks);
    }, data => {'No info'; });

    this.taskService.get_course_tasks(this.current_user_id).subscribe(data => {
      this.courseTasks = data;
      this.mapCourseTaskToCalendar();
      console.log('course tasks:', this.courseTasks);
    }, data => {'No info'; });


    // This is not official, is just for Display purposes

    this.taskService.get_all_task().subscribe(data => {
      this.allTasks = data;
      this.mapAllTaskToCalendar();
      console.log('all tasks:', this.allTasks);
    }, data => {'No info'; });

  }

  /*
  Lo ideal es que el color se le incerte como un parametro.
  No se hizo por que ya estamos en el dia final y eso implica bregar en la base de datos.
  */
  mapTasksToCalendar(task) {
    this.labelDays.push({
      d: new Date(task.start),
      text: task.title,
      color: this.colorarray[Math.floor(Math.random() * 5)],
      description: task.description
      // console.log(typeof task.start);
    });
  }

  mapStudyTaskToCalendar() {
    for (let task of this.studyTasks) {
      this.mapTasksToCalendar(task);
    }
  }


  mapPersonalTaskToCalendar() {
    for (let task of this.personalTasks) {
      this.mapTasksToCalendar(task);
    }
  }

  mapCourseTaskToCalendar() {
    for (let task of this.courseTasks) {
      console.log(task);
      this.mapTasksToCalendar(task);
    }
  }


  mapAllTaskToCalendar() {
    for (let task of this.allTasks) {
      console.log('Arrays de todo' + this.labelDays);
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
