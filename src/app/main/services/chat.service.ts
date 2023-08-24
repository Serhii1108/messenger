import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Chat } from '../models/chat.model';
import { BasicResponseModel } from 'src/app/auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  public get getCurrUser(): BasicResponseModel {
    return this.authService.getCurrUser();
  }

  public isActiveChat(chat: Chat | undefined): boolean {
    return localStorage.getItem('activeChatId') === chat?.id;
  }

  public createChat(contactId: string): Observable<Chat> {
    return this.apiService.createChat({
      user1Id: this.authService.getCurrUser().id,
      user2Id: contactId,
    });
  }

  public getAllUsersByLogin(login: string): Observable<BasicResponseModel[]> {
    return this.apiService.getAllUsersByLogin(login);
  }

  public getAllUserChats(userId: string): Observable<Chat[]> {
    return this.apiService.getAllUserChats(userId);
  }
}
