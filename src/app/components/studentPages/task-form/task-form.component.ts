import {Component, Inject, OnInit} from '@angular/core';
// import {NewTaskForm} from "../daily-schedule-mbsc-viejo/daily-schedule-mbsc-viejo.component";
import {TaskService} from "../../../services/task/task.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {MbscDatetimeOptions} from "@mobiscroll/angular";
import {CourseService} from "../../../services/course/course.service";
import {ErroralertService} from "../../../services/erroralert.service";
import {Task} from "../../../models/task";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  // templateUrl: './../modal/modal.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  current_user_id = sessionStorage.getItem('userid');

  tasks: Task[];

  constructor(private dialog: MatDialog,
              private taskService: TaskService) { }

  ngOnInit() {
  }

  openForm() {
    console.log('opened');
    const dialogRef = this.dialog.open(FormModal, {
      width: '500px',
      data: new Task()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed');
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
    if(data.type == 1) {
      this.taskService.insert_personal_task(this.current_user_id, data)
        .then((task) => {
          console.log(task);
          // lo que se hace si registro el task, por ej un snack o modal
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else if (data.type == 0) {
      this.taskService.insert_study_task(this.current_user_id, data.course, data);
    }
  }

}

@Component({
  selector: 'form-modal',
  templateUrl: 'form-modal.html',
  styleUrls: ['./task-form.component.css']
})
export class FormModal {

  constructor(public dialogRef: MatDialogRef<FormModal>, private error: ErroralertService,
              private courseService: CourseService,
              @Inject(MAT_DIALOG_DATA) public data) {

    this.courseService.get_courses(sessionStorage.getItem('userid')).subscribe(data => {
      this.courses = data;
      console.log(this.courses);
      });
    }


  courses;


  desktopSettings: MbscDatetimeOptions = {
    touchUi: false
  };

  insertTask() {
    console.log(this.data);
    if(!this.data) {
      this.error.displaymessage('Enter valid data');
    }
    else if(this.data.type == null) {
      this.error.displaymessage('The task needs a type');
    }
    else if(this.data.type == 0 && this.data.course == null) {
      this.error.displaymessage('If it is a study task, it needs to belong to a course');
    }
    else if(this.data.title == null) {
      this.error.displaymessage('The task needs a name');
    }
    else if(this.data.start == null) {
      this.error.displaymessage('The task needs a starting time');
    }
    else if(this.data.end == null) {
      this.error.displaymessage('The task needs an ending time');
    }
    else {
      this.error.hidemessage();
      if(this.data.description == null) {
        this.data.description = null;
      }
      this.dialogRef.close(this.data);
    }
  }

}
