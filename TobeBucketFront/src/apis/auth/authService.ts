import apiClient from '../apiClient';
import { LoginRequest, LoginResponse, SignupRequest, Response } from '../types';


export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/login', data);
  return response.data;
};

export const signup = async (data: SignupRequest): Promise<Response> => {
  const response = await apiClient.post<Response>('/signup', data);
  return response.data;
};