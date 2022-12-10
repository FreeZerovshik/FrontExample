export interface Role {
  id: number;
  name: string;
}

export interface UserSetting {
  id: number;
  pagination: number;
}
export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  confirmpassword?: string;
  enabled?: boolean;
  roles?: Role[];
  newPass?: boolean;
  settings?: UserSetting[];
}

export interface LoginRequestPayload {
  username: string;
  password: string;
}

export interface LoginResponsePayload {
  accessToken: string;
  user: User;
  authorities?: [{ authority: string }];
  type?: string;
}

export interface SignupRequestPayload {
  id: number;
  email?: string;
  username?: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmpassword: string;
}

export interface SignupResponsePayload {
  accessToken: string;
  user: User;
  authorities: [{ authority: string }];
  type: string;
}
