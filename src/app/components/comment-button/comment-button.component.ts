import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {MbscDatetimeOptions} from "@mobiscroll/angular";
import {TaskService} from "../../services/task/task.service";
import {DialogMessageComponent} from "../dialog-message/dialog-message.component";
import {MessagesService} from "../../services/messages/messages.service";
import {Message} from "../../models/message";

@Component({
  selector: 'app-comment-button',
  templateUrl: './comment-button.component.html',
  styleUrls: ['./comment-button.component.css']
})
export class CommentButtonComponent implements OnInit {

  usr_id = sessionStorage.getItem('userid');
  text: string;

  constructor(public dialog: MatDialog, private messagesService: MessagesService) { }

  ngOnInit() {
  }

  openForm(send_msg_to_id: number) {
    console.log('opened');
    const dialogRef = this.dialog.open(MsgInputForm, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.sendMessage(send_msg_to_id, result.text);
      // this.openDialog();
    });
  }

  sendMessage(send_msg_to_id, text) {
    // if there is no written text, don't send message
    if (text == null) return;
    // current time
    let now: string = new Date().toUTCString();
    // create message object
    let msg: Message = new Message();
    msg.text = text;
    msg.sent_by = Number(this.usr_id);
    msg.sent_to = send_msg_to_id;
    msg.date = now;
    msg.seen = false;
    console.log(msg);
    this.messagesService.insert_message(this.usr_id, msg)
      .then(res => {
        console.log(res);
        // set text to null for next message
        this.text = null;
        // open success dialog
        this.openDialog();
      })
      .catch(err => {console.log(err);});
    // this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: {msg: 'Your message has been sent'}
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

