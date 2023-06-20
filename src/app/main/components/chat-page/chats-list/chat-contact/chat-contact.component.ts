import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-chat-contact',
  templateUrl: './chat-contact.component.html',
  styleUrls: ['./chat-contact.component.scss'],
})
export class ChatContactComponent implements AfterViewInit {
  public ngAfterViewInit(): void {
    const contacts: NodeListOf<Element> = document.querySelectorAll('.contact');

    contacts.forEach((contact: Element) => {
      contact.addEventListener('click', () => {
        document.querySelector('.contact.active')?.classList.remove('active');
        contact.classList.add('active');
      });
    });
  }
}
