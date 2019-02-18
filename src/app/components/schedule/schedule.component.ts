import { Component, OnInit } from '@angular/core';
import {StudentProvider} from "../../providers/student-provider";
import {TaskService} from "../../services/task/task.service";
import {MbscEventcalendarOptions} from "@mobiscroll/angular";
import {ActivatedRoute} from "@angular/router";


let now = new Date();

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  current_user_id = sessionStorage.getItem('userid');

  view : 'day' | 'week' | 'month';

  events: Array<any> = [];

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private data: StudentProvider) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.view = JSON.parse(params['view']);
    });

    this.taskService.get_all().subscribe(tasks => {
      tasks.forEach(task => {
        this.mapTasksToCalendar(task);
      })
    })
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
      // additional variables
      description: task.description,
      type: task.type
    });
  }

  /*
  // Settings for schedule components
  */

  daySettings: MbscEventcalendarOptions = {
    theme: 'ios',
    display: 'inline',
    view: {
      calendar: { type: 'week' },
      eventList: { type: 'day' }
      }
  };

  weekSettings: MbscEventcalendarOptions = {
    theme: 'ios',
    display: 'inline',
    view: {
      eventList: { type: 'week' }
      }
  };

  monthSettings: MbscEventcalendarOptions = {
    theme: 'ios',
    display: 'inline',
    eventBubble: true,
    layout: 'liquid',
    // buttons: ['set'], // ?
    showEventCount: true,
    view: {
      calendar: {
        // labels: true
      },
      // eventList: { type: 'week', size: 2 }
    }
  };

}
