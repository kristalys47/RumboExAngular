import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent {

  message: string;

  constructor(public dialogRef: MatDialogRef<DialogMessageComponent>,
              @Inject(MAT_DIALOG_DATA) public data){

    this.message = data.msg;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
