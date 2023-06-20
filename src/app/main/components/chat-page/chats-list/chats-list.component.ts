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
    const groups: NodeListOf<Element> = document.querySelectorAll('.group');

    groups.forEach((group: Element) => {
      group.addEventListener('click', () => {
        document.querySelector('.group.active')?.classList.remove('active');
        group.classList.add('active');
      });
    });
  }
}
