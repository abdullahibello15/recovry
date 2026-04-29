import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";

export interface User {
  id: string;
  email: string;
  role: "admin" | "client";
  name: string;
}

type LoginResponse = {
  token: string;
  user: User;
};

type SignupResponse = {
  ok: true;
  user: User;
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<string | true>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = api.getAuthToken();

    if (!token) {
      setIsLoading(false);
      return;
    }

    let active = true;

    api
      .get<{ user: User }>("/auth/session")
      .then((data) => {
        if (active) {
          setUser(data.user);
        }
      })
      .catch(() => {
        api.setAuthToken(null);
        if (active) {
          setUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      api.setAuthToken(data.token);
      setUser(data.user);
      return true;
    } catch {
      api.setAuthToken(null);
      setUser(null);
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<string | true> => {
    try {
      await api.post<SignupResponse>("/auth/signup", {
        name,
        email,
        password,
      });
      api.setAuthToken(null);
      setUser(null);
      return true;
    } catch (error) {
      api.setAuthToken(null);
      setUser(null);
      if (error instanceof Error) {
        return error.message;
      }
      return "Signup failed";
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Clear local auth state even if the server session is already gone.
    } finally {
      api.setAuthToken(null);
      setUser(null);
    }
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
