import {Component, Input, OnInit} from '@angular/core';
import {MessagesService} from "../../services/messages.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  usr_id = sessionStorage.getItem('userid');
  chats: Array<any>;

  // @Input()
  chat: any;
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

}
