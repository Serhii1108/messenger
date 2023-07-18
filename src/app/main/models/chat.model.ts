import { User } from 'src/app/auth/models/user.model';

export interface Chat {
  id: string;
  user1: User;
  user2: User;
  conversation: Message[];
  createdAt: Date;
}

export interface Message {
  senderId: string;
  message: string;
  messageId: number;
  isSeen: boolean;
  sendDate: string;
}

export interface MessageInfo {
  lastMessage: string;
  lastMessageTime: string;
}
