import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { lengthValidation, passwordValidation } from '../../constance';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public LoginForm: FormGroup = new FormGroup({
    loginInput: new FormControl('', Validators.minLength(lengthValidation)),
    passwordInput: new FormControl('', Validators.pattern(passwordValidation)),
  });
}
