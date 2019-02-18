import { Component, OnInit } from '@angular/core';
import {GooglechartService} from "../../services/googlechart.service";

@Component({
  selector: 'app-time-management-pie-chart',
  templateUrl: './time-management-pie-chart.component.html',
  styleUrls: ['./time-management-pie-chart.component.css']
})
export class TimeManagementPieChartComponent implements OnInit {

  constructor(private chartService: GooglechartService) { }

  ngOnInit() {
    let data1 = [
      ['Task', 'Hours per Day'],
      // fix this
      // ['Personal', this.personalTask[0][0]],
      // ['Courses' , this.courseTask[0][0]],
      // ['Appointments', this.appointmentTask[0][0]],
      // ['Study', this.studyTask[0][0]],
      ['Personal', 0],
      ['Courses', 0],
      ['Appointments', 0],
      ['Study', 0]
    ];

    let config1 = {'pieHole': 0.4};
    let elementId1 = 'donutchart';
    this.chartService.buildPieChart(elementId1, data1, config1);
  }

}
