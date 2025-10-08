/* "use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
// import { useRouter } from "next/navigation"
// import jwtDecode from "jwt-decode"

interface User {
  id: string
  nom: string
  type: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  // const router = useRouter()

  useEffect(() => {
    // ⚡ Désactivation du token pour tests
    // const t = localStorage.getItem("token")
    // if (t) {
    //   try {
    //     const decoded: any = jwtDecode(t)
    //     setUser({ id: decoded.id, nom: decoded.nom, type: decoded.type })
    //     setToken(t)
    //   } catch {
    //     localStorage.removeItem("token")
    //   }
    // }

    // 🔹 Simule un utilisateur pour test sans DB
    setUser({ id: "1", nom: "Test User", type: "SuperAdmin" }) // changez ici: SuperAdmin, admin, client
    setToken(null)
    setLoading(false)
  }, [])

  const login = (t: string) => {
    // ⚡ Ignorer le token pour le moment
    // localStorage.setItem("token", t)
    // const decoded: any = jwtDecode(t)
    // setUser({ id: decoded.id, nom: decoded.nom, type: decoded.type })
    // setToken(t)

    // Pour test, on simule
    setUser({ id: "1", nom: "Test User", type: "SuperAdmin" })
    setToken(null)
  }

  const logout = () => {
    // localStorage.removeItem("token")
    setUser(null)
    setToken(null)
    // router.push("/auth")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
 */
// AuthContext.tsx ou ton fichier contexte
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UserInfo } from "@/components/auth/types/auth"; // ← bien importer le type User

interface AuthContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
