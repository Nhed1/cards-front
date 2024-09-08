import { api } from "@/app/utils/api";

interface LoginResponse {
  token: string;
  refreshToken: string;
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

  console.log(response);
  return response.data;
};

export const getNewToken = async (refreshToken: string) => {
  const response = await api.post("/auth/refresh-token", { refreshToken });
  return response.data;
};
