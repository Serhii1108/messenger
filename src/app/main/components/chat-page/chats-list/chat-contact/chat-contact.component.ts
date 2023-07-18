import { AfterViewInit, Component, Input } from '@angular/core';
import { User } from 'src/app/auth/models/user.model';
import { MessageInfo } from 'src/app/main/models/chat.model';
@Component({
  selector: 'app-chat-contact',
  templateUrl: './chat-contact.component.html',
  styleUrls: ['./chat-contact.component.scss'],
})
export class ChatContactComponent implements AfterViewInit {
  @Input() public contact: User | undefined;
  @Input() public messageInfo: MessageInfo | undefined;

  public ngAfterViewInit(): void {
    this.addContactEventListeners();
  }

  private addContactEventListeners(): void {
    const contact: Element | null = document.getElementById(
      `${this.contact?.id}`
    );
    if (contact) {
      contact.addEventListener('click', (e: Event) => {
        if (e.target == pinBtn) {
          return;
        }
        document.querySelector('.contact.active')?.classList.remove('active');
        contact.classList.add('active');
      });

      const pinBtn: Element | null = contact.querySelector('.pin-img');
      pinBtn?.addEventListener('click', () => {
        pinBtn.classList.toggle('active');
      });
    }
  }
}
