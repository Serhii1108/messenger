import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(
    public translate: TranslateService,
    public router: Router
  ) {}

  public get isChatPage(): boolean {
    return this.router.url.includes('chat');
  }

  public ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
  }
}
