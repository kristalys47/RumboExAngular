import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MbscDatetimeOptions, MbscEventcalendar, MbscEventcalendarOptions} from "@mobiscroll/angular";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DialogMessageComponent} from "../../dialog-message/dialog-message.component";

let preventSet;
let now = new Date();

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {

  @ViewChild("mbscMonthCal")
  monthCal: MbscEventcalendar;

  @ViewChild("mbscDayCal")
  dayCal: MbscEventcalendar;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  problemas: string[];

  problemasPsicologo = [
    'Tristeza', 'Ansiedad', 'Estres', 'Problemas con concentracion', 'Problemas familiares',
    'Problemas de pareja', 'Problemas de amistades'
  ];

  problemasConsejero = [
    'Buscar asesorias', 'Traslados', 'Identificar intereses vocacionales', 'Organizar el tiempo'
  ];

  appointment: {
    reasons: Array<string>,
    date: Date,
    comment: string
  } = {
    reasons: [], date: null, comment: null // tiene q estar inicializado
  };

  mentor: {
    name: string,
    role: string
  } = {
    name: 'Julio', role: 'counselor'
  };

  timeslots: Array<any> = [
    {
      start: new Date(now.getFullYear(), now.getMonth(), 4, 8),
      end: new Date(now.getFullYear(), now.getMonth(), 4, 9)
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

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.mentor.role = params['mentor'];
      });
    if (this.mentor.role == 'psychologist') {
      this.problemas = this.problemasPsicologo;
    }
    else if (this.mentor.role == 'counselor') {
      this.problemas = this.problemasConsejero;
    }
  }

  onChange(problem: string, isChecked: boolean) {
    if (isChecked) {
      this.appointment.reasons.push(problem)
    }
    else {
      this.appointment.reasons = this.appointment.reasons.filter(
        item => item !== problem);
    }
  }

  submit() {
    console.log(this.appointment);
    this.openDialog();
  };

  openDialog() {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: {msg: 'Su cita ha sido solicitada.'}
    });
  };


  navigate(inst, val) {
    if (inst) {
      inst.navigate(val);
    }
  };

  monthSettings: MbscEventcalendarOptions = {
        theme: 'ios',
        display: 'inline',
        view: {
            calendar: { type: 'month' }
        },
        onPageChange: (event, inst) => {
            if (!preventSet) {
                // this.navigate(this.dayCal.instance, event.date);
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

    },
    onEventSelect: (event, inst) => {
      console.log(event);
    }
  };
}
