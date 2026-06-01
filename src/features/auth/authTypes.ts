export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  success?: boolean;
  message?: string;
}
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  success?: boolean;
  message?: string;
}