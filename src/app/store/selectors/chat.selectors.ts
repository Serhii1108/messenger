import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from '../state/chat.state';

export const selectChatState = createFeatureSelector<ChatState>('chat');
export const selectAllChats = createSelector(
  selectChatState,
  (state) => state.chats
);
export const selectActiveChat = createSelector(
  selectChatState,
  (state) => state.activeChat
);
export const selectIsChatLoading = createSelector(
  selectChatState,
  (state) => state.isLoading
);
