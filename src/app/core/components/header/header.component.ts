import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public defaultLanguage = 'ua';

  public constructor(private translate: TranslateService) {
    const browserLang: string | undefined = this.translate.getBrowserLang();
    this.defaultLanguage = browserLang?.match(/en|ua/) ? browserLang : 'ua';
    this.defaultLanguage = localStorage.getItem('lang') || this.defaultLanguage;
    this.translate.use(this.defaultLanguage);
  }

  public setLanguage(e: MatSelectChange): void {
    this.translate.use(e.value);
    localStorage.setItem('lang', e.value);
  }
}
