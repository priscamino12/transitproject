"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FiNavigation, FiAnchor, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi"

const transactions = [
  {
    id: "MAWB-2024-001",
    type: "aerien",
    client: "ABC Corp",
    destination: "Paris → New York",
    status: "en-transit",
    date: "2024-01-15",
  },
  {
    id: "MBL-2024-023",
    type: "maritime",
    client: "XYZ Ltd",
    destination: "Le Havre → Shanghai",
    status: "douane",
    date: "2024-01-14",
  },
  {
    id: "HAWB-2024-045",
    type: "aerien",
    client: "Global Inc",
    destination: "Londres → Tokyo",
    status: "livre",
    date: "2024-01-13",
  },
  {
    id: "HBL-2024-067",
    type: "maritime",
    client: "Trade Co",
    destination: "Rotterdam → Los Angeles",
    status: "preparation",
    date: "2024-01-12",
  },
]

const statusConfig = {
  "en-transit": { label: "En Transit", color: "bg-blue-500", icon: FiClock },
  douane: { label: "Douane", color: "bg-yellow-500", icon: FiAlertCircle },
  livre: { label: "Livré", color: "bg-green-500", icon: FiCheckCircle },
  preparation: { label: "Préparation", color: "bg-gray-500", icon: FiClock },
}

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions Récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const StatusIcon = statusConfig[transaction.status as keyof typeof statusConfig].icon
            return (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {transaction.type === "aerien" ? (
                      <FiNavigation className="w-5 h-5 text-blue-500" />
                    ) : (
                      <FiAnchor className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.id}</p>
                    <p className="text-xs text-muted-foreground">{transaction.client}</p>
                    <p className="text-xs text-muted-foreground">{transaction.destination}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className={`${statusConfig[transaction.status as keyof typeof statusConfig].color} text-white`}
                  >
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusConfig[transaction.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
