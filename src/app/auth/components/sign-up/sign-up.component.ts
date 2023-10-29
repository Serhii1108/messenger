import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import {
  lengthValidation,
  passwordValidation,
  phoneValidation,
} from '../../constance';
import {
  BasicResponseModel,
  LoginResponseModel,
  SignUpUserModel,
} from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public signUpForm: UntypedFormGroup = new UntypedFormGroup({
    loginInput: new UntypedFormControl(
      '',
      Validators.minLength(lengthValidation)
    ),
    passwordInput: new UntypedFormControl(
      '',
      Validators.pattern(passwordValidation)
    ),
    phoneInput: new UntypedFormControl('', Validators.pattern(phoneValidation)),
  });

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private get fields(): {
    [key: string]: AbstractControl;
  } {
    return this.signUpForm.controls;
  }

  public signUp(): void {
    if (this.signUpForm.valid) {
      const userData: SignUpUserModel = {
        login: this.fields['loginInput'].value,
        password: this.fields['passwordInput'].value,
        phoneNumber: this.fields['phoneInput'].value,
      };

      this.authService
        .signUp(userData)
        .subscribe((data: BasicResponseModel) => {
          this.authService
            .login({
              login: userData.login,
              password: userData.password,
            })
            .subscribe((tokens: LoginResponseModel) => {
              localStorage.setItem('user', JSON.stringify(data));
              localStorage.setItem('tokens', JSON.stringify(tokens));
              this.router.navigateByUrl('/chat');
            });
        });
    }
  }
}
