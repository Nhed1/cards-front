"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { login, register, getNewToken } from "../api/auth";
import Cookies from "js-cookie";

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (email: string, password: string) => Promise<void>;
  handleRefreshToken: () => Promise<void>;
}

const SEVEN_DAYS = 7;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const { token, refreshToken } = await login(email, password);
    setToken(token);
    setRefreshToken(refreshToken);

    Cookies.set("token", token, { expires: SEVEN_DAYS });
    Cookies.set("refreshToken", refreshToken, { expires: SEVEN_DAYS });
  };

  const handleRegister = async (email: string, password: string) => {
    console.log("hello");
    const { token, refreshToken } = await register(email, password);

    setToken(token);
    setRefreshToken(refreshToken);

    Cookies.set("token", token, { expires: SEVEN_DAYS });
    Cookies.set("refreshToken", refreshToken, { expires: SEVEN_DAYS });
  };

  const handleRefreshToken = async () => {
    if (refreshToken) {
      const { token } = await getNewToken(refreshToken);
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    }
  };

  const handleLogout = () => {
    setToken(null);
    setRefreshToken(null);
    Cookies.remove("token");
    Cookies.remove("refreshToken");
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleRegister,
        refreshToken,
        token,
        handleRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
