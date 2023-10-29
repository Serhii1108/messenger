import { AfterViewInit, Component, Input } from '@angular/core';
import { Message } from 'src/app/main/models/chat.model';
import { ChatService } from 'src/app/main/services/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements AfterViewInit {
  @Input() messageItem: Message | undefined;

  public get isMyMessage(): boolean {
    return this.chatService.getCurrUser.id === this.messageItem?.senderId;
  }

  public constructor(private chatService: ChatService) {}

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
