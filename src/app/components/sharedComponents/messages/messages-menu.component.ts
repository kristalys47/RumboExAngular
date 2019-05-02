import { Component, OnInit } from '@angular/core';
import {MessagesService} from "../../../services/messages.service";
import {Chat, Message} from "../../../models/message";

@Component({
  selector: 'app-messages-menu',
  templateUrl: './messages-menu.component.html',
  styleUrls: ['./messages-menu.component.css']
})
export class MessagesMenuComponent implements OnInit {

  usr_id = sessionStorage.getItem('userid');
  chats: Array<Chat> = new Array<Chat>();
  newMessages: number;

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.get_messages(this.usr_id).subscribe(data => {
      this.chats = data.Chats;
      this.newMessages = this.countNewMessages();
      console.log(this.chats);
    })
  }

  /*
  *   Returns the number of chats that have unopened messages
  *   Does not take into consideration how many new messages are inside a chat, only counts 1 per chat
  * */
  countNewMessages(): number {
    // if there are no new messages return 0
    let counter = 0;
    this.chats.forEach(chat => {
      // last message sent in chat
      let lastMessage: Message = chat.messages[chat.messages.length - 1];
      // if boolean seen is false, message hasn't been seen, add 1 to counter
      if (!lastMessage.seen) {counter++;}
    });
    console.log(counter);
    return counter;
  }

}
