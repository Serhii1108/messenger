import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
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

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public signUpForm: FormGroup = new FormGroup({
    loginInput: new FormControl('', Validators.minLength(lengthValidation)),
    passwordInput: new FormControl('', Validators.pattern(passwordValidation)),
    phoneInput: new FormControl('', Validators.pattern(phoneValidation)),
  });

  public constructor(private authService: AuthService) {}

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
            });
        });
    }
  }
}
