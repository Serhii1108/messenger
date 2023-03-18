import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [SignUpComponent, LoginComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  exports: [],
})
export class AuthModule {}
