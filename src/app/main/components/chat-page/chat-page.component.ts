import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { chatSelectors } from 'src/app/store';
import { Chat } from '../../models/chat.model';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent {
  public activeChat$: Observable<Chat | undefined> = this.store.select(
    chatSelectors.selectActiveChat
  );
  public isLoading$: Observable<boolean> = this.store.select(
    chatSelectors.selectIsChatLoading
  );

  public constructor(private store: Store) {}
}
