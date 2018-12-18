import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MbscEventcalendar, MbscEventcalendarOptions} from "@mobiscroll/angular";

let preventSet, now = new Date();

@Component({
  selector: 'app-psychologist-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class PsychologistFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  problemas = [
    'Tristeza', 'Ansiedad', 'Estres', 'Problemas con concentracion', 'Problemas familiares',
    'Problemas de pareja', 'Problemas de amistades', 'Otros'
  ];

  problemasConsejero = [
    'Buscar asesorias', 'Traslados', 'Identificar intereses vocacionales', 'Organizar el tiempo'
  ];

  timeslots: Array<any> = [
    {
      start: new Date(now.getFullYear(), now.getMonth(), 28, 8),
      end: new Date(now.getFullYear(), now.getMonth(), 28, 9)
    },
    {
      start: new Date(now.getFullYear(), now.getMonth(), 30, 8),
      end: new Date(now.getFullYear(), now.getMonth(), 30, 9)
    },
    {
      start: new Date(now.getFullYear(), now.getMonth(), 29, 12),
      end: new Date(now.getFullYear(), now.getMonth(), 29, 13)
    },
    {
      start: new Date(now.getFullYear(), now.getMonth()+1, 2, 8),
      end: new Date(now.getFullYear(), now.getMonth()+1, 2, 9)
    }
  ];

  constructor() { }

  ngOnInit() {
  }


  @ViewChild('mbscMonthCal')
  monthCal: MbscEventcalendar;

  @ViewChild('mbscDayCal')
  dayCal: MbscEventcalendar;

  navigate(inst, val) {
    if (inst) {
      inst.navigate(val);
    }
  };

  eventSettings: MbscEventcalendarOptions = {
        display: 'inline',
        view: {
            calendar: { type: 'month' }
        },
        onEventSelect: (event, inst) => {
          if (!preventSet) {
            this.navigate(this.dayCal.instance, event.date)
          }
          preventSet = false;
        }
    };

  daySettings: MbscEventcalendarOptions = {
    display: 'inline',
    view: {
      eventList: { type: 'day' }
    },
    onPageChange: (event, inst) => {
      preventSet = true;
      this.navigate(this.monthCal.instance, event.firstDay);

    }
  };

}
