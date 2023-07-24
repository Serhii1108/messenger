import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';

import { lengthValidation, passwordValidation } from '../../constance';
import {
  BasicResponseModel,
  LoginResponseModel,
  LoginUserModel,
} from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: UntypedFormGroup = new UntypedFormGroup({
    loginInput: new UntypedFormControl(
      '',
      Validators.minLength(lengthValidation)
    ),
    passwordInput: new UntypedFormControl(
      '',
      Validators.pattern(passwordValidation)
    ),
  });

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public login(): void {
    if (this.loginForm.valid) {
      const userData: LoginUserModel = {
        login: this.loginForm.controls['loginInput'].value,
        password: this.loginForm.controls['passwordInput'].value,
      };

      this.authService
        .login(userData)
        .subscribe((tokens: LoginResponseModel) => {
          localStorage.setItem('tokens', JSON.stringify(tokens));

          this.authService
            .getUserByLogin(userData.login)
            .subscribe((user: BasicResponseModel) => {
              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigateByUrl('/chat');
            });
        });
    }
  }
}
