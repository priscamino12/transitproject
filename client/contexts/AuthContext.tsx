"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import api from "@/app/axiosInstance"
import { toast } from "react-toastify"

interface User {
  email: string
  nom: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (token: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const use_r: any = localStorage.getItem("user")
    if (use_r) {
      try {
        setUser({ email: use_r.id, nom: use_r.nom, role: use_r.role })
      } catch {
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = (user: string) => {
    const use_r: any = localStorage.setItem("user", user)
    setUser({ nom: use_r.nom, role: use_r.role, email: use_r.email })
  }

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      if (res.status === 200) {
        localStorage.removeItem("user")
      }
      router.push("/auth")
    } catch (err: any) {
      toast.error("le serveur est en panne", {
        position: "top-right",
        autoClose: 3000,
      });
    }

  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
