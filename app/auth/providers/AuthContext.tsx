"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  login,
  register,
  getNewToken,
  verifyAccessToken,
  fetchUserByToken,
} from "../api/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
  userEmail: string | null;
}

const SEVEN_DAYS = 7;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const goToDashboard = () => router.push("/dashboard");

  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const getAuthenticated = (accessToken: string, refreshToken: string) => {
    setToken(token);
    setRefreshToken(refreshToken);

    goToDashboard();
    Cookies.set("token", accessToken, { expires: SEVEN_DAYS });
    Cookies.set("refreshToken", refreshToken, { expires: SEVEN_DAYS });
  };

  const handleLogin = async (email: string, password: string) => {
    const { accessToken, refreshToken, user } = await login(email, password);

    if (!accessToken && !refreshToken) throw Error("wrong credentials");

    getAuthenticated(accessToken, refreshToken);
    setUserEmail(user);
  };

  const handleRegister = async (email: string, password: string) => {
    const { accessToken, refreshToken, user } = await register(email, password);

    if (!accessToken && !refreshToken) throw Error("wrong credentials");

    setUserEmail(user);
    getAuthenticated(accessToken, refreshToken);
  };

  const handleLogout = () => {
    setToken(null);
    setRefreshToken(null);
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    router.push("/auth");
  };

  const validateAndRedirect = async (token?: string) => {
    if (token) {
      try {
        const { isValid } = await verifyAccessToken(token);

        if (isValid) {
          const { user } = await fetchUserByToken(token);
          setUserEmail(user);
          goToDashboard();
        }
      } catch (err) {
        console.error("Token validation failed:", err);
        handleLogout();
      }
    } else {
      handleLogout();
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    validateAndRedirect(storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleRegister,
        refreshToken,
        token,
        handleLogout,
        userEmail,
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
