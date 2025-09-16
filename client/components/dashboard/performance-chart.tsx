"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import api from "@/app/axiosInstance"

interface MonthlyData {
  month: string
  expeditions: number
  revenus: number
}

export function PerformanceChart() {
  const [data, setData] = useState<MonthlyData[]>([])
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"]

  const mergeArrays = (maritime: any[], aerienne: any[]) => {
    const merged: MonthlyData[] = months.map((m, i) => {
      const monthNumber = i + 1
      const maritimeData = maritime.find((item) => Number(item.mois) === monthNumber)
      const aerienneData = aerienne.find((item) => Number(item.mois) === monthNumber)
      return {
        month: m,
        expeditions: (maritimeData?.count || 0) + (aerienneData?.count || 0),
        revenus: (maritimeData?.revenus || 0) + (aerienneData?.revenus || 0),
      }
    })
    return merged
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const maritime = await api.get("/hbl/count/byMonth")  // Retourne [{mois:1,count:10,revenus:1000}, ...]
        const aerienne = await api.get("/hawb/count/byMonth") // Même format
        setData(mergeArrays(maritime.data, aerienne.data))
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
                name === "expeditions" ? `${value} expéditions` : `€${(value as number).toLocaleString()}`,
                name === "expeditions" ? "Expéditions" : "Revenus",
              ]}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="expeditions"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenus"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-2))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
