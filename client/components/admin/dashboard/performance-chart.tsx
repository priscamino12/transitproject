"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useEffect, useState } from "react"
import api from "@/config/axiosInstance"

interface MonthlyData {
  month: string
  maritime: number
  aerienne: number
  revenus: number
}

export function PerformanceChart() {
  const [data, setData] = useState<MonthlyData[]>([])
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"]

  const mergeArrays = (maritime: any[], aerienne: any[]): MonthlyData[] => {
    return months.map((m, i) => {
      const monthNumber = i + 1
      const maritimeData = maritime.find(item => Number(item.mois) === monthNumber) || { count: 0, revenus: 0 }
      const aerienneData = aerienne.find(item => Number(item.mois) === monthNumber) || { count: 0, revenus: 0 }
      return {
        month: m,
        maritime: maritimeData.count,
        aerienne: aerienneData.count,
        revenus: maritimeData.revenus + aerienneData.revenus,
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [maritimeRes, aerienneRes] = await Promise.all([
          api.get("/hbl/count/byMonth"),
          api.get("/hawb/count/byMonth")
        ])

        const merged = mergeArrays(maritimeRes.data, aerienneRes.data)
        setData(merged)
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Annuelle</CardTitle>
        <CardDescription>Évolution des expéditions et revenus sur 12 mois</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value, name) => [
                name === "maritime" || name === "aerienne" ? `${value} expéditions` : `€${(value as number).toLocaleString()}`,
                name === "maritime" ? "Maritime" : name === "aerienne" ? "Aérienne" : "Revenus",
              ]}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="maritime"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6" }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="aerienne"
              stroke="#f43f5e"
              strokeWidth={2}
              dot={{ fill: "#f43f5e" }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenus"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ fill: "#f97316" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
