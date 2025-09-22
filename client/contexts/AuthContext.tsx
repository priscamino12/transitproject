"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import {jwtDecode} from "jwt-decode"

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
  const router = useRouter()

  useEffect(() => {
    const t = localStorage.getItem("token")
    if (t) {
      try {
        const decoded: any = jwtDecode(t)
        setUser({ id: decoded.id, nom: decoded.nom, type: decoded.type })
        setToken(t)
      } catch {
        localStorage.removeItem("token")
      }
    }
    setLoading(false)
  }, [])

  const login = (t: string) => {
    localStorage.setItem("token", t)
    const decoded: any = jwtDecode(t)
    setUser({ id: decoded.id, nom: decoded.nom, type: decoded.type })
    setToken(t)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
    router.push("/auth")
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
