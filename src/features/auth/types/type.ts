export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  accessToken: string;
}

export type LogoutRequest = Record<string, any>;

export interface LogoutResponse {
  success: boolean;
  message?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  userId: number;
  message?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  updatedAt: string;
}
