import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  exports: [],
})
export class AuthModule {}
