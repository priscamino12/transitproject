"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { LoginDto, UserInfo } from "@/components/auth/types/auth";
import { AuthService } from "@/components/auth/services/auth.service";

interface AuthContextType {
  user: UserInfo | null;
  token: string | null;
  login: (payload: LoginDto) => Promise<void>;
  setUser: (user: UserInfo | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => { },
  setUser: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  const login = async (payload: LoginDto) => {
    try {
      const res = await AuthService.login(payload);
      if (res.success) {
        console.log(res.data.userInfo.entreprise); // 🔍 vérifier ce qui est retourné
        setUser(res.data.userInfo);
        setToken(res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.userInfo));
        localStorage.setItem("token", res.data.token);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
