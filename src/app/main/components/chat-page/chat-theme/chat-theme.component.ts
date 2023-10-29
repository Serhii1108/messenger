import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-theme',
  templateUrl: './chat-theme.component.html',
  styleUrls: ['./chat-theme.component.scss'],
})
export class ChatThemeComponent {
  public constructor(private router: Router) {}

  public closeTheme(e: Event): void {
    const isCorrectEl = (e.target as Element).classList.contains('themes');
    if (isCorrectEl) {
      this.router.navigateByUrl('/chat');
    }
  }

  public setTheme(themeId: number): void {
    this.router.navigateByUrl('/chat');

    const chatPage: HTMLElement | null = document.getElementById('body');
    if (chatPage) {
      chatPage.style.backgroundImage = `url(../../../../../assets/images/themes/large/${themeId}.jpg)`;
    }
    localStorage.setItem('theme', themeId.toString());
  }
}
