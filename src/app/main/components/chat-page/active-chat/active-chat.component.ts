import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Chat, Message } from 'src/app/main/models/chat.model';
import { ChatSocketService } from 'src/app/main/services/chat-socket.service';
import { ChatService } from 'src/app/main/services/chat.service';
import { chatActions } from 'src/app/store';

@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.scss'],
})
export class ActiveChatComponent {
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
      const updatedChat: Chat = {
        ...this.chat,
        conversation: [...this.chat.conversation, message],
      };

      this.chatSocketService.sendMessage(message);
      this.store.dispatch(chatActions.updateChat({ chat: updatedChat }));
      this.sendFormControl.setValue('');
    }
  }
}
