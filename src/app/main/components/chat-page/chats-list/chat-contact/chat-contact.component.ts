import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user.model';
import {
  Chat,
  Contact,
  ContactInfo,
  Message,
  MessageInfo,
} from 'src/app/main/models/chat.model';
import { ChatService } from 'src/app/main/services/chat.service';
@Component({
  selector: 'app-chat-contact',
  templateUrl: './chat-contact.component.html',
  styleUrls: ['./chat-contact.component.scss'],
})
export class ChatContactComponent implements AfterViewInit, OnInit {
  @Input() public chat: Chat | undefined;

  public contact: Contact | undefined;

  public constructor(private chatService: ChatService) {}

  public ngOnInit(): void {
    this.parseContact();
  }

  public ngAfterViewInit(): void {
    this.addContactEventListeners();
  }

  public toggleActivePin(event: Event): void {
    (event.target as Element).classList.toggle('active');
  }

  private addContactEventListeners(): void {
    const contact: Element | null = document.getElementById(
      `${this.contact?.contactInfo.id}`
    );
    if (contact) {
      contact.addEventListener('click', (e: Event) => {
        const pinBtn: Element | null = contact.querySelector('.pin-img');
        if (e.target == pinBtn) return;

        document.querySelector('.contact.active')?.classList.remove('active');
        contact.classList.add('active');
      });
    }
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

      const messageInfo: MessageInfo = {
        lastMessage: lastMessage?.message,
        lastMessageTime: lastMessage?.sendDate,
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
