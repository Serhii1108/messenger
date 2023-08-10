import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  Chat,
  Message,
  SendMessageModel,
} from 'src/app/main/models/chat.model';
import { ChatSocketService } from 'src/app/main/services/chat-socket.service';
import { ChatService } from 'src/app/main/services/chat.service';

@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.scss'],
})
export class ActiveChatComponent implements AfterViewInit {
  @Input() chat: Chat | undefined | null;
  public sendFormControl: FormControl = new FormControl('');

  public get message(): string {
    return this.sendFormControl.value;
  }

  public constructor(
    private chatSocketService: ChatSocketService,
    public chatService: ChatService,
    private store: Store
  ) {}

  public sendMessage() {
    if (this.message.length && this.chat) {
      const message: Message = {
        senderId: this.chatService.getCurrUser.id,
        sendDate: new Date(),
        message: this.message,
        messageId: this.chat?.conversation.length,
        isSeen: false,
      };
      const sendMessage: SendMessageModel = {
        chatId: this.chat.id,
        message,
      };
      this.chatSocketService.sendMessage(sendMessage);
      this.sendFormControl.setValue('');
    }
  }

  public ngAfterViewInit(): void {
    const conversation: Element | null = document.querySelector('.messages');
    if (conversation) {
      conversation.scrollIntoView({
        inline: 'end',
        block: 'end',
      });
    }
  }
}
