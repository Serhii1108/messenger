import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { ChatsListComponent } from './components/chat-page/chats-list/chats-list.component';
import { ChatContactComponent } from './components/chat-page/chats-list/chat-contact/chat-contact.component';
import { ActiveChatComponent } from './components/chat-page/active-chat/active-chat.component';
import { MessageComponent } from './components/chat-page/active-chat/message/message.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ChatPageComponent,
    ChatsListComponent,
    ChatContactComponent,
    ActiveChatComponent,
    MessageComponent,
  ],
  imports: [CommonModule, SharedModule, MainRoutingModule],
  exports: [MainPageComponent],
})
export class MainModule {}
