import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
import { chatActions } from 'src/app/store';

import { Chat, SendMessageModel } from '../models/chat.model';
import {
  CHECK_STATUS_INTERVAL,
  socketEvents,
} from '../components/chat-page/constance';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService {
  private chats: Chat[] = [];

  constructor(
    private chatService: ChatService,
    private socket: Socket,
    private store: Store
  ) {
    this.handleUpdateChat();
    this.handleOnlineStatus();
    this.handleMessagesRead();
  }

  public connect(chat: Chat | undefined) {
    if (chat && this.chats.indexOf(chat) === -1) {
      this.chats.push(chat);
      this.socket.connect();
      this.socket.emit(socketEvents.JOIN_ROOM, {
        roomName: chat.id,
      });
    }
  }

  public sendMessage({ message, chatId }: SendMessageModel) {
    this.socket.emit(socketEvents.SEND_MESSAGE, { message, chatId });
  }

  public async markMessagesAsRead() {
    const chat: Chat = this.chats.filter((item) =>
      this.chatService.isActiveChat(item)
    )[0];

    await this.socket.emit(socketEvents.MARK_MESSAGES_AS_READ, {
      roomName: chat.id,
      userId: this.chatService.getCurrUser.id,
    });
  }

  private handleMessagesRead() {
    this.socket.on(socketEvents.MESSAGES_READ, (payload: { chat: Chat }) => {
      const chat: Chat = this.chats.filter((item) => {
        return item.id === payload.chat.id;
      })[0];
      this.chats[this.chats.indexOf(chat)] = payload.chat;

      this.store.dispatch(chatActions.updateChat({ chat: payload.chat }));

      if (this.chatService.isActiveChat(payload.chat)) {
        this.store.dispatch(chatActions.setActiveChat({ chat: payload.chat }));
      }

      localStorage.setItem('activeChatMessagesRead', 'true');
    });
  }

  private handleUpdateChat() {
    this.socket.on(socketEvents.SHARE_MESSAGE, (payload: SendMessageModel) => {
      const chat: Chat = this.chats.filter(
        (item) => item.id === payload.chatId
      )[0];

      if (chat) {
        const updatedChat: Chat = {
          ...chat,
          conversation: [...chat.conversation, payload.message],
        };
        this.store.dispatch(chatActions.updateChat({ chat: updatedChat }));

        if (this.chatService.isActiveChat(chat)) {
          this.store.dispatch(chatActions.setActiveChat({ chat: updatedChat }));
        }
        localStorage.setItem('activeChatMessagesRead', 'false');

        this.chats[this.chats.indexOf(chat)] = updatedChat;
      }
    });
  }

  private async handleOnlineStatus() {
    this.socket.on(socketEvents.CHAT_ONLINE, (payload: { chatId: string }) => {
      const chat: Chat = this.chats.filter(
        (item) => item.id === payload.chatId
      )[0];

      this.updateChatStatus(chat, true);
    });

    this.socket.on(socketEvents.CHAT_OFFLINE, (payload: { chatId: string }) => {
      const chat: Chat = this.chats.filter(
        (item) => item.id === payload.chatId
      )[0];

      this.updateChatStatus(chat, false);
    });

    setInterval(() => {
      this.chats.forEach((chat) => {
        if (chat.isOnline) {
          this.socket.emit(socketEvents.CHECK_ONLINE, {
            roomName: chat.id,
          });
        }
      });
    }, CHECK_STATUS_INTERVAL);
  }

  private updateChatStatus(chat: Chat, status: boolean) {
    if (chat) {
      const updatedChat: Chat = {
        ...chat,
        isOnline: status,
      };

      this.store.dispatch(chatActions.updateChat({ chat: updatedChat }));
      this.chats[this.chats.indexOf(chat)] = updatedChat;
    }
  }
}
