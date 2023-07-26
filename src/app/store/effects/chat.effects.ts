import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { chatActions } from '../index';
import { ChatService } from 'src/app/main/services/chat.service';
import { Chat } from 'src/app/main/models/chat.model';

@Injectable()
export class ChatEffects {
  constructor(
    private actions$: Actions,
    private chatService: ChatService
  ) {}

  getChats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatActions.getChats.type),
      switchMap(({ currUserId }) =>
        this.chatService.getAllUserChats(currUserId)
      ),
      map((chats: Chat[]) => chatActions.getChatsSuccess({ chats }))
    );
  });

  createChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatActions.createChat.type),
      switchMap(({ contactId }) => this.chatService.createChat(contactId)),
      map((chat: Chat) => chatActions.createChatSuccess({ chat }))
    );
  });
}
