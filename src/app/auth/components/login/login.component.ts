import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { lengthValidation, passwordValidation } from '../../constance';
import { LoginResponseModel, LoginUserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    loginInput: new FormControl('', Validators.minLength(lengthValidation)),
    passwordInput: new FormControl('', Validators.pattern(passwordValidation)),
  });

  public constructor(private authService: AuthService) {}

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
        });
    }
  }
}
