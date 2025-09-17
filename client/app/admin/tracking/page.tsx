"use client"

import type React from "react"

import { useState } from "react"
import { Layout } from "@/components/admin/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { FiSearch, FiPlus, FiMapPin, FiPackage, FiClock, FiCheckCircle } from "react-icons/fi"
import { TrackingResults } from "@/components/admin/tracking/TrackingResults"
import { TrackingForm } from "@/components/admin/tracking/TrackingForm"
import { RecentTracking } from "@/components/admin/tracking/RecentTracking"

// Mock tracking data
const mockTrackingData = {
  "MAWB-2024-001": {
    id: "MAWB-2024-001",
    type: "MAWB",
    client: "ABC Corporation",
    origin: "Paris CDG",
    destination: "New York JFK",
    status: "En transit",
    currentLocation: "En vol - AF123",
    estimatedDelivery: "2024-01-20",
    weight: "1.5 tonnes",
    transportMode: "aerial",
    stages: [
      {
        stage: "Validation",
        status: "completed",
        date: "2024-01-15T09:00:00Z",
        location: "Paris CDG",
        description: "Document validé et accepté",
      },
      {
        stage: "Préparation",
        status: "completed",
        date: "2024-01-15T14:30:00Z",
        location: "Paris CDG",
        description: "Marchandise préparée et emballée",
      },
      {
        stage: "Douane",
        status: "completed",
        date: "2024-01-16T08:15:00Z",
        location: "Paris CDG",
        description: "Dédouanement export terminé",
      },
      {
        stage: "Expédition",
        status: "current",
        date: "2024-01-16T16:45:00Z",
        location: "En vol",
        description: "Vol AF123 - En cours de transport",
      },
      {
        stage: "Arrivé au port d'arrivé",
        status: "pending",
        date: null,
        location: "New York JFK",
        description: "Arrivée prévue le 20/01/2024",
      },
      {
        stage: "Livraison",
        status: "pending",
        date: null,
        location: "New York",
        description: "Livraison finale au destinataire",
      },
    ],
  },
  "MBL-2024-023": {
    id: "MBL-2024-023",
    type: "MBL",
    client: "XYZ Limited",
    origin: "Le Havre",
    destination: "Shanghai",
    status: "Douane",
    currentLocation: "Le Havre - Terminal",
    estimatedDelivery: "2024-02-15",
    weight: "15 TEU",
    transportMode: "maritime",
    stages: [
      {
        stage: "Validation",
        status: "completed",
        date: "2024-01-10T10:00:00Z",
        location: "Le Havre",
        description: "Document validé et accepté",
      },
      {
        stage: "Préparation",
        status: "completed",
        date: "2024-01-12T15:00:00Z",
        location: "Le Havre",
        description: "Conteneurs préparés et scellés",
      },
      {
        stage: "Douane",
        status: "current",
        date: "2024-01-14T09:30:00Z",
        location: "Le Havre",
        description: "En attente de dédouanement export",
      },
      {
        stage: "Expédition",
        status: "pending",
        date: null,
        location: "Le Havre",
        description: "Embarquement prévu sur MSC Bellissima",
      },
      {
        stage: "Arrivé au port d'arrivé",
        status: "pending",
        date: null,
        location: "Shanghai",
        description: "Arrivée prévue le 15/02/2024",
      },
      {
        stage: "Livraison",
        status: "pending",
        date: null,
        location: "Shanghai",
        description: "Livraison finale au destinataire",
      },
    ],
  },
  "HAWB-2024-045": {
    id: "HAWB-2024-045",
    type: "HAWB",
    client: "Global Inc",
    origin: "Londres LHR",
    destination: "Tokyo NRT",
    status: "Livré",
    currentLocation: "Tokyo - Livré",
    estimatedDelivery: "2024-01-18",
    weight: "0.8 tonnes",
    transportMode: "aerial",
    stages: [
      {
        stage: "Validation",
        status: "completed",
        date: "2024-01-12T08:00:00Z",
        location: "Londres LHR",
        description: "Document validé et accepté",
      },
      {
        stage: "Préparation",
        status: "completed",
        date: "2024-01-12T13:00:00Z",
        location: "Londres LHR",
        description: "Marchandise préparée et emballée",
      },
      {
        stage: "Douane",
        status: "completed",
        date: "2024-01-13T07:00:00Z",
        location: "Londres LHR",
        description: "Dédouanement export terminé",
      },
      {
        stage: "Expédition",
        status: "completed",
        date: "2024-01-13T14:20:00Z",
        location: "En vol",
        description: "Vol BA789 - Transport terminé",
      },
      {
        stage: "Arrivé au port d'arrivé",
        status: "completed",
        date: "2024-01-18T06:30:00Z",
        location: "Tokyo NRT",
        description: "Arrivée à Tokyo NRT",
      },
      {
        stage: "Livraison",
        status: "completed",
        date: "2024-01-18T15:30:00Z",
        location: "Tokyo",
        description: "Livraison terminée avec succès",
      },
    ],
  },
}

