"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Validation", value: 24, color: "hsl(var(--chart-1))" },
  { name: "Préparation", value: 18, color: "hsl(var(--chart-2))" },
  { name: "En Transit", value: 156, color: "hsl(var(--chart-3))" },
  { name: "Douane", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Livré", value: 89, color: "hsl(var(--chart-5))" },
]

export function StatusChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
