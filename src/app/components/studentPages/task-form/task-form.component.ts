import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {TaskService} from "../../../services/task/task.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {MbscDatetimeOptions} from "@mobiscroll/angular";
import {CourseService} from "../../../services/course/course.service";
import {ErroralertService} from "../../../services/erroralert.service";
import {Task} from "../../../models/task";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  // If modal is opened from course page, input will be the course id
  // Else input will be null
  @Input() course: number;

  // When task is successfully inserted, task will be emitted to parent component
  @Output() taskEvent = new EventEmitter<Task>();

  current_user_id = sessionStorage.getItem('userid');

  tasks: Task[];

  newTask: Task = new Task();

  constructor(private dialog: MatDialog,
              private taskService: TaskService) { }

  ngOnInit() {
  }

  openForm() {
    console.log('opened');
    const dialogRef = this.dialog.open(FormModal, {
      width: '500px',
      data: { task: this.newTask, course: this.course }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed');
      console.log(result);
      this.newTask = new Task(); // cleaning data
      this.createTask(result);
    });
  }

  createTask(data) {
    console.log('data:', data);

    // If modal opened from course page, set type to 'study' and course id to input course id
    if(this.course) {
      data.type = 0;
      data.course = this.course;
    }

    // check the type of task
    // 0: study
    // 1: personal
    if(data.type == 1) {
      this.taskService.insert_personal_task(this.current_user_id, data)
        .then(res => {
          console.log(res);
          this.taskEvent.emit(data);
          // lo que se hace si registro el task, por ej un snack o modal
        })
        .catch(err => {console.log(err);});
    }
    else if (data.type == 0) {
      this.taskService.insert_study_task(this.current_user_id, data.course, data)
        .then(res => {
          console.log(res);
          this.taskEvent.emit(data);
        })
        .catch(err => {console.log(err);});
    }
  }

}

@Component({
  selector: 'form-modal',
  templateUrl: 'form-modal.html',
  styleUrls: ['./task-form.component.css']
})
export class FormModal {

  task: Task;

  courses;

  start_time: Date;
  end_time: Date;

  constructor(public dialogRef: MatDialogRef<FormModal>,
              private error: ErroralertService,
              private courseService: CourseService,
              @Inject(MAT_DIALOG_DATA) public data) {

    this.task = data.task;

    this.courseService.get_courses(sessionStorage.getItem('userid')).subscribe(data => {
      this.courses = data;
      console.log(this.courses);
      });
    }

  timeSettings:MbscDatetimeOptions = {
    touchUi: false,
    timeFormat: 'hh:ii A'
  };

  insertTask() {
    console.log(this.task);
    if(!this.task) {
      this.error.displaymessage('Enter valid data');
    }
    else if(!this.data.course && this.task.type == null) {
      this.error.displaymessage('The task needs a type');
    }
    else if(!this.data.course && this.task.type == 0 && this.task.course == null) {
      this.error.displaymessage('If it is a study task, it needs to belong to a course');
    }
    else if(this.task.title == null) {
      this.error.displaymessage('The task needs a name');
    }
    else if(this.task.start == null || this.start_time == null) {
      this.error.displaymessage('The task needs a starting time');
    }
    else if(this.task.end == null || this.end_time == null) {
      this.error.displaymessage('The task needs an ending time');
    }
    else {
      // concatenating starting date and time
      let start: Date = new Date(this.task.start);
      start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), this.start_time.getHours(), this.start_time.getMinutes());
      console.log(this.task.start, start.toUTCString());
      this.task.start = start.toUTCString();

      // concatenating ending date and time
      let end: Date = new Date(this.task.end);
      end = new Date(end.getFullYear(), end.getMonth(), end.getDate(), this.end_time.getHours(), this.end_time.getMinutes());
      this.task.end = end.toUTCString();

      this.error.hidemessage();
      if(this.task.description == null) {
        this.task.description = null;
      }

      // Close dialog and return task
      this.dialogRef.close(this.task);
    }
  }

}
