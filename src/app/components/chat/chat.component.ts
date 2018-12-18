import { Component, OnInit } from '@angular/core';
import {MessagesService} from "../../services/messages.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chat_id = 1;
  chat: any =
  {
    "chat_id": 1,
    "messages": [
      {
        "chat_id": 1,
        "date": "Sun, 25 Nov 2018 17:22:06 GMT",
        "m_id": 8,
        "sent_by": 54,
        "sent_to": 37,
        "text": "o date de baja"
      },
      {
        "chat_id": 1,
        "date": "Sun, 25 Nov 2018 17:00:37 GMT",
        "m_id": 3,
        "sent_by": 54,
        "sent_to": 37,
        "text": "tetas colgando"
      },
      {
        "chat_id": 1,
        "date": "Sun, 25 Nov 2018 17:00:37 GMT",
        "m_id": 4,
        "sent_by": 37,
        "sent_to": 54,
        "text": "tengo zika"
      },
      {
        "chat_id": 1,
        "date": "Sun, 25 Nov 2018 17:00:37 GMT",
        "m_id": 5,
        "sent_by": 54,
        "sent_to": 37,
        "text": "estudia desde el hospital"
      }
    ],
    // "receipient": "Vilma Santiago"
  };
  usr_id = sessionStorage.getItem('userid');

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    // this.messageService.get_messages(this.usr_id).subscribe(chats => {
    //   chats.map((chat) => {
    //     console.log(chat);
    //     if (chat.chat_id == this.chat_id) {
    //       this.chat = chat;
    //       console.log(this.chat);
    //     }
    //   });
    //   console.log('chat:', this.chat);
    // })
  }

}
