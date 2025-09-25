"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FaPlane, FaShip } from "react-icons/fa"
import { useEffect, useState } from "react"
import api from "@/config/axiosInstance"

interface Status {
  label: string
  count: number
  color: string
}

interface TransportData {
  type: string
  icon: any
  total: number
  statuses: Status[]
}

export function ShipmentStatus() {
  const [shipmentData, setShipmentData] = useState<TransportData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer tous les suivis HBL et HAWB
        const [hblRes, hawbRes] = await Promise.all([
          api.get("/suiviHBL/suivre/all"),
          api.get("/suiviHAWB/suivre/all")
        ])

        const processStatuses = (suivis: any[], type: string, icon: any) => {
          const statusCounts: { [key: string]: number } = {}
          suivis.forEach(s => {
            const status = s.status
            statusCounts[status] = (statusCounts[status] || 0) + 1
          })

          const total = suivis.length
          const statuses: Status[] = [
            { label: "En préparation", count: statusCounts["En préparation"] || 0, color: "bg-yellow-500" },
            { label: "En transit", count: statusCounts["En transit"] || 0, color: "bg-blue-500" },
            { label: "Livré", count: statusCounts["Livré"] || 0, color: "bg-green-500" },
          ]

          return { type, icon, total, statuses }
        }

        const data: TransportData[] = [
          processStatuses(hawbRes.data, "Aérien", FaPlane),
          processStatuses(hblRes.data, "Maritime", FaShip),
        ]

        setShipmentData(data)
      } catch (error) {
        console.error("Erreur récupération suivi:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>État des Expéditions</CardTitle>
        <CardDescription>Répartition par mode de transport</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {shipmentData.map((transport, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <transport.icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{transport.type}</span>
              </div>
              <Badge variant="secondary">{transport.total} total</Badge>
            </div>

            <div className="space-y-2">
              {transport.statuses.map((status, statusIndex) => (
                <div key={statusIndex} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${status.color}`} />
                    <span>{status.label}</span>
                  </div>
                  <span className="font-medium">{status.count}</span>
                </div>
              ))}
            </div>

            <Progress value={(transport.statuses[1].count / transport.total) * 100} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
