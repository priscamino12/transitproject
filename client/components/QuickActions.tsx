"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiPlus, FiSearch, FiFileText, FiTruck } from "react-icons/fi"
import { useLanguage } from "@/contexts/LanguageContext"

export function QuickActions() {
  const { t } = useLanguage()

  const actions = [
    {
      title: "Nouveau Client",
      description: "Ajouter un nouveau client",
      icon: FiPlus,
      href: "/clients/new",
      color: "bg-blue-500",
    },
    {
      title: "Suivi Colis",
      description: "Rechercher un colis",
      icon: FiSearch,
      href: "/tracking",
      color: "bg-green-500",
    },
    {
      title: "Nouvelle Transaction",
      description: "Créer une transaction",
      icon: FiFileText,
      href: "/transactions/new",
      color: "bg-purple-500",
    },
    {
      title: "Nouveau Transport",
      description: "Planifier un transport",
      icon: FiTruck,
      href: "/transport/new",
      color: "bg-orange-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent bg-transparent"
            >
              <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
