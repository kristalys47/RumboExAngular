import { Component, OnInit } from '@angular/core';
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-messages-menu',
  templateUrl: './messages-menu.component.html',
  styleUrls: ['./messages-menu.component.css']
})
export class MessagesMenuComponent implements OnInit {

  messages: any;
  usr_id = sessionStorage.getItem('userid');

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.get_messages(this.usr_id).subscribe(data => {
      this.messages = data.Chats;
      console.log(this.messages);
    })
  }

}
