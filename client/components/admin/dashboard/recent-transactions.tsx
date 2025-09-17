import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FaEye, FaPlane, FaShip } from "react-icons/fa"

const transactions = [
  {
    id: "MAWB-2024-001",
    type: "MAWB",
    client: "Société ABC",
    destination: "Paris → New York",
    status: "En transit",
    statusColor: "bg-blue-500",
    date: "2024-01-15",
    icon: FaPlane,
  },
  {
    id: "MBL-2024-002",
    type: "MBL",
    client: "Import Export Ltd",
    destination: "Le Havre → Shanghai",
    status: "Douane",
    statusColor: "bg-yellow-500",
    date: "2024-01-14",
    icon: FaShip,
  },
  {
    id: "HAWB-2024-003",
    type: "HAWB",
    client: "Tech Solutions",
    destination: "Lyon → Tokyo",
    status: "Livré",
    statusColor: "bg-green-500",
    date: "2024-01-13",
    icon: FaPlane,
  },
  {
    id: "HBL-2024-004",
    type: "HBL",
    client: "Global Trade Co",
    destination: "Marseille → Casablanca",
    status: "Préparation",
    statusColor: "bg-orange-500",
    date: "2024-01-12",
    icon: FaShip,
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transactions Récentes</CardTitle>
            <CardDescription>Dernières opérations de transport</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Voir tout
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <transaction.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{transaction.id}</span>
                    <Badge variant="outline">{transaction.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{transaction.client}</p>
                  <p className="text-sm text-muted-foreground">{transaction.destination}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${transaction.statusColor}`} />
                    <span className="text-sm font-medium">{transaction.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <FaEye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
