import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from 'src/app/auth/models/user.model';
import {
  Chat,
  Contact,
  ContactInfo,
  Message,
  MessageInfo,
} from 'src/app/main/models/chat.model';
import { ChatSocketService } from 'src/app/main/services/chat-socket.service';
import { ChatService } from 'src/app/main/services/chat.service';
import { chatActions } from 'src/app/store';

@Component({
  selector: 'app-chat-contact',
  templateUrl: './chat-contact.component.html',
  styleUrls: ['./chat-contact.component.scss'],
})
export class ChatContactComponent implements AfterViewInit, OnInit {
  @Input() public chat: Chat | undefined;

  public contact: Contact | undefined;
  public isActive = false;

  public constructor(
    private chatService: ChatService,
    private store: Store,
    private chatSocketService: ChatSocketService
  ) {}

  public ngOnInit(): void {
    this.chatSocketService.connect(this.chat);
    this.parseContact();
    this.isActive = this.isActiveChat;
  }

  public ngAfterViewInit(): void {
    if (this.isActiveChat && this.chat) {
      this.store.dispatch(chatActions.setActiveChat({ chat: this.chat }));
    }
  }

  public get isActiveChat() {
    return localStorage.getItem('activeChatId') === this.chat?.id;
  }

  public get getContact() {
    return document.getElementById(`${this.chat?.id}`);
  }

  public toggleActivePin(event: Event): void {
    (event.target as Element).classList.toggle('active');
  }

  public setActiveChat(e?: Event): void {
    if (!this.checkCorrectClick(e)) return;

    const contact: Element | null = document.getElementById(`${this.chat?.id}`);

    if (contact) {
      if (!contact.classList.contains('active') && this.chat) {
        this.toggleActiveContact(contact);

        this.store.dispatch(chatActions.setActiveChat({ chat: this.chat }));
      }
    }
  }

  private toggleActiveContact(contact: Element) {
    localStorage.setItem('activeChatId', this.chat?.id ?? '');

    document.querySelector('.contact.active')?.classList.remove('active');
    contact.classList.add('active');
  }

  private checkCorrectClick(e?: Event) {
    if (e?.target) {
      const elementClasses: DOMTokenList = (e.target as Element).classList;
      if (
        elementClasses.contains('icons') ||
        elementClasses.contains('pin-img')
      ) {
        return false;
      }
    }
    return true;
  }

  private parseContact() {
    if (this.chat) {
      const user: User =
        this.chat.user1.id == this.chatService.getCurrUser.id
          ? this.chat.user2
          : this.chat.user1;

      const contactInfo: ContactInfo = {
        login: user.login,
        id: user.id,
      };

      const lastMessage: Message =
        this.chat.conversation[this.chat.conversation.length - 1];

      let lastMessageTime = '';
      if (lastMessage) {
        const date: Date = new Date(lastMessage?.sendDate);
        lastMessageTime = `${date.getHours()}:${date.getMinutes()}`;
      }

      const messageInfo: MessageInfo = {
        lastMessage: lastMessage?.message,
        lastMessageTime,
      };

      const contact: Contact = {
        contactInfo,
        messageInfo,
        chatId: this.chat.id,
      };

      this.contact = contact;
    }
  }
}
