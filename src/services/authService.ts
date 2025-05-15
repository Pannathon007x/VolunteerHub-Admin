// src/services/authService.ts
import api from "../utils/api";

export interface LoginPayload { studentId: string; password: string; }
export interface AuthResponse { token: string; refreshToken: string; }

export const login = (data: LoginPayload) =>
  api.post<AuthResponse>("/auth/login", data);

export const refreshToken = (token: string) =>
  api.post<AuthResponse>("/auth/refresh", { refreshToken: token });
