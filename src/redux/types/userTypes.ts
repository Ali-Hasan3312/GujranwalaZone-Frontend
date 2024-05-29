// src/types/userTypes.ts
export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface AuthState {
    loading: boolean;
    user: User | null;
    error: string | null;
    success: boolean;
  
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    name: string;
    email: string;
    password: string;
    gender:string;
    date: string;
    photo:string;

  }
  
  export interface ForgotPasswordData {
    email: string;
  }
  
  export interface ResetPasswordData {
    token: string | undefined;
    password: string | undefined;
    
  }
  
  export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
  }
  