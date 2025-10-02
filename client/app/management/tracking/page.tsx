"use client"

import { useEffect, useState } from "react"
import { Layout } from "@/components/admin/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FiPackage, FiSearch, FiPlus } from "react-icons/fi"
import api from "@/config/axiosInstance"
import { TrackingForm } from "@/components/admin/tracking/TrackingForm"
import { TrackingResults } from "@/components/admin/tracking/TrackingResults"

const ALL_STAGES = [
  "Validation",
  "Préparation",
  "Douane",
  "Expédition",
  "Arrivé au port d'arrivé",
  "Livraison",
]

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [availableTracking, setAvailableTracking] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Validation":
        return "bg-blue-500"
      case "Préparation":
        return "bg-yellow-500"
      case "Douane":
        return "bg-orange-500"
      case "Expédition":
        return "bg-purple-500"
      case "Arrivé au port d'arrivé":
        return "bg-pink-500"
      case "Livraison":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const fetchTrackingData = async () => {
    try {
      const [hawbRes, hblRes] = await Promise.all([
        api.get("/suiviHAWB"),
        api.get("/suiviHBL"),
      ])

      const rawData = [
        ...hawbRes.data.map((h: any) => ({
          num: h.numHAWB,
          etape: h.etape,
          dateEtape: h.dateEtape,
          type: "HAWB",
        })),
        ...hblRes.data.map((h: any) => ({
          num: h.numHBL,
          etape: h.etape,
          dateEtape: h.dateEtape,
          type: "HBL",
        })),
      ]

      // Regrouper par numéro
      const grouped: Record<string, any[]> = {}
      rawData.forEach(item => {
        if (!grouped[item.num]) grouped[item.num] = []
        grouped[item.num].push(item)
      })

      // Pour la liste des codes disponibles : dernier état
      const uniqueList = Object.keys(grouped).map(num => {
        const steps = grouped[num].sort(
          (a, b) => new Date(a.dateEtape).getTime() - new Date(b.dateEtape).getTime()
        )
        const lastStep = steps[steps.length - 1]
        return {
          num,
          status: lastStep.etape,
          type: lastStep.type,
          stages: steps,
        }
      })

      setAvailableTracking(uniqueList)
    } catch (err) {
      console.error("Erreur de chargement :", err)
    }
  }

  useEffect(() => {
    fetchTrackingData()
  }, [])

  const handleSearch = (code?: string) => {
    const searchCode = code ?? trackingCode.trim()
    if (!searchCode) return

    setHasSearched(true) // ✅ Marque qu’une recherche a été lancée

    const found = availableTracking.find(item => item.num === searchCode)
    if (!found) {
      setTrackingResult(null)
    } else {
      const completedMap = new Map(
        found.stages.map((s: any) => [s.etape, s.dateEtape])
      )
      const allStages = ALL_STAGES.map(stage => ({
        stage,
        status: completedMap.has(stage) ? "completed" : "pending",
        date: completedMap.get(stage) || null,
      }))
      setTrackingResult({
        id: found.num,
        status: found.status,
        stages: allStages,
        type: found.type,
      })
    }

    if (!searchHistory.includes(searchCode))
      setSearchHistory(prev => [searchCode, ...prev.slice(0, 4)])
  }


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

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
            <h1 className="text-3xl font-bold text-foreground">Suivi des Colis</h1>
            <p className="text-muted-foreground">Suivez vos colis en temps réel avec leur code de suivi</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <FiPlus className="w-4 h-4 mr-2" />
            Ajouter Suivi
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rechercher un Colis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Entrez votre code de suivi"
                  value={trackingCode}
                  onChange={e => setTrackingCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-12"
                />
              </div>
            </div>

            {searchHistory.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Recherches récentes:</p>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map(code => (
                    <Button
                      key={code}
                      variant="outline"
                      size="sm"
                      onClick={() => setTrackingCode(code)}
                      className="bg-transparent"
                    >
                      {code}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {hasSearched && trackingResult === null && (
              <div className="text-center py-8">
                <FiPackage className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Aucun suivi trouvé pour le code "{trackingCode}".
                </p>
              </div>
            )}

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Codes de Suivi Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {availableTracking.map(item => (
                <Button
                  key={item.num}
                  variant="outline"
                  className="w-full bg-transparent flex items-center justify-between"
                  onClick={() => {
                    setTrackingCode(item.num)
                    handleSearch(item.num)
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <FiPackage className="w-4 h-4" />
                    <span>{item.num}</span>
                  </div>
                  <span
                    className={`text-white text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {trackingResult && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Détails du Suivi</CardTitle>
            </CardHeader>
            <CardContent>
              <TrackingResults tracking={trackingResult} />
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}
