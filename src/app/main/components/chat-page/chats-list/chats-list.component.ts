import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements AfterViewInit {
  public searchValue: string = '';
  public groups: [] = [];
  public contacts: [] = [];

  public ngAfterViewInit(): void {
    this.addGroupsEventListeners();
    this.addContactsEventListeners();
  }

  private addGroupsEventListeners(): void {
    const groups: NodeListOf<Element> = document.querySelectorAll('.group');

    groups.forEach((group: Element) => {
      group.addEventListener('click', () => {
        document.querySelector('.group.active')?.classList.remove('active');
        group.classList.add('active');
      });
    });
  }

  private addContactsEventListeners(): void {
    const contacts: NodeListOf<Element> = document.querySelectorAll('.contact');

    contacts.forEach((contact: Element) => {
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
    });
  }
}
