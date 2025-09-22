"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { FaBars, FaSun, FaMoon, FaBell, FaGlobe, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

interface NavbarProps {
  onMenuClick: () => void
}

interface DecodedToken {
  nom: string
  type: string
  id: string
  exp: number
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [userName, setUserName] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    // Récupérer le token depuis le localStorage après login
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token)
        setUserName(decoded.nom)
      } catch (err) {
        console.error("Token invalide", err)
        localStorage.removeItem("token")
        router.push("/auth") // rediriger si token invalide
      }
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/auth")
  }

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "U"

  return (
    <header className="flex h-16 mb-10 items-center justify-between border-b border-border bg-background px-6">
      {/* Menu hamburger pour mobile */}
      <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden">
        <FaBars className="h-4 w-4" />
      </Button>

      {/* Titre de la page */}
      <div className="hidden lg:block">
        <h1 className="text-2xl font-semibold text-blue-500">Système de Transit International</h1>
      </div>

      {/* Actions de droite */}
      <div className="flex items-center space-x-4">
        {/* Sélecteur de langue */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <FaGlobe className="h-4 w-4" /> {language.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={6} forceMount className="z-[10000]">
            <DropdownMenuItem onClick={() => setLanguage("fr")}>🇫🇷 Français</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("en")}>🇬🇧 English</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Toggle thème */}
        <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <FaBell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
        </Button>

        {/* Profil utilisateur */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user?.nom?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
                <AvatarImage src="/diverse-user-avatars.png" alt="Avatar" />
              </Avatar>
              <span className="ml-2 hidden md:inline">{user?.nom}</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="px-4 py-2 border-b">
              <p className="font-semibold">{userName}</p>
            </div>
            <DropdownMenuItem>
              <FaUser className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FaCog className="mr-2 h-4 w-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <FaSignOutAlt className="mr-2 h-4 w-4" />
              Déconnexion
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
