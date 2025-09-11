import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FaPlane, FaShip } from "react-icons/fa"

const shipmentData = [
  {
    type: "Aérien",
    icon: FaPlane,
    total: 45,
    statuses: [
      { label: "En préparation", count: 12, color: "bg-yellow-500" },
      { label: "En transit", count: 28, color: "bg-blue-500" },
      { label: "Livré", count: 5, color: "bg-green-500" },
    ],
  },
  {
    type: "Maritime",
    icon: FaShip,
    total: 44,
    statuses: [
      { label: "En préparation", count: 8, color: "bg-yellow-500" },
      { label: "En transit", count: 32, color: "bg-blue-500" },
      { label: "Livré", count: 4, color: "bg-green-500" },
    ],
  },
]

export function ShipmentStatus() {
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
