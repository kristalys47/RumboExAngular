import {Component, Input, OnInit} from '@angular/core';
import {MessagesService} from "../../services/messages.service";
import {ActivatedRoute} from "@angular/router";
import {Chat, Message} from "../../models/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  usr_id = sessionStorage.getItem('userid');
  chats: Array<any>;

  // @Input()
  chat: Chat;
  text: string;
  sub;

  constructor(private messageService: MessagesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.chat = JSON.parse(params['chat']);
        console.log(this.chat);
      });

    // this.messageService.get_messages(this.usr_id).subscribe(chats => {
    // chats.map((chat) => {
    //   console.log(chat);
    //   if (chat.chat_id == this.chat_id) {
    //     this.chat = chat;
    //     console.log(this.chat);
    //   }
    // });
    // console.log('chat:', this.chat);
    //     this.chats = chats;
    //     console.log(this.chats);
    //   })
    // }

  }

  sendMessage() {
    // if there is no written text, don't send message
    if(this.text == null) return;
    let now: string = new Date().toUTCString();
    // create message object
    let msg: Message = new Message();
    msg.text = this.text;
    msg.sent_by = Number(this.usr_id);
    msg.sent_to = this.chat.contact.user_id;
    msg.date = now;
    msg.seen = false;
    console.log(msg);
    // post message to server
    this.messageService.insert_message(this.usr_id, msg)
      // if post is successful
      .then( res => {
        console.log(res);
        // add new message to message array
        this.chat.messages.push(msg);
        // set text null for next message
        this.text = null;
      })
      .catch(err => {console.log(err);});
  }
}
