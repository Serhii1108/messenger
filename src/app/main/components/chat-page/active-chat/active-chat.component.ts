import { Component, Input } from '@angular/core';
import { Chat } from 'src/app/main/models/chat.model';

@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.scss'],
})
export class ActiveChatComponent {
  @Input() chat: Chat | undefined | null;
  public valueToSend = '';
}
