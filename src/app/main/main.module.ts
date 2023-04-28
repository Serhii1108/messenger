import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';

@NgModule({
  declarations: [MainPageComponent, ChatPageComponent],
  imports: [CommonModule, SharedModule, MainRoutingModule],
  exports: [MainPageComponent],
})
export class MainModule {}
