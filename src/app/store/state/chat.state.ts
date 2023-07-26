import { Chat } from 'src/app/main/models/chat.model';

export interface ChatState {
  chats: Chat[];
  activeChat?: Chat;
  isLoading: boolean;
}

export const initialChatState: ChatState = {
  chats: [],
  activeChat: undefined,
  isLoading: false,
};
