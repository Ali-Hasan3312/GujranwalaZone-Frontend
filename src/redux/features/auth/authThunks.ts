// src/features/auth/authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ChangePasswordData, ForgotPasswordData, LoginData, RegisterData, ResetPasswordData, User } from '../../types/userTypes';
import api from '../../utils/api';

export const loginUser = createAsyncThunk('auth/loginUser', async (loginData: LoginData, { rejectWithValue }) => {
  try {
    const response = await api.post<User>(`/user/login`, loginData); 
    console.log(response.data);
    
    return response.data;
  } catch (error:any) {
    return rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await api.post('/user/logout');
    return;
  } catch (error:any) {
    return rejectWithValue(error.message);
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (registerData: RegisterData, { rejectWithValue }) => {
  try {
    const response = await api.post<User>('/user/new', registerData);
    return response.data;
  } catch (error:any) {
    return rejectWithValue(error.message);
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (forgotPasswordData: ForgotPasswordData, { rejectWithValue }) => {
  try {
    await api.post('/user/forgot-password', forgotPasswordData);
    return;
  } catch (error:any) {
    return rejectWithValue(error.message);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (resetPasswordData: ResetPasswordData, { rejectWithValue }) => {
  try {
    await api.put('/user/password/reset/:token', resetPasswordData);
    return;
  } catch (error:any) {
    return rejectWithValue(error.message);
  }
});

export const changePassword = createAsyncThunk('auth/changePassword', async (changePasswordData: ChangePasswordData, { rejectWithValue }) => {
  try {
    await axios.post('/api/change-password', changePasswordData);
    return;
  } catch (error:any) {
    return rejectWithValue(error.message);
  }
});
