import { Component, AfterViewInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { BasicResponseModel } from 'src/app/auth/models/user.model';
import { DEBOUNCE_TIME } from '../constance';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements AfterViewInit {
  public searchValue: string = '';
  public searchValueUpdate: Subject<string> = new Subject<string>();
  public searchedUsers: BasicResponseModel[] = [];
  public groups: [] = [];
  public contacts: [] = [];

  public constructor(private apiService: ApiService) {
    this.searchUsers();
  }

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

  private searchUsers(): void {
    this.searchValueUpdate
      .pipe(
        map((value: string) => (value.length ? value : '')),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        if (value) {
          this.apiService
            .getAllUsersByLogin(value)
            .subscribe((users: BasicResponseModel[]) => {
              this.searchedUsers = users.filter((user: BasicResponseModel) => {
                return (
                  user.login !==
                  (
                    JSON.parse(
                      localStorage.getItem('user') ?? ''
                    ) as BasicResponseModel
                  ).login
                );
              });
            });
        } else {
          this.searchedUsers = [];
        }
      });
  }
}
