import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {MbscDatetimeOptions} from "@mobiscroll/angular";
import {TaskService} from "../../services/task.service";
import {NewTaskForm} from "../daily-schedule/daily-schedule.component";
import {DialogMessageComponent} from "../dialog-message/dialog-message.component";

@Component({
  selector: 'app-comment-button',
  templateUrl: './comment-button.component.html',
  styleUrls: ['./comment-button.component.css']
})
export class CommentButtonComponent implements OnInit {

  msg:string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openForm() {
    console.log('opened');
    const dialogRef = this.dialog.open(MsgInputForm, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.openDialog();
    });
  }

  sendMessage() {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: {msg: 'Su mensaje ha sido enviado a Lila.'}
    });
  };

}

@Component({
  selector: 'msg-input',
  templateUrl: 'msg-input.html'
})
export class MsgInputForm {

  constructor(public dialogRef: MatDialogRef<MsgInputForm>,
              @Inject(MAT_DIALOG_DATA) public data){}

  sendMessage() {

  }

  close() {

  }

}

