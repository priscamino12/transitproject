"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  FaBars,
  FaSun,
  FaMoon,
  FaBell,
  FaGlobe,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  IconButton,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const firstLetter = user?.nom?.charAt(0).toUpperCase() || "U";

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6 sticky top-0 z-50">
      {/* Menu hamburger pour mobile */}
      <Button
        aria-label="Menu"
        variant="ghost"
        size="sm"
        onClick={onMenuClick}
        className="lg:hidden"
      >
        <FaBars className="h-4 w-4" />
      </Button>

      {/* Titre */}
      <div className="hidden lg:block">
        <h1 className="text-2xl font-semibold text-blue-500">
          Système de Transit International
        </h1>
      </div>

      {/* Zone d'actions */}
      <div className="flex items-center space-x-4">
        {/* Sélecteur de langue */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton
              aria-label="change la langue">
              <FaGlobe className="h-4 w-4" />
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent
              align="end"
              sideOffset={6}
              className="w-40 border border-gray-200 bg-white shadow-md rounded-md"
            >
              <DropdownMenuItem onClick={() => setLanguage("fr")}>
                🇫🇷 Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>

        {/* Toggle Thème */}
        <Button
          aria-label="Changer le thème"
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <FaSun className="h-4 w-4" />
          ) : (
            <FaMoon className="h-4 w-4" />
          )}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton
              aria-label="notification">
              <FaBell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                3
              </Badge>
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent
              side="bottom"
              align="end"
              sideOffset={6}
              className="w-56 border border-gray-200 bg-white shadow-md rounded-md"
            >
              <DropdownMenuItem>📦 Nouvelle expédition créée</DropdownMenuItem>
              <DropdownMenuItem>✅ Paiement confirmé</DropdownMenuItem>
              <DropdownMenuItem>🚢 Expédition livrée</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>

        {/* Profil utilisateur avec avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton
              aria-label="Profil">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-500 text-white font-semibold text-sm"
              >
                {firstLetter}
              </div>
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8} className="w-56">
            <div className="px-4 py-2 border-b">
              <p className="font-semibold">{user?.nom}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <DropdownMenuItem onClick={() => router.push("/profil")}>
              <FaUser className="mr-2 h-4 w-4" /> Profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/parametres")}>
              <FaCog className="mr-2 h-4 w-4" /> Paramètres
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <FaSignOutAlt className="mr-2 h-4 w-4" /> Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}
