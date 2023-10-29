import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent, FooterComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, PageNotFoundComponent, FooterComponent],
})
export class CoreModule {}
