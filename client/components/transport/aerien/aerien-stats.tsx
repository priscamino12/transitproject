import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaPlane, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"

const stats = [
  {
    title: "Vols Programmés",
    value: "45",
    change: "+3 aujourd'hui",
    icon: FaPlane,
    color: "text-blue-600",
  },
  {
    title: "En Transit",
    value: "28",
    change: "12 arrivées prévues",
    icon: FaClock,
    color: "text-yellow-600",
  },
  {
    title: "Livrés",
    value: "156",
    change: "+8 cette semaine",
    icon: FaCheckCircle,
    color: "text-green-600",
  },
  {
    title: "Retards",
    value: "3",
    change: "2 en attente douane",
    icon: FaExclamationTriangle,
    color: "text-red-600",
  },
]

export function AerienStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
