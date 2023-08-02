import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Chat, Message, SendMessageModel } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService {
  private chat: Chat | undefined;

  constructor(private socket: Socket) {
    this.socket.on('messageStored', (message: string) => {
      console.log('message Stored:  ', message);
    });
  }

  public connect(chat: Chat | undefined) {
    this.chat = chat;
  }

  public sendMessage(message: Message) {
    if (this.chat) {
      const messageToSend: SendMessageModel = {
        message,
        chatId: this.chat?.id,
      };
      this.socket.emit('sendMessage', messageToSend);
    }
  }
}
