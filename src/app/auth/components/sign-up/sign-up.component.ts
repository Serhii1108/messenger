import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  lengthValidation,
  passwordValidation,
  phoneValidation,
} from '../../constance';

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
}
