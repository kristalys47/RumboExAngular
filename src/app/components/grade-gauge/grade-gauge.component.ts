import {Component, Input, OnInit} from '@angular/core';
import {GooglechartService} from "../../services/googlechart.service";
import {Student} from "../../models/student";

@Component({
  selector: 'app-grade-gauge',
  templateUrl: './grade-gauge.component.html',
  styleUrls: ['./grade-gauge.component.css']
})
export class GradeGaugeComponent implements OnInit {

  @Input() grades: { general: any, cummulative: any, status: any };

  // progress: number = 80;

  constructor(private chartService: GooglechartService) { }

  ngOnInit() {
    this.buildGauge();

    if(this.grades.general == 'null') {
      this.grades.general = 'N/A';
    }

  }

  buildGauge() {
    // current grade
    let data1 = [ ['Label', 'Value'], ['', 80] ];
    // projected grade
    let data2 = [ ['Label', 'Value'], ['', 80] ];

    let options = {
      // width: 400, height: 120,
      // animation.duration: 1000,
      redFrom: 0, redTo: 50,
      yellowFrom: 50, yellowTo: 70,
      greenFrom: 70, greenTo: 100,
      majorTicks: ['10', '20', '30', '40', '50', '60', '70', '80', '90'],
      minorTicks: 2
    };

    this.chartService.buildGauge('gauge1', data1, options);
    this.chartService.buildGauge('gauge2', data2, options);
  }

}

//  $(window).resize(function(){
//   this.chartService.buildGauge('gauge1', data1, options);
//   this.chartService.buildGauge('gauge2', data2, options);
// });
