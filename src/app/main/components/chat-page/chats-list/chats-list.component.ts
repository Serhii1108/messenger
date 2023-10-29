import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { Store } from '@ngrx/store';

import { ChatService } from 'src/app/main/services/chat.service';
import { BasicResponseModel } from 'src/app/auth/models/user.model';
import { DEBOUNCE_TIME } from '../constance';
import { Chat } from 'src/app/main/models/chat.model';
import { chatSelectors, chatActions } from 'src/app/store';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnInit {
  public searchValue = '';
  public searchValueUpdate: Subject<string> = new Subject<string>();
  public searchedUsers: BasicResponseModel[] = [];

  public isMenuActive = false;

  public groups: [] = [];

  public chats$: Observable<Chat[]> = this.store.select(
    chatSelectors.selectAllChats
  );
  public pinnedChatsIds: string[] = [];

  public constructor(
    private chatService: ChatService,
    private store: Store
  ) {
    this.pinnedChatsIds = this.chatService.getPinnedChats;

    this.chatService.pinnedChatsIds$.subscribe((pinnedChatsIds: string[]) => {
      this.pinnedChatsIds = pinnedChatsIds;
    });
  }

  public ngOnInit(): void {
    this.getAllUserChats();
    this.searchUsers();
  }

  public addContact(contactId: string): void {
    this.searchValue = '';
    this.searchedUsers = [];
    this.searchValueUpdate.next('');
    this.store.dispatch(chatActions.createChat({ contactId }));
  }

  public toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
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

  private getAllUserChats() {
    this.store.dispatch(
      chatActions.getChats({ currUserId: this.chatService.getCurrUser.id })
    );
  }
}
