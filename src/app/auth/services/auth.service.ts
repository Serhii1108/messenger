import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import {
  LoginUserModel,
  LoginResponseModel,
  SignUpUserModel,
  BasicResponseModel,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private apiService: ApiService) {}

  public get isUserAuthorized(): boolean {
    const tokens: LoginResponseModel | null = this.getTokens();
    const user: BasicResponseModel | null = this.getUser();

    if (!tokens || !user) {
      return false;
    }
    return true;
  }

  public login(userData: LoginUserModel): Observable<LoginResponseModel> {
    return this.apiService.login(userData);
  }

  public signUp(userData: SignUpUserModel): Observable<BasicResponseModel> {
    return this.apiService.signUp(userData);
  }

  public getUserByLogin(userLogin: string): Observable<BasicResponseModel> {
    return this.apiService.getUserByLogin(userLogin);
  }

  public refreshToken(refreshToken: string): Observable<LoginResponseModel> {
    return this.apiService.refresh(refreshToken);
  }

  public getTokens(): LoginResponseModel | null {
    const tokens: string | null = localStorage.getItem('tokens');
    return tokens ? JSON.parse(tokens) : null;
  }

  public getUser(): BasicResponseModel | null {
    const user: string | null = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  public logout(): void {
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
  }
}
