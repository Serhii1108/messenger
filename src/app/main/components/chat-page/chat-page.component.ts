import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { chatSelectors } from 'src/app/store';
import { Chat } from '../../models/chat.model';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements AfterViewInit {
  public activeChat$: Observable<Chat | undefined> = this.store.select(
    chatSelectors.selectActiveChat
  );
  public isLoading$: Observable<boolean> = this.store.select(
    chatSelectors.selectIsChatLoading
  );

  public constructor(private store: Store) {}

  public ngAfterViewInit(): void {
    const theme = localStorage.getItem('theme');
    const chatPage: HTMLElement | null = document.getElementById('body');

    if (chatPage) {
      chatPage.style.backgroundImage = `url(../../../../../assets/images/${
        theme ? `themes/large/${theme}.jpg` : 'bg.jpg'
      }`;
    }
  }
}
