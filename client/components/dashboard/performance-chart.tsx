"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", expeditions: 65, revenus: 180000 },
  { month: "Fév", expeditions: 78, revenus: 220000 },
  { month: "Mar", expeditions: 82, revenus: 245000 },
  { month: "Avr", expeditions: 95, revenus: 280000 },
  { month: "Mai", expeditions: 88, revenus: 265000 },
  { month: "Jun", expeditions: 102, revenus: 310000 },
  { month: "Jul", expeditions: 115, revenus: 340000 },
  { month: "Aoû", expeditions: 108, revenus: 325000 },
  { month: "Sep", expeditions: 125, revenus: 375000 },
  { month: "Oct", expeditions: 132, revenus: 395000 },
  { month: "Nov", expeditions: 128, revenus: 385000 },
  { month: "Déc", expeditions: 145, revenus: 420000 },
]

export function PerformanceChart() {
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
