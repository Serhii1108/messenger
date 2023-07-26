import { createAction, props } from '@ngrx/store';
import { Chat } from 'src/app/main/models/chat.model';

const prefix = '[Chats]';

export const getChats = createAction(
  `${prefix} Get Chats`,
  props<{ currUserId: string }>()
);

export const getChatsSuccess = createAction(
  `${getChats.type} Success`,
  props<{ chats: Chat[] }>()
);

export const createChat = createAction(
  `${prefix} Create Chat`,
  props<{
    contactId: string;
  }>()
);

export const createChatSuccess = createAction(
  `${createChat.type} Success`,
  props<{
    chat: Chat;
  }>()
);
