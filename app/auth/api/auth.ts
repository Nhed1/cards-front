import { api } from "@/app/utils/api";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  message?: string;
  user: string;
}

export const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post("/auth/register", { email, password });

  return response.data;
};

export const getNewToken = async (refreshToken: string) => {
  const response = await api.post("/auth/refresh-token", { refreshToken });
  return response.data;
};

export const verifyAccessToken = async (accessToken: string) => {
  const response = await api.post("/auth/validate-token", { accessToken });
  return response.data;
};

export const fetchUserByToken = async (accessToken: string) => {
  const response = await api.post("/auth/fetch-user", { accessToken });
  return response.data;
};
