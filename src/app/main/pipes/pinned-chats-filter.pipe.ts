import { Pipe, PipeTransform } from '@angular/core';
import { Chat } from '../models/chat.model';

@Pipe({
  name: 'pinnedChatsFilter',
})
export class PinnedChatsFilterPipe implements PipeTransform {
  transform(chats: Chat[] | null, pinnedChatsIds: string[]): Chat[] {
    if (chats?.length) {
      const sortedChats = [...chats].sort((a, b) => {
        if (pinnedChatsIds.includes(a.id)) {
          return -1;
        }
        if (pinnedChatsIds.includes(b.id)) {
          return 1;
        }
        return 0;
      });
      return sortedChats;
    }
    return [];
  }
}
