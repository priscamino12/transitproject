"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiTruck,
  FiFileText,
  FiMapPin,
  FiFolder,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiChevronRight,
  FiNavigation,
  FiAnchor,
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  submenu?: MenuItem[];
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { logout } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["transport"]);
  const router = useRouter();

  // ⚡ Simule un utilisateur pour tester
  const user = { type: "superadmin" }; // change ici: "SuperAdmin", "admin", "client"

  const handleLogout = () => {
    logout?.();
    router.push("/auth");
  };

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
    );
  };

  const getBasePath = (role: string) => {
    switch (role.toLowerCase()) {
      case "superadmin":
        return "/management";
      case "admin":
        return "/management";
      case "client":
        return "/management";
      default:
        return "/";
    }
  };

  const basePath = getBasePath(user.type);

  const menuItems: MenuItem[] = [
    // Dashboard seulement pour superadmin et admin
    ...(user.type.toLowerCase() !== "client"
      ? [{
        id: "dashboard",
        label: t("dashboard"),
        icon: FiHome,
        href: `${basePath}/dashboard`,
      }]
      : []),

    // Menu employés UNIQUEMENT pour superadmin
    ...(user.type.toLowerCase() === "superadmin"
      ? [
        {
          id: "employes",
          label: t("employes"),
          icon: FiUsers,
          href: `${basePath}/employe`,
        },
      ]
      : []),
    // Si ce n'est pas un client → il voit tout le reste
    ...(user.type.toLowerCase() !== "client"
      ? [
        {
          id: "clients",
          label: t("clients"),
          icon: FiUsers,
          href: `${basePath}/clients`,
        },
        {
          id: "transport",
          label: t("transport"),
          icon: FiTruck,
          href: `${basePath}/transport`,
          submenu: [
            {
              id: "aerial",
              label: t("aerial"),
              icon: FiNavigation,
              href: `${basePath}/transport/aerial`,
            },
            {
              id: "maritime",
              label: t("maritime"),
              icon: FiAnchor,
              href: `${basePath}/transport/maritime`,
            },
          ],
        },
        {
          id: "transactions",
          label: t("transactions"),
          icon: FiFileText,
          href: `${basePath}/transactions`,
        },
        {
          id: "documents",
          label: t("documents"),
          icon: FiFolder,
          href: `${basePath}/documents`,
        },
      ]
      : []),



    // Tout le monde (y compris client) a accès au tracking
    {
      id: "tracking",
      label: t("tracking"),
      icon: FiMapPin,
      href: `${basePath}/tracking`,
    },
  ];



  const bottomMenuItems = [
    { id: "settings", label: t("settings"), icon: FiSettings, href: `${basePath}/settings` },
    { id: "logout", label: t("logout"), icon: FiLogOut, onClick: handleLogout },
  ];

  return (
    <>
      {isOpen && (
        <div
          data-testid="overlay"
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={cn(
        "fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-sm">PL</span>
              </div>
              <div>
                <h1 className="text-sidebar-foreground font-bold text-lg">Primex</h1>
                <p className="text-sidebar-foreground/70 text-sm">Logistics</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map(item => (
              <div key={item.id}>
                {item.submenu ? (
                  <div>
                    <button onClick={() => toggleMenu(item.id)} className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                      pathname.startsWith(item.href) && "bg-sidebar-primary text-sidebar-primary-foreground"
                    )}>
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {expandedMenus.includes(item.id) ? <FiChevronDown className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
                    </button>
                    {expandedMenus.includes(item.id) && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.submenu.map(sub => (
                          <Link key={sub.id} href={sub.href} onClick={onClose} className={cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                            pathname === sub.href && "bg-sidebar-primary text-sidebar-primary-foreground"
                          )}>
                            <sub.icon className="w-4 h-4" />
                            <span>{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href} onClick={onClose} className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                    pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground"
                  )}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Bottom menu */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            {bottomMenuItems.map(item =>
              item.onClick ? (
                <button key={item.id} onClick={() => { item.onClick?.(); onClose(); }} className={cn(
                  "flex items-center space-x-3 px-3 py-2 w-full rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                )}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ) : (
                <Link key={item.id} href={item.href!} onClick={onClose} className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                  pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground"
                )}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
