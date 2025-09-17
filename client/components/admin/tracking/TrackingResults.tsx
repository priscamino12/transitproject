"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FiMapPin,
  FiCalendar,
  FiWeight,
  FiUser,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiNavigation,
  FiAnchor,
} from "react-icons/fi"

interface TrackingResultsProps {
  tracking: any
}

export function TrackingResults({ tracking }: TrackingResultsProps) {
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

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <FiCheckCircle className="w-5 h-5 text-green-500" />
      case "current":
        return <FiClock className="w-5 h-5 text-blue-500" />
      case "pending":
        return <FiAlertCircle className="w-5 h-5 text-gray-400" />
      default:
        return <FiClock className="w-5 h-5 text-gray-400" />
    }
  }

  const completedStages = tracking.stages.filter((stage: any) => stage.status === "completed").length
  const totalStages = tracking.stages.length
  const progressPercentage = (completedStages / totalStages) * 100

  const isAerial = tracking.transportMode === "aerial"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${isAerial ? "bg-blue-500" : "bg-teal-500"}`}>
                {isAerial ? (
                  <FiNavigation className="w-5 h-5 text-white" />
                ) : (
                  <FiAnchor className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <CardTitle className="text-2xl">{tracking.id}</CardTitle>
                <p className="text-muted-foreground">
                  {tracking.origin} → {tracking.destination}
                </p>
              </div>
            </div>
            <Badge className={`${getStatusColor(tracking.status)} text-white text-lg px-4 py-2`}>
              {tracking.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <FiUser className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-medium">{tracking.client}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FiWeight className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Poids</p>
                <p className="font-medium">{tracking.weight}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FiMapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Position actuelle</p>
                <p className="font-medium">{tracking.currentLocation}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FiCalendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Livraison prévue</p>
                <p className="font-medium">{new Date(tracking.estimatedDelivery).toLocaleDateString("fr-FR")}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Progression</p>
                <p className="text-sm text-muted-foreground">
                  {completedStages} / {totalStages} étapes terminées
                </p>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suivi Détaillé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {tracking.stages.map((stage: any, index: number) => (
              <div key={stage.stage} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{getStageIcon(stage.status)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4
                        className={`font-medium ${
                          stage.status === "completed"
                            ? "text-foreground"
                            : stage.status === "current"
                              ? "text-blue-600"
                              : "text-muted-foreground"
                        }`}
                      >
                        {stage.stage}
                      </h4>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">📍 {stage.location}</p>
                    </div>
                    {stage.date && (
                      <div className="text-right">
                        <p className="text-sm font-medium">{new Date(stage.date).toLocaleDateString("fr-FR")}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(stage.date).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                  {index < tracking.stages.length - 1 && (
                    <div
                      className={`w-0.5 h-8 ml-2 mt-4 ${
                        tracking.stages[index + 1].status === "completed" ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
