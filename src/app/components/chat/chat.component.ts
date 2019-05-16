import {Component, Input, OnInit} from '@angular/core';
import {MessagesService} from "../../services/messages/messages.service";
import {ActivatedRoute} from "@angular/router";
import {Chat, Message} from "../../models/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  usr_id = parseInt(sessionStorage.getItem('userid'));
  chats: Array<Chat> = new Array<Chat>();

  // @Input()
  curr_chat_id: number;
  curr_chat: Chat;

  text: string = null;
  sub;

  constructor(private messageService: MessagesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.curr_chat_id = JSON.parse(params['chat_id']);
        console.log(this.curr_chat_id);
      });


    this.messageService.get_messages(this.usr_id).subscribe(data => {
      this.chats = data.Chats;

      // Find current (opened) chat in array of chats by chat_id
      this.curr_chat = this.chats.find(chat => chat.chat_id == this.curr_chat_id);

      // Once a chat is opened, set every unseen message to seen
      for (let message of this.curr_chat.messages) {

        // Only set to seen if message was not sent by current user
        if (message.sent_to == this.usr_id) {
          // Assuming messages are ordered by most recent to least recent, if a message is seen every message after that will be seen as well
          // todo: check if this is true
          if (message.seen) {break;}

          let data = {'msg_id': message.m_id};
          this.messageService.set_message_seen(this.usr_id, data);
        }
      }
    })
  }

  /*
  *   Send message to current chat
  * */
  sendMessage() {
    console.log(this.text);
    // if there is no written text, don't send message
    if(this.text == null) return;
    // current time
    let now: string = new Date().toUTCString();
    // create message object
    let msg: Message = new Message();
    msg.text = this.text;
    msg.sent_by = this.usr_id;
    msg.sent_to = this.curr_chat.contact.user_id;
    msg.date = now;
    msg.seen = false;
    console.log(msg);
    // post message to server
    this.messageService.insert_message(this.usr_id, msg)
      // if post is successful
      .then( res => {
        console.log(res);
        // add new message to message array
        this.curr_chat.messages.push(msg);
        // set text null for next message
        this.text = null;
      })
      .catch(err => {console.log(err);});
  }
}
