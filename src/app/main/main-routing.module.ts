import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ChatThemeComponent } from './components/chat-page/chat-theme/chat-theme.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
  {
    path: 'chat',
    component: ChatPageComponent,
    children: [
      {
        path: 'themes',
        component: ChatThemeComponent,
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
