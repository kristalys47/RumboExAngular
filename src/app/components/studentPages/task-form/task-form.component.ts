import {Component, Inject, OnInit} from '@angular/core';
// import {NewTaskForm} from "../daily-schedule-mbsc-viejo/daily-schedule-mbsc-viejo.component";
import {TaskService} from "../../../services/task/task.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {MbscDatetimeOptions} from "@mobiscroll/angular";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  // templateUrl: './../modal/modal.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  current_user_id = sessionStorage.getItem('userid');

  constructor(private dialog: MatDialog,
              private taskService: TaskService) { }

  ngOnInit() {
  }

  openForm() {
    console.log('opened');
    const dialogRef = this.dialog.open(FormModal, {
      width: '500px',
      data: {}
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
    // this.events.push({
    //   d: start,
    //   text: title,
    //   color: '#00aabb',
    //   description: description
    // });
    this.taskService.insert_personal_task(this.current_user_id, data)
      .then((task) => {
      console.log(task);
      // lo que se hace si registro el task, por ej un snack o modal
    })
    .catch((err) => {
      console.log(err);
    });
  }

}

@Component({
  selector: 'form-modal',
  templateUrl: 'form-modal.html',
  styleUrls: ['./task-form.component.css']
})
export class FormModal {

  constructor(public dialogRef: MatDialogRef<FormModal>,
              // private taskService: TaskService,
              @Inject(MAT_DIALOG_DATA) public data){}

  desktopSettings: MbscDatetimeOptions = {
    touchUi: false
  };

  insertTask() {

  }

}
