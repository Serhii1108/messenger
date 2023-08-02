import { Component, Input } from '@angular/core';
import { Message } from 'src/app/main/models/chat.model';
import { ChatService } from 'src/app/main/services/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() messageItem: Message | undefined;

  public get isMyMessage(): boolean {
    return this.chatService.getCurrUser.id === this.messageItem?.senderId;
  }

  public constructor(private chatService: ChatService) {}
}
