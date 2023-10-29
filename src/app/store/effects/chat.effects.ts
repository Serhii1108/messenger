import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';

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

  setActiveChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatActions.setActiveChat.type),
      switchMap(({ chat }) => of<Chat>(chat)),
      map((chat: Chat) => chatActions.setActiveChatSuccess({ chat }))
    );
  });

  updateChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatActions.updateChat.type),
      switchMap(({ chat }) => of<Chat>(chat)),
      map((chat: Chat) => chatActions.updateChatSuccess({ chat }))
    );
  });
}
