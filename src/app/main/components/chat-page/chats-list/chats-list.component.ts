import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';

import { ChatService } from 'src/app/main/services/chat.service';
import { BasicResponseModel, User } from 'src/app/auth/models/user.model';
import { DEBOUNCE_TIME } from '../constance';
import { Chat, Message, MessageInfo } from 'src/app/main/models/chat.model';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnInit {
  public searchValue = '';
  public searchValueUpdate: Subject<string> = new Subject<string>();
  public searchedUsers: BasicResponseModel[] = [];

  public groups: [] = [];

  public chats: Chat[] = [];
  public contacts: Array<{ user: User; messageInfo: MessageInfo }> = [];

  public constructor(private chatService: ChatService) {}

  public ngOnInit(): void {
    this.getAllUserChats();
    this.searchUsers();
  }

  public addContact(contactId: string): void {
    this.chatService.createChat(contactId).subscribe((chat: Chat) => {
      this.parseContact(chat);
    });
  }

  public toggleGroupClass(event: Event): void {
    document.querySelector('.group.active')?.classList.remove('active');
    (event.target as Element).classList.add('active');
  }

  private searchUsers(): void {
    this.searchValueUpdate
      .pipe(
        map((value: string) => (value.length ? value : '')),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        if (value) {
          this.chatService
            .getAllUsersByLogin(value)
            .subscribe((users: BasicResponseModel[]) => {
              this.searchedUsers = users.filter((user: BasicResponseModel) => {
                const isContactAdded: Element | null = document.getElementById(
                  user.id
                );

                return (
                  !isContactAdded &&
                  user.login !== this.chatService.getCurrUser.login
                );
              });
            });
        } else {
          this.searchedUsers = [];
        }
      });
  }

  private getAllUserChats(): void {
    this.chatService
      .getAllUserChats(this.chatService.getCurrUser.id)
      .subscribe((chats: Chat[]) => {
        this.chats = chats;
        chats.forEach((chat: Chat) => {
          this.parseContact(chat);
        });
      });
  }

  private parseContact(chat: Chat): void {
    const user: User =
      chat.user1.id == this.chatService.getCurrUser.id
        ? chat.user2
        : chat.user1;

    const lastMessage: Message =
      chat.conversation[chat.conversation.length - 1];

    const messageInfo: MessageInfo = {
      lastMessage: lastMessage?.message,
      lastMessageTime: lastMessage?.sendDate,
    };
    this.contacts.push({ user, messageInfo });
  }
}
