"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const data = [
  { month: "Jan", aerien: 45, maritime: 32 },
  { month: "Fév", aerien: 52, maritime: 28 },
  { month: "Mar", aerien: 48, maritime: 35 },
  { month: "Avr", aerien: 61, maritime: 42 },
  { month: "Mai", aerien: 55, maritime: 38 },
  { month: "Jun", aerien: 67, maritime: 45 },
]

export function ShipmentChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="aerien" fill="hsl(var(--primary))" name="Transport Aérien" />
        <Bar dataKey="maritime" fill="hsl(var(--chart-2))" name="Transport Maritime" />
      </BarChart>
    </ResponsiveContainer>
  )
}
