import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {
  LoginUserModel,
  SignUpUserModel,
  BasicResponseModel,
  LoginResponseModel,
  UpdateUserModel,
  UpdateUserPasswordModel,
} from 'src/app/auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public constructor(private httpClient: HttpClient, private router: Router) {}

  public login(userData: LoginUserModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>('auth/login', userData);
  }

  public signUp(userData: SignUpUserModel): Observable<BasicResponseModel> {
    return this.httpClient.post<BasicResponseModel>('auth/signup', userData);
  }

  public refresh(refreshToken: string): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>('auth/refresh', {
      refreshToken,
    });
  }

  public getAllUsers(): Observable<BasicResponseModel[]> {
    return this.httpClient.get<BasicResponseModel[]>('api/users');
  }

  public getUserByLogin(userLogin: string): Observable<BasicResponseModel> {
    return this.httpClient.get<BasicResponseModel>(
      `api/users/login/${userLogin}`
    );
  }

  public updateUser(
    userId: string,
    userData: UpdateUserModel
  ): Observable<BasicResponseModel> {
    return this.httpClient.patch<BasicResponseModel>(
      `api/users/${userId}`,
      userData
    );
  }

  public updateUserPassword(
    userId: string,
    userData: UpdateUserPasswordModel
  ): Observable<BasicResponseModel> {
    return this.httpClient.put<BasicResponseModel>(
      `api/users/${userId}`,
      userData
    );
  }

  public deleteUser(userId: string): void {
    this.httpClient.delete(`api/users/${userId}`).subscribe();
  }
}