export default function TrackingPage() {
  const { t } = useLanguage()
  const [trackingCode, setTrackingCode] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const handleSearch = () => {
    if (!trackingCode.trim()) return

    const result = mockTrackingData[trackingCode.toUpperCase() as keyof typeof mockTrackingData]
    setTrackingResult(result || null)

    // Add to search history if not already present
    if (result && !searchHistory.includes(trackingCode.toUpperCase())) {
      setSearchHistory((prev) => [trackingCode.toUpperCase(), ...prev.slice(0, 4)])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const stats = [
    {
      title: "Colis Suivis",
      value: Object.keys(mockTrackingData).length.toString(),
      icon: FiPackage,
      color: "bg-blue-500",
    },
    {
      title: "En Transit",
      value: Object.values(mockTrackingData)
        .filter((item) => item.status === "En transit")
        .length.toString(),
      icon: FiMapPin,
      color: "bg-yellow-500",
    },
    {
      title: "En Douane",
      value: Object.values(mockTrackingData)
        .filter((item) => item.status === "Douane")
        .length.toString(),
      icon: FiClock,
      color: "bg-orange-500",
    },
    {
      title: "Livrés",
      value: Object.values(mockTrackingData)
        .filter((item) => item.status === "Livré")
        .length.toString(),
      icon: FiCheckCircle,
      color: "bg-green-500",
    },
  ]

  if (showForm) {
    return (
      <Layout>
        <TrackingForm onCancel={() => setShowForm(false)} onSave={() => setShowForm(false)} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t("tracking")}</h1>
            <p className="text-muted-foreground">Suivez vos colis en temps réel avec leur code de suivi</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <FiPlus className="w-4 h-4 mr-2" />
            Ajouter Suivi
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Rechercher un Colis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Entrez votre code de suivi (ex: MAWB-2024-001)"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-12"
                />
                <Button
                  onClick={handleSearch}
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                >
                  <FiSearch className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick Search History */}
            {searchHistory.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Recherches récentes:</p>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((code) => (
                    <Button
                      key={code}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTrackingCode(code)
                        const result = mockTrackingData[code as keyof typeof mockTrackingData]
                        setTrackingResult(result || null)
                      }}
                      className="bg-transparent"
                    >
                      {code}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results Message */}
            {trackingCode && trackingResult === null && (
              <div className="text-center py-8">
                <FiPackage className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Aucun colis trouvé avec le code "{trackingCode}". Vérifiez le code de suivi.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingResult && <TrackingResults tracking={trackingResult} />}

        {/* Recent Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTracking trackingData={Object.values(mockTrackingData)} />

          <Card>
            <CardHeader>
              <CardTitle>Codes de Suivi Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">Essayez ces codes pour tester le système:</p>
                {Object.keys(mockTrackingData).map((code) => (
                  <Button
                    key={code}
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => {
                      setTrackingCode(code)
                      const result = mockTrackingData[code as keyof typeof mockTrackingData]
                      setTrackingResult(result)
                    }}
                  >
                    <FiPackage className="w-4 h-4 mr-2" />
                    {code} - {mockTrackingData[code as keyof typeof mockTrackingData].status}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
