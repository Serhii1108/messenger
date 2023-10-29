export interface User {
  id: string;
  login: string;
  phoneNumber: string;
  createdAt: string;
}

export interface LoginUserModel {
  login: string;
  password: string;
}

export interface SignUpUserModel {
  login: string;
  password: string;
  phoneNumber: string;
}

export interface BasicResponseModel {
  id: string;
  login: string;
  phoneNumber: string;
  createdAt: string;
}

export interface LoginResponseModel {
  accessToken: string;
  refreshToken: string;
}

export interface UpdateUserModel {
  login?: string;
  phoneNumber?: string;
}

export interface UpdateUserPasswordModel {
  oldPassword: string;
  newPassword: string;
}
