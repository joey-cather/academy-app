export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface LogoutRequest {}

export interface LogoutResponse {}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  updatedAt: string;
}
