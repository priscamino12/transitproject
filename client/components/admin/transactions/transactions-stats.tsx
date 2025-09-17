import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaPlane, FaShip, FaFileAlt } from "react-icons/fa"

const stats = [
  {
    title: "MAWB (Aérien Principal)",
    value: "156",
    change: "+12 ce mois",
    icon: FaPlane,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "HAWB (Aérien Détail)",
    value: "342",
    change: "+28 ce mois",
    icon: FaFileAlt,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "MBL (Maritime Principal)",
    value: "89",
    change: "+8 ce mois",
    icon: FaShip,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    title: "HBL (Maritime Détail)",
    value: "234",
    change: "+18 ce mois",
    icon: FaFileAlt,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
  },
]

export function TransactionsStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
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
