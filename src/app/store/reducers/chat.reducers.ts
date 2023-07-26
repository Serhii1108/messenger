import { Action, createReducer, on } from '@ngrx/store';
import { ChatState, initialChatState } from '../state/chat.state';
import { chatActions } from '../index';

const reducer = createReducer(
  initialChatState,
  on(chatActions.getChats, (state): ChatState => {
    return { ...state, isLoading: true };
  }),
  on(chatActions.getChatsSuccess, (state, { chats }): ChatState => {
    return { ...state, isLoading: false, chats };
  }),
  on(chatActions.createChat, (state): ChatState => {
    return { ...state, isLoading: true };
  }),
  on(chatActions.createChatSuccess, (state, { chat }): ChatState => {
    return { ...state, chats: [...state.chats, chat], isLoading: false };
  })
);

export function chatReducer(
  state = initialChatState,
  actions: Action
): ChatState {
  return reducer(state, actions);
}
