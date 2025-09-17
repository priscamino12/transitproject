"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FiNavigation, FiAnchor, FiClock } from "react-icons/fi"

interface RecentTrackingProps {
  trackingData: any[]
}

export function RecentTracking({ trackingData }: RecentTrackingProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livré":
        return "bg-green-500"
      case "En transit":
        return "bg-blue-500"
      case "Douane":
        return "bg-orange-500"
      case "Préparation":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const recentItems = trackingData.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité Récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {item.transportMode === "aerial" ? (
                    <FiNavigation className="w-5 h-5 text-blue-500" />
                  ) : (
                    <FiAnchor className="w-5 h-5 text-teal-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.id}</p>
                  <p className="text-xs text-muted-foreground">{item.client}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.origin} → {item.destination}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <Badge className={`${getStatusColor(item.status)} text-white text-xs`}>{item.status}</Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <FiClock className="w-3 h-3 mr-1" />
                  {new Date(item.estimatedDelivery).toLocaleDateString("fr-FR")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
